import { handleApiError, successResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function PATCH() {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.card.deleteMany({});
      await tx.list.deleteMany({});
      await tx.board.deleteMany({});
      return true;
    });

    return successResponse(true, 200);
  } catch (error) {
    console.log(error);
    return handleApiError(error);
  }
}
