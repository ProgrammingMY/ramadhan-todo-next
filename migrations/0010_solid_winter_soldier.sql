ALTER TABLE "period" ADD COLUMN "yearMonth" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "isPeriodCan" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "progress" DROP COLUMN "isUzur";