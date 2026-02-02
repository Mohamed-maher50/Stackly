import { NextRequest } from "next/server";

import { commentSchema } from "@/features/cards/zod.cards.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  {
    params: ReqParams,
  }: { params: Promise<{ listId: string; boardId: string; cardId: string }> },
) {
  try {
    const { cardId, listId } = await ReqParams;
    const body = await request.json();
    const validatedData = commentSchema.parse(body);
    let card = await prisma.card.findFirst({
      where: {
        id: cardId,
        listId: listId,
      },
    });
    if (!card) throw Error("Not Found");
    card = await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        comments: [...card.comments, { text: validatedData.text, user: "YOU" }],
      },
    });

    return successResponse(card, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
