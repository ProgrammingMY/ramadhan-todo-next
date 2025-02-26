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
    {
      matcher({ request }) {
        return request.destination === "document";
      },
      handler: new NetworkFirst({
        cacheName: "pages",
      })
    },
    {
      matcher({ request }) {
        return request.destination === "script";
      },
      handler: new CacheFirst({
        cacheName: "scripts",
      })
    },
    {
      matcher({ request }) {
        return request.destination === "style";
      },
      handler: new CacheFirst({
        cacheName: "styles",
      })
    },
    {
      matcher({ request }) {
        return request.url.includes("/api/") || request.headers.get("x-api-request");
      },
      handler: new NetworkFirst({
        cacheName: "api",
      })
    }
  ],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        }
      }
    ]
  }
});

serwist.addEventListeners();
