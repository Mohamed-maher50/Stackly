import { NextRequest, NextResponse } from "next/server";

import { createListSchema } from "@/features/lists/zod.lists.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createListSchema.parse(body);
    const board = await prisma.list.create({
      data: validatedData,
    });

    return successResponse(board, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  const list = await prisma.list.findMany({});

  return NextResponse.json(list);
}
