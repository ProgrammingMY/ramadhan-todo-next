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
  ]
});

// Add fetch event listener to handle API requests
// self.addEventListener('fetch', (event) => {
//   const request = event.request;

//   // Check if it's an API request
//   if (request.url.includes('/api/') || request.headers.get('x-api-request')) {
//     // For API requests, only try network
//     event.respondWith(
//       fetch(request).catch(error => {
//         console.error('API fetch failed:', error);
//         return new Response(JSON.stringify({ error: 'Network error' }), {
//           status: 503,
//           headers: { 'Content-Type': 'application/json' }
//         });
//       })
//     );
//   }
// });

serwist.addEventListeners();
