import { db } from "../db/drizzle";
import { subscriptionsTable } from "db/schema";

import webpush from 'web-push'

webpush.setVapidDetails(
    '<mailto:hakim@hakimtech.my>',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

async function handler(event: any) {
    console.log(event);

    const userSubs = await db.select().from(subscriptionsTable);
    if (userSubs.length === 0) {
        console.log("No users to notify");
        return;
    }

    const payload = JSON.stringify({
        title: "Reminder",
        body: "Don't forget to do update your garden",
        icon: "/icons/icon-512x512.png",
        badge: "/icons/icon-512x512.png",
        vibrate: [100, 50, 100],
        data: {
            url: "https://ramadhan.programmingmy.com",
            id: "1",
        }
    })

    try {
        await Promise.all(userSubs.map(async (user) => {
            const pushSubscription = user.subscription;

            await webpush.sendNotification(JSON.parse(pushSubscription), payload);
        }))

        console.log("Notifications sent successfully");

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Notifications sent successfully" })
        }

    } catch (err) {
        console.error(err);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error sending notifications" })
        }
    }
}

module.exports = { handler };
