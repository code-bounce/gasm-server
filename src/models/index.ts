import Elysia from "elysia";
import { modelService } from "./service";
import { createModelSchema, updateModelSchema } from "./validation";
import { createErrorResponse, createSuccessResponse } from "../utils/response";

export const models = new Elysia({ prefix: "/models" })
  .get("/", async () => {
    const result = await modelService.getAll();
    return createSuccessResponse(result);
  })
  .get("/:id", async ({ params }) => {
    const result = await modelService.getById(params.id);
    if (!result) {
      return new Response(
        JSON.stringify(createErrorResponse("Model not found", 404)),
        { status: 404 },
      );
    }
    return createSuccessResponse(result);
  })
  .post("/", async ({ body, set }) => {
    try {
      const validatedData = createModelSchema.parse(body);
      const result = await modelService.create(validatedData as any);
      set.status = 201;
      return createSuccessResponse(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Slug")) {
          set.status = 409;
          return createErrorResponse(error.message, 409, "SLUG_CONFLICT");
        }
        set.status = 400;
        return createErrorResponse(error.message, 400, "VALIDATION_ERROR");
      }
      set.status = 500;
      return createErrorResponse("Internal server error", 500);
    }
  })
  .patch("/:id", async ({ params, body, set }) => {
    try {
      const validatedData = updateModelSchema.parse(body);
      const result = await modelService.update(params.id, validatedData as any);
      if (!result) {
        set.status = 404;
        return createErrorResponse("Model not found", 404);
      }
      return createSuccessResponse(result);
    } catch (error) {
      if (error instanceof Error) {
        set.status = 400;
        return createErrorResponse(error.message, 400, "VALIDATION_ERROR");
      }
      set.status = 500;
      return createErrorResponse("Internal server error", 500);
    }
  })
  .delete("/:id", async ({ params, set }) => {
    const result = await modelService.delete(params.id);
    if (!result) {
      set.status = 404;
      return createErrorResponse("Model not found", 404);
    }
    return createSuccessResponse(result);
  });
