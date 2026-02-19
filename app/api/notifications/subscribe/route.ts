import { db } from 'db/drizzle';
import { subscriptionsTable } from 'db/schema';
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    try {
        const { subscription, userId } = await request.json();

        // store in db
        await db.insert(subscriptionsTable).values({
            deviceId: userId,
            subscription: JSON.stringify(subscription),
            isActive: true,
        }).onConflictDoUpdate({
            target: [subscriptionsTable.deviceId],
            set: { isActive: true, subscription: JSON.stringify(subscription) },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error subscribing to notifications:', error);
        return NextResponse.json({ error: 'Failed to subscribe to notifications' }, { status: 500 });
    }
}