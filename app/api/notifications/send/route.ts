import { db } from "../../../../db/drizzle";
import { subscriptionsTable } from "db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from 'next/server';

import webpush from 'web-push';
webpush.setVapidDetails(
    'mailto:admin@hakimtech.my',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
    process.env.VAPID_PRIVATE_KEY as string
)

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        // check if auth token is valid
        const authHeader = request.headers.get("Authorization");

        // remove Bearer from auth header
        const token = authHeader?.split(" ")[1];
        if (token !== process.env.CRON_AUTH_TOKEN) {
            return NextResponse.json({ error: "Invalid auth token" }, { status: 401 });
        }

        // get all subscriptions
        let subscriptions = [];

        // Get subscriptions for logged-in user
        const userSubs = await db.select()
            .from(subscriptionsTable)
            .where(eq(subscriptionsTable.isActive, true));
        subscriptions.push(...userSubs);

        const payload = JSON.parse(message);
        payload.icon = "/icons/icon-512x512.png";
        payload.badge = "/icons/icon-512x512.png";

        // Send notification to all endpoints
        await Promise.all(
            subscriptions.map(async (sub) => {
                await webpush.sendNotification(
                    JSON.parse(sub.subscription),
                    JSON.stringify(payload),
                );
            })
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending notification:', error);
        return NextResponse.json(
            { error: 'Failed to send notification' },
            { status: 500 }
        );
    }
}