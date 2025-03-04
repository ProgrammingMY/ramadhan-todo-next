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
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default");

    // check if app is installed
    const [isStandalone, setIsStandalone] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // user
    const [user, setUser] = useState<User>(JSON.parse(localStorage.getItem("user") || "{}"));

    useEffect(() => {
        // check if mobile device
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

        // check if ap is installed
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

        // check if service worker is supported
        if (typeof window !== "undefined" && "serviceWorker" in navigator && window.serwist !== undefined) {
            // run only in browser
            console.log("Service worker supported");
            navigator.serviceWorker.ready.then((reg) => {
                reg.pushManager.getSubscription().then((sub) => {
                    if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                        setIsSubscribed(true);
                    }
                });
                setRegistration(reg);
                console.log("Service worker registered and activated", reg);
            });
        }
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

            // check if environment variables are set
            if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
                toast.error("Environment variables supplied not sufficient.");
                return;
            }

            // check if service worker is registered
            if (!registration) {
                toast.error("No SW registration available.");
                return;
            }

            // request permission
            const permission = await Notification.requestPermission();
            setNotificationPermission(permission);

            if (permission === 'granted') {
                // Add a timeout to prevent infinite waiting
                const sub = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
                });

                console.log("Push subscription created", sub);

                if (!sub) {
                    throw new Error('Failed to create push subscription');
                }

                // Send subscription to backend
                const response = await fetch('/api/notifications/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subscription: sub,
                        userId: user.id,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to subscribe to notifications ' + response.statusText);
                }

                setIsSubscribed(true);
                toast.success("Daily reminder enabled");
            } else if (permission === "denied") {
                throw new Error('Notification permission not granted ' + permission);
            } else {
                throw new Error('Failed to subscribe to notifications: ' + permission);
            }
        } catch (error) {
            console.error('Error subscribing to notifications:', error);
            setIsLoading(false);
            toast.error(error instanceof Error ? error.message : "Failed to enable notifications");
        } finally {
            setIsLoading(false);
        }
    };

    const unsubscribeFromNotifications = async () => {
        try {
            setIsLoading(true);

            // check if service worker is registered
            if (!registration) {
                toast.error("No SW registration available.");
                return;
            }
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
                toast.success("Daily reminder disabled");
            } else {
                throw new Error('Failed to unsubscribe from notifications');
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
                        Daily Reminder at 7:00 PM
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