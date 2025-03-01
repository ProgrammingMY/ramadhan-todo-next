import { Button } from "@/components/ui/button";
import { User } from "@/libs/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

export default function NotificationManager() {
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default");
    const [isStandalone, setIsStandalone] = useState(false);
    const [user, setUser] = useState<User>({
        id: crypto.randomUUID(),
        username: "Anonymous",
        picture: "/avatars/1.png",
    });

    useEffect(() => {
        if ('Notification' in window) {
            setNotificationPermission(Notification.permission);
        }
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    }, []);

    const subscribeToNotifications = async () => {
        try {
            const permission = await Notification.requestPermission();
            setNotificationPermission(permission);

            if (permission === 'granted') {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
                });

                console.log(subscription);

                // Send subscription to backend
                const response = await fetch('/api/notifications/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subscription,
                        userId: user.id,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to subscribe to notifications');
                }

                toast.success("Notifications enabled");
            }
        } catch (error) {
            console.error('Error subscribing to notifications:', error);
            toast.error("Failed to enable notifications");
        }
    };

    const testNotification = async () => {
        try {
            // First, make sure we have a service worker registration
            const registration = await navigator.serviceWorker.ready;

            toast.success("Sending test notification in 5 seconds...");

            // Wait for 5 seconds
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Send the notification
            await registration.showNotification("Test Notification", {
                requireInteraction: true,
                body: "This is a test notification from your app!",
                icon: "/icons/android-chrome-192x192.png", // Make sure this icon exists in your public folder
                badge: "/icons/android-chrome-192x192.png",
                data: "/",
            });
        } catch (error) {
            console.error('Error sending test notification:', error);
            toast.error("Failed to send test notification");
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {notificationPermission === "default" && (
                <Button onClick={subscribeToNotifications}>
                    Enable Notifications
                </Button>
            )}
            {notificationPermission === "granted" && (
                <>
                    <p className="text-green-600">Notifications are enabled</p>
                    <Button onClick={testNotification}>
                        Send Test Notification
                    </Button>
                </>
            )}
            {notificationPermission === "denied" && (
                <p className="text-red-600">
                    Notifications are blocked. Please enable them in your browser settings.
                </p>
            )}
        </div>
    )
}