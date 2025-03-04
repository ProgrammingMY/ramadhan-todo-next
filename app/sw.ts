import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, NetworkFirst, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Change this attribute's name to your `injectionPoint`.
    // `injectionPoint` is an InjectManifest option.
    // See https://serwist.pages.dev/docs/build/configuring
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    // {
    //   matcher({ request }) {
    //     return request.destination === "document";
    //   },
    //   handler: new NetworkFirst({
    //     cacheName: "pages",
    //   })
    // },
    // {
    //   matcher({ request }) {
    //     return request.destination === "script";
    //   },
    //   handler: new CacheFirst({
    //     cacheName: "scripts",
    //   })
    // },
    // {
    //   matcher({ url }) {
    //     return url.pathname.includes('dynamic-css-manifest.json');
    //   },
    //   handler: new NetworkFirst({
    //     cacheName: "styles",
    //     plugins: [
    //       {
    //         // Handle failed requests gracefully
    //         handlerDidError: async () => new Response('{}', {
    //           status: 200,
    //           headers: { 'Content-Type': 'application/json' },
    //         })
    //       }
    //     ]
    //   })
    // },
    // {
    //   matcher({ request }) {
    //     return request.url.includes("/api/") || request.headers.get("x-api-request");
    //   },
    //   handler: new StaleWhileRevalidate({
    //     cacheName: "api",
    //   })
    // }
  ],
});

// Add push notification event listeners
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'New notification',
      icon: '/icons/android-chrome-192x192.png', // Make sure this icon exists in your public folder
      badge: '/icons/android-chrome-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.id,
        url: data.url
      },
      actions: data.actions || [],
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Notification', options)
    );
  }

});


self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return self.clients.openWindow("/");
    }),
  );
});

serwist.addEventListeners();
