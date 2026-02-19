CREATE TABLE "analytics" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "analytics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" uuid NOT NULL,
	"analysis" text NOT NULL,
	"startDate" varchar(255) NOT NULL,
	"mode" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "analytics_userId_startDate_mode_unique" UNIQUE("userId","startDate","mode")
);
--> statement-breakpoint
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_user_id_start_date_mode" ON "analytics" USING btree ("userId","startDate","mode");--> statement-breakpoint
CREATE INDEX "idx_progress_completed_date" ON "progress" USING btree ("completed","date");