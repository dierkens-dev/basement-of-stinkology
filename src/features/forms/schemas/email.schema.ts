import { z } from "zod";

export const emailSchema = z
  .string({ required_error: "Email is required." })
  .min(1, "Email is required.")
  .email("Must be a valid email.");
