ALTER TABLE "subscriptions" RENAME COLUMN "userId" TO "deviceId";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_userId_subscription_unique";--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_deviceId_subscription_unique" UNIQUE("deviceId","subscription");