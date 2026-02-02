import { NextRequest } from "next/server";

import { updateCardSchema } from "@/features/cards/zod.cards.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ cardId: string; boardId: string }> },
) {
  const { cardId, boardId } = await params;
  try {
    const card = await prisma.$transaction(async (tx) => {
      const card = await tx.card.delete({ where: { id: cardId } });
      await tx.board.update({
        where: {
          id: boardId,
        },
        data: {
          total_cards: {
            decrement: 1,
          },
        },
      });
      return card;
    });

    return successResponse(card, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
export async function PUT(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ cardId: string; listId: string; boardId: string }> },
) {
  try {
    const { cardId, boardId } = await params;
    const body = await request.json();
    const cardPayload = updateCardSchema.parse(body);
    const card = await prisma.$transaction(async (tx) => {
      const card = await tx.card.update({
        where: { id: cardId },
        data: cardPayload,
      });
      await tx.board.update({
        where: { id: boardId },
        data: {
          total_cards: {
            increment: 1,
          },
        },
      });
      return card;
    });

    return successResponse(card, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
