import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  text,
  date,
} from "drizzle-orm/pg-core";

export const models = pgTable("models", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  scenesCount: integer("scenes_count").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  rating: integer("rating").notNull().default(5),
  profilePic: text("profile_pic").notNull(),
  thumbnail: text("thumbnail"),
  dob: date("dob"),
  description: text("description"),
  ethnicity: varchar("ethnicity", { length: 100 }),
  gender: varchar("gender", { length: 50 }).default("female"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
