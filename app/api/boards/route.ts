/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server";

import { DEFAULT_BOARD_SLATS } from "@/features/boards/constant.boards";
import { generateBoardColor } from "@/features/boards/utils";
import { createBoardSchema } from "@/features/boards/zod.boards.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createBoardSchema.parse(body);
    const color = generateBoardColor();
    const boardPayload = Object.assign(
      validatedData,
      { color },
      DEFAULT_BOARD_SLATS,
    );
    const board = await prisma.board.create({
      data: boardPayload,
      include: {
        _count: {
          select: {
            lists: {
              where: {
                deleted: false,
              },
            },
            cards: true,
          },
        },
      },
    });
    const completedCardsCount = await prisma.card.count({
      where: {
        boardId: board.id,
        done: true,
      },
    });
    return successResponse(board, 201);
  } catch (error) {
    console.log(error);
    return handleApiError(error);
  }
}
export async function GET(req: NextRequest) {
  try {
    const board = await prisma.board.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        _count: {
          select: {
            lists: {
              where: {
                deleted: false,
              },
            },
            cards: true,
          },
        },
      },
    });
    return successResponse(board, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
