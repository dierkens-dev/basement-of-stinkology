import { z } from "zod";

export const passwordSchema = z
  .string({ required_error: "Password is required." })
  .min(1, "Password is required.");
