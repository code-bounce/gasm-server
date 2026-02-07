import { z } from "zod";

const urlSchema = z.string().refine((val) => {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
}, "Invalid URL");

export const createModelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  scenesCount: z.number().int().default(0).optional(),
  likes: z.number().int().default(0).optional(),
  rating: z.number().int().default(5).optional(),
  profilePic: urlSchema,
  thumbnail: urlSchema.optional(),
  dob: z.coerce.date().optional(),
  description: z.string().optional(),
  ethnicity: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).default("female"),
});

export const updateModelSchema = createModelSchema.partial();

export type CreateModelInput = z.infer<typeof createModelSchema>;
export type UpdateModelInput = z.infer<typeof updateModelSchema>;
