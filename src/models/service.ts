import { db } from "../db";
import { models as modelsTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { generateSlug } from "../utils/slug";

export const modelService = {
  async getAll() {
    return await db.select().from(modelsTable);
  },

  async getById(id: string) {
    const result = await db
      .select()
      .from(modelsTable)
      .where(eq(modelsTable.id, id));
    return result[0] || null;
  },

  async getBySlug(slug: string) {
    const result = await db
      .select()
      .from(modelsTable)
      .where(eq(modelsTable.slug, slug));
    return result[0] || null;
  },

  async create(data: typeof modelsTable.$inferInsert) {
    const slug = generateSlug(data.name);

    // First check if slug already exists
    const existingSlug = await this.getBySlug(slug);
    if (existingSlug) {
      const error = new Error(`Slug '${slug}' already exists`);
      (error as any).status = 409;
      throw error;
    }

    // If slug doesn't exist, create the model
    const result = await db
      .insert(modelsTable)
      .values({ ...data, slug })
      .returning();
    return result[0];
  },

  async update(id: string, data: Partial<typeof modelsTable.$inferInsert>) {
    const result = await db
      .update(modelsTable)
      .set(data)
      .where(eq(modelsTable.id, id))
      .returning();
    return result[0] || null;
  },

  async delete(id: string) {
    const result = await db
      .delete(modelsTable)
      .where(eq(modelsTable.id, id))
      .returning();
    return result[0] || null;
  },
};
