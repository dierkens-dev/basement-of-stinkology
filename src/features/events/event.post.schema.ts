import { z } from "zod";

export const eventsPostBodySchema = z.object({
  year: z.coerce.number(),
  name: z.string(),
  slug: z.string(),
});

export type EventsPostErrors = z.inferFlattenedErrors<
  typeof eventsPostBodySchema
>;
