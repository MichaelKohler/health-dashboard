const CACHE_NAME = 'health-cache-v4';
const urlsToCache = [
  '/',
  '/main.js',
  '/favicon.svg',
  '/cigarettes',
  '/stairs',
  '/weights',
  '/stats',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
  'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
  'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('looking for', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        console.log('cached response?', event.request.url, cachedResponse);
        if (cachedResponse) {
          getData(event);
          return cachedResponse;
        }

        return getData(event);
      }
    )
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

function getData(event) {
  return fetch(event.request)
    .then((response) => {
      console.log('got response for', event.request.url, response);
      if(!response ||
          response.status !== 200 ||
          event.request.method !== 'GET'
      ) {
        return response;
      }

      const responseToCache = response.clone();

      caches.open(CACHE_NAME)
        .then((cache) => {
          console.log('putting into cache', event.request);
          cache.put(event.request, responseToCache);
        });

      return response;
    })
    .catch(console.error);
}

