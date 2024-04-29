DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "roles" "roles" DEFAULT 'user' NOT NULL;