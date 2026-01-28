import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
};

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json({ success: true, data } as ApiResponse<T>, {
    status,
  });
}

export function errorResponse(error: string, status: number = 400) {
  return NextResponse.json({ success: false, error } as ApiResponse, {
    status,
  });
}

export function validationErrorResponse<T>(zodError: ZodError<T>) {
  const errors: Record<string, string[]> = {};

  zodError.issues.forEach((err) => {
    const path = err.path.join(".");
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(err.message);
  });

  return NextResponse.json(
    {
      success: false,
      error: "Validation failed",
      errors,
    } as ApiResponse,
    { status: 422 },
  );
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);

  if (error instanceof ZodError) {
    return validationErrorResponse(error);
  }

  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return errorResponse(
          "A record with this unique field already exists",
          409,
        );
      case "P2025":
        return errorResponse("Record not found", 404);
      case "P2003":
        return errorResponse("Foreign key constraint failed", 400);
      default:
        return errorResponse("Database error occurred", 500);
    }
  }

  if (error instanceof Error) {
    return errorResponse(error.message, 500);
  }

  return errorResponse("An unexpected error occurred", 500);
}
