CREATE TABLE "period" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "period_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" varchar(255) NOT NULL,
	"isPeriod" boolean DEFAULT false NOT NULL,
	"userId" uuid NOT NULL,
	CONSTRAINT "period_userId_date_unique" UNIQUE("userId","date")
);
--> statement-breakpoint
ALTER TABLE "period" ADD CONSTRAINT "period_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;