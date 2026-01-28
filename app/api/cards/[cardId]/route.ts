import { NextRequest } from "next/server";

import { updateCardSchema } from "@/features/records/zod.cards.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ cardId: string }> },
) {
  const { cardId } = await params;
  try {
    const card = await prisma.card.delete({ where: { id: cardId } });
    return successResponse(card, 404);
  } catch (error) {
    return handleApiError(error);
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ cardId: string }> },
) {
  try {
    const { cardId } = await params;
    const body = await request.json();

    const cardPayload = updateCardSchema.parse(body);
    const card = await prisma.card.update({
      where: { id: cardId },
      data: cardPayload,
    });
    return successResponse(card, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
