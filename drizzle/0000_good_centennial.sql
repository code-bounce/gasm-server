CREATE TABLE "models" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"scenes_count" integer DEFAULT 0 NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"profile_pic" text NOT NULL,
	"thumbnail" text,
	"dob" date,
	"description" text,
	"ethnicity" varchar(100),
	"gender" varchar(50) DEFAULT 'female',
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "models_slug_unique" UNIQUE("slug")
);
