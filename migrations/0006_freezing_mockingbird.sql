ALTER TABLE "subscriptions" ALTER COLUMN "deviceId" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_deviceId_unique" UNIQUE("deviceId");