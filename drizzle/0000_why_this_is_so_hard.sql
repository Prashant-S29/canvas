CREATE TYPE "public"."role" AS ENUM('ORG_ADMIN', 'TEAM_ADMIN', 'TEAM_MEMBER', 'USER');
--> statement-breakpoint
CREATE TABLE "account" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "account_id" text NOT NULL,
  "provider_id" text NOT NULL,
  "user_id" uuid NOT NULL,
  "access_token" text,
  "refresh_token" text,
  "id_token" text,
  "access_token_expires_at" timestamp,
  "refresh_token_expires_at" timestamp,
  "scope" text,
  "password" text,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "org_slug" text,
  "expires_at" timestamp NOT NULL,
  "token" text NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL,
  "ip_address" text,
  "user_agent" text,
  "user_id" uuid NOT NULL,
  CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "verification" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expires_at" timestamp NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "organization" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "is_verified" boolean DEFAULT false NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "org_admin_id" uuid NOT NULL,
  CONSTRAINT "organization_slug_unique" UNIQUE("slug"),
  CONSTRAINT "organization_org_admin_id_unique" UNIQUE("org_admin_id")
);
--> statement-breakpoint
CREATE TABLE "team" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "slug" text NOT NULL,
  "description" text NOT NULL,
  "invitation_code" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "org_slug" text NOT NULL,
  CONSTRAINT "team_slug_unique" UNIQUE("slug"),
  CONSTRAINT "team_invitation_code_unique" UNIQUE("invitation_code")
);
--> statement-breakpoint
CREATE TABLE "team_user" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "role" "role" NOT NULL,
  "invited_by" text NOT NULL,
  "team_slug" text NOT NULL,
  "user_mail" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "email_verified" boolean NOT NULL,
  "role" "role" DEFAULT 'USER' NOT NULL,
  "image" text,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL,
  CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "account"
ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "session"
ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "organization"
ADD CONSTRAINT "organization_org_admin_id_user_id_fk" FOREIGN KEY ("org_admin_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;
--> statement-breakpoint
ALTER TABLE "team"
ADD CONSTRAINT "team_org_slug_organization_slug_fk" FOREIGN KEY ("org_slug") REFERENCES "public"."organization"("slug") ON DELETE cascade ON UPDATE cascade;
--> statement-breakpoint
ALTER TABLE "team_user"
ADD CONSTRAINT "team_user_team_slug_team_slug_fk" FOREIGN KEY ("team_slug") REFERENCES "public"."team"("slug") ON DELETE cascade ON UPDATE cascade;
--> statement-breakpoint
ALTER TABLE "team_user"
ADD CONSTRAINT "team_user_user_mail_user_email_fk" FOREIGN KEY ("user_mail") REFERENCES "public"."user"("email") ON DELETE cascade ON UPDATE cascade;
