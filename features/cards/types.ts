import z from "zod";

import { Card } from "@/generated/prisma/client";

import {
  commentSchema,
  createCardSchema,
  deleteCardApiPayloadSchema,
  updateCardSchema,
} from "./zod.cards.schema";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICard extends Card {}
export type createCardValues = z.infer<typeof createCardSchema>;
export type updateCardValues = z.infer<typeof updateCardSchema>;
export interface updateApiPayload extends Omit<updateCardValues, "dueDate"> {
  boardId: string;
  listId: string;
  id: string;
  dueDate: Date | null;
}
export type addCommentApiPayload = z.infer<typeof commentSchema> & {
  boardId: string;
  listId: string;
  cardId: string;
};
export type createCardApiPayloadType = {
  boardId: string;
  listId: string;
} & createCardValues;
export type FetchApiPayloadType = { boardId: string; listId: string };
export type deleteCardApiPayload = z.infer<typeof deleteCardApiPayloadSchema>;
