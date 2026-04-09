const CACHE_NAME = 'sqlformatter-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/og-image.svg',
    '/pages/vs-sqlformat.html',
    '/pages/vs-dbeaver.html',
    '/pages/sql-beautifier.html',
    '/pages/how-to-format-sql.html',
    '/pages/sql-minifier.html'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});
