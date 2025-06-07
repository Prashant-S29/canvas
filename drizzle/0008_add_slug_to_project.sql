ALTER TABLE "project" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_slug_unique" UNIQUE("slug");