import { NextRequest } from "next/server";

import { accentColors } from "@/features/lists/utils";
import { createListSchema } from "@/features/lists/zod.lists.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> },
) {
  try {
    const { boardId } = await params;
    const body = await request.json();
    const validatedData = createListSchema.parse(body);
    const payload = Object.assign(validatedData, {
      accentColor: accentColors(),
    });
    const list = await prisma.list.create({
      data: payload,
      include: {
        cards: true,
      },
    });

    return successResponse(list, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ boardId: string }> },
) {
  try {
    const { boardId } = await params;
    const list = await prisma.list.findMany({
      where: {
        boardId,
        deleted: false,
      },
      include: {
        cards: true,
      },
    });

    return successResponse(list, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
