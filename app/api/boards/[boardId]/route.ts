import { NextRequest } from "next/server";

import { updateBoardSchema } from "@/features/boards/zod.boards.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> },
) {
  const { boardId } = await params;
  try {
    const board = await prisma.board.delete({ where: { id: boardId } });
    return successResponse(board, 404);
  } catch (error) {
    return handleApiError(error);
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> },
) {
  try {
    const { boardId } = await params;
    const body = await request.json();

    const boardPayload = updateBoardSchema.parse(body);
    const board = await prisma.board.update({
      where: { id: boardId },
      data: boardPayload,
    });
    return successResponse(board, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
