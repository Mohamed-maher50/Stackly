import { NextRequest } from "next/server";

import { updateSchema } from "@/features/lists/zod.lists.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> },
) {
  const { listId } = await params;
  try {
    const list = await prisma.list.delete({ where: { id: listId } });
    return successResponse(list, 404);
  } catch (error) {
    return handleApiError(error);
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ listId: string }> },
) {
  try {
    const { listId } = await params;
    const body = await request.json();

    const listPayload = updateSchema.parse(body);
    const list = await prisma.list.update({
      where: { id: listId },
      data: listPayload,
    });
    return successResponse(list, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
