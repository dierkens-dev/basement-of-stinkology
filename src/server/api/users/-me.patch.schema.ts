import { z } from "zod";

export const usersMePatchBodySchema = z.object({
  name: z.string().optional(),
  nickname: z.string().optional(),
});

export type UsersMePatchErrors = z.inferFlattenedErrors<
  typeof usersMePatchBodySchema
>;
