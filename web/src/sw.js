const CACHE_NAME = 'health-cache-v4';
const urlsToCache = [
  '/',
  '/main.js',
  '/favicon.svg',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
  'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
  'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
];

function cacheResponse(event, response) {
  const responseToCache = response.clone();

  return caches.open(CACHE_NAME)
    .then((cache) => {
      cache.put(event.request, responseToCache);
      return response;
    })
    .catch(console.error);
}

function handleResponse(event, response) {
  if (!response || response.status !== 200 || event.request.method !== 'GET') {
    return response;
  }

  return cacheResponse(event, response);
}

function getData(event, timeout) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(reject, timeout);

    fetch(event.request)
      .then((response) => {
        clearTimeout(timeoutId);
        return handleResponse(event, response);
      })
      .then(resolve)
      .catch(reject);
  });
}

function fromCache(event) {
  return caches.open(CACHE_NAME)
    .then((cache) => cache.match(event.request));
}

function precache() {
  return caches.open(CACHE_NAME)
    .then((cache) => cache.addAll(urlsToCache));
}

function purgeCaches() {
  const cacheWhitelist = [CACHE_NAME];

  return caches.keys().then((cacheNames) => Promise.all(
    cacheNames.map((cacheName) => {
      if (!cacheWhitelist.includes(cacheName)) {
        return caches.delete(cacheName);
      }

      return Promise.resolve();
    })
  ));
}

self.addEventListener('install', (event) => {
  event.waitUntil(precache());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(purgeCaches());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    getData(event, 1000)
      .catch(() => fromCache(event))
  );
});
