import { NextRequest } from "next/server";

import { updateListSchema } from "@/features/lists/zod.lists.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> },
) {
  const { listId } = await params;
  try {
    const list = await prisma.list.update({
      where: { id: listId },
      data: {
        deleted: true,
      },
      omit: {
        deleted: true,
      },
    });
    return successResponse(list, 200);
  } catch (error) {
    return handleApiError(error);
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string; boardId: string }> },
) {
  try {
    const { listId } = await params;
    const body = await request.json();

    const listPayload = updateListSchema.parse(body);
    const list = await prisma.list.update({
      where: { id: listId },
      data: listPayload,
      include: {
        cards: true,
      },
    });

    return successResponse(list, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
