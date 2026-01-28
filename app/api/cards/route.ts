/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server";

import { createCardSchema } from "@/features/records/zod.cards.schema";
import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createCardSchema.parse(body);
    const cardPayload = Object.assign(validatedData);
    const card = await prisma.card.create({
      data: cardPayload,
    });

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
