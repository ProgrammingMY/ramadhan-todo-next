import { db } from "../../../../db/drizzle";
import { subscriptionsTable } from "db/schema";
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

        // verify the source of the request comes from lambda
        console.log(request);

        // get all subscriptions
        let subscriptions = [];

        // Get subscriptions for logged-in user
        const userSubs = await db.select()
            .from(subscriptionsTable)
        subscriptions.push(...userSubs);

        // append icon to the message
        message.icon = "/icons/icon-512x512.png";
        message.badge = "/icons/icon-512x512.png";

        // Send notification to all endpoints
        await Promise.all(
            subscriptions.map(async (sub) => {
                await webpush.sendNotification(
                    JSON.parse(sub.subscription),
                    JSON.stringify(message)
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