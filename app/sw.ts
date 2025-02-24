import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

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
      // Cache the API responses
      matcher: ({ url }) => url.pathname.startsWith("/api"),
      method: "GET",
      handler: {
        handle: async ({ request, event }) => {
          const response = await fetch(request);
          return response;
        },
      },
    },
    {
      // Cache the main page
      matcher: ({ url }) => url.pathname === "/",
      method: "GET",
      handler: {
        handle: async ({ request, event }) => {
          const response = await fetch(request);
          return response;
        },
      },
    },
  ],
});

serwist.addEventListeners();
