/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server";

import { createCardSchema } from "@/features/cards/zod.cards.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  {
    params: ReqParams,
  }: { params: Promise<{ listId: string; boardId: string }> },
) {
  try {
    const params = await ReqParams;
    const body = await request.json();
    const validatedData = createCardSchema.parse(body);
    const cardPayload = Object.assign(validatedData, params);
    const card = await prisma.$transaction(async (tx) => {
      const card = await tx.card.create({
        data: cardPayload,
      });

      return card;
    });

    const board = await prisma.board.update({
      where: { id: params.boardId },
      data: {
        total_cards: {
          increment: 1,
        },
      },
    });
    console.log(board);
    return successResponse(card, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
export async function GET(_request: NextRequest) {
  try {
    const card = await prisma.card.findMany();

    return successResponse(card, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
