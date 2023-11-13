import { z } from "zod";

export const eventsPostBodySchema = z.object({
  date: z.coerce.date(),
  name: z.string(),
  slug: z.string(),
});

export type EventsPostErrors = z.inferFlattenedErrors<
  typeof eventsPostBodySchema
>;
