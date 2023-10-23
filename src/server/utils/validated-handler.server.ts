import { FirebaseError } from "firebase/app";
import type { EventHandler, EventHandlerRequest } from "h3";
import { defineEventHandler } from "h3";
import { z } from "zod";
import { getErrorMessage } from "~/features/auth";

export const defineValidatedEventHandler = <
  Body,
  Response,
  Request extends EventHandlerRequest = { body: Body },
>(
  schema: z.Schema<Body>,
  handler: EventHandler<Request, Response>,
): EventHandler<Request, Response> =>
  defineEventHandler<Request>(async (event) => {
    const parseResult = await readValidatedBody(event, schema.safeParse);

    if (!parseResult.success) {
      throw createError({
        data: parseResult.error.flatten(),
        status: 400,
        statusMessage: "Bad Request",
      });
    }

    try {
      return await handler(event);
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw createError({
          data: { fieldErrors: {}, formErrors: [getErrorMessage(error.code)] },
          status: 400,
          statusMessage: "Bad Request",
        });
      }

      throw error;
    }
  });
