import { z } from "zod";

export const codeSchema = z
  .string({ required_error: "Code is required." })
  .min(1, "Code is required.");
