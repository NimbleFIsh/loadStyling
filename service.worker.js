self.addEventListener('install', e => {
    e.waitUntil((async () => {
        await putFilesToCache(files);
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', e => {
    e.waitUntil((async () => {
        await removeOldCache([cacheName]);
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', e => e.respondWith(fromCache(e.request).catch(err => fromNetwork(e.request))));

function fromNetwork(request) {
    return new Promise((fulfill, reject) => fetch(request).then((response) => fulfill(response), reject)).catch(() => useFallback(request));;
}

const FALLBACK = '{"websocket":true,"origins":["*:*"],"cookie_needed":false,"entropy":2494005951}';

function useFallback() {
    return Promise.resolve(new Response(FALLBACK, { headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }}));
}

function fromCache(request) {
    return caches.open(cacheName).then(cache => cache.match(request).then(matching => matching || Promise.reject('no-match')));
}

const cacheName = 'ahj-v1';
const files = [
    '/',
    '/main.css',
    '/main.js',
    '/images/favicon.png',
    '/images/undying.jpg'
]

async function putFilesToCache(files) {
    const cache = await caches.open(cacheName);
    await cache.addAll(files);
}

async function removeOldCache(retain) {
    const keys = await caches.keys();
    return Promise.all(keys.filter(key => !retain.includes(key)).map(key => caches.delete(key)));
}