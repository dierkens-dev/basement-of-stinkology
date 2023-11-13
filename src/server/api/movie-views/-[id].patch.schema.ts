import { z } from "zod";

export const eventMoviePatchBodySchema = z.object({
  viewDateTime: z.string().optional(),
});

export type EventMoviePatchErrors = z.inferFlattenedErrors<
  typeof eventMoviePatchBodySchema
>;
