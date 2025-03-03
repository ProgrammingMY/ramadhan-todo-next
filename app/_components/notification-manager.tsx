import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User } from "@/libs/types";
import { Info, Loader2 } from "lucide-react";
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
    const [isSubscribed, setIsSubscribed] = useState(localStorage.getItem("isNotificationEnabled") === "true");
    const [isStandalone, setIsStandalone] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User>({
        id: crypto.randomUUID(),
        isAnonymous: true,
    });

    useEffect(() => {
        if ('Notification' in window) {
            setNotificationPermission(Notification.permission);
        }
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }

        // check if mobile device
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));


        // check if ap is installed
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    }, []);


    const handleSwitchChange = async (checked: boolean) => {
        if (checked) {
            await subscribeToNotifications();
        } else {
            await unsubscribeFromNotifications();
        }
    };

    const subscribeToNotifications = async () => {
        try {
            setIsLoading(true);
            const permission = await Notification.requestPermission();
            setNotificationPermission(permission);

            if (permission === 'granted') {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
                });

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

                setIsSubscribed(true);
                // store state in local storage
                localStorage.setItem("isNotificationEnabled", "true");
                toast.success("Daily reminder enabled");
            }
        } catch (error) {
            console.error('Error subscribing to notifications:', error);
            toast.error("Failed to enable notifications");
        } finally {
            setIsLoading(false);
        }
    };

    const unsubscribeFromNotifications = async () => {
        try {
            setIsLoading(true);
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                // Send unsubscribe request to backend
                const response = await fetch('/api/notifications/unsubscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user.id,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to unsubscribe from notifications');
                }

                // Unsubscribe on the client side
                await subscription.unsubscribe();
                setIsSubscribed(false);
                localStorage.setItem("isNotificationEnabled", "false");
                toast.success("Daily reminder disabled");
            }
        } catch (error) {
            console.error('Error unsubscribing from notifications:', error);
            toast.error("Failed to disable daily reminder");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {(!isStandalone && isMobile) && (
                <div className="bg-yellow-50 p-4 rounded-lg flex items-center gap-2">
                    <Info className="w-8 h-8 text-yellow-800" />
                    <p className="text-yellow-800 text-sm">
                        Please install this app first to enable notifications.
                    </p>
                </div>
            )}

            {notificationPermission === "default" && (isStandalone || !isMobile) && (
                <Button onClick={subscribeToNotifications}>
                    Enable Notification Reminder
                </Button>
            )}

            {notificationPermission === "granted" && (
                <div className="flex items-center space-x-2">
                    <Switch
                        id="daily-reminder"
                        checked={isSubscribed}
                        disabled={isLoading}
                        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-500"
                        onCheckedChange={handleSwitchChange}
                    />
                    <label htmlFor="daily-reminder" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Daily Reminder at 10:00 PM
                    </label>
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                </div>
            )}

            {notificationPermission === "denied" && (
                <p className="text-red-600">
                    Notifications are blocked. Please enable them in your device settings.
                </p>
            )}
        </div>
    )
}