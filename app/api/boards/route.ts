import { NextRequest } from "next/server";

import { DEFAULT_BOARD_SLATS } from "@/features/boards/constant.boards";
import { createBoardSchema } from "@/features/boards/zod.boards.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createBoardSchema.parse(body);
    const boardPayload = Object.assign(validatedData, DEFAULT_BOARD_SLATS);
    const board = await prisma.board.create({
      data: boardPayload,
    });

    return successResponse(board, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
