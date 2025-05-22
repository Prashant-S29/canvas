CREATE TABLE "team_invitation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role" "role" NOT NULL,
	"user_mail" text NOT NULL,
	"invited_by" text NOT NULL,
	"invitation_status" "invitation_status" DEFAULT 'PENDING' NOT NULL,
	"team_slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "team_invitation" ADD CONSTRAINT "team_invitation_team_slug_team_slug_fk" FOREIGN KEY ("team_slug") REFERENCES "public"."team"("slug") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "team_user" DROP COLUMN "invitation_status";