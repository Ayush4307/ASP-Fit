const CACHE_NAME = 'asp-fit-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './tracker.html',
    './exercises.html',
    './history.html',
    './progress.html',
    './learn.html',
    './profile.html',
    './CSS/main.css',
    './CSS/components.css',
    './CSS/pages.css',
    './CSS/animations.css',
    './JS/app.js',
    './JS/tracker.js',
    './JS/exercises.js',
    './JS/history.js',
    './JS/progress.js',
    './JS/learn.js',
    './JS/profile.js',
    './manifest.json',
    './icon.svg',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install event: cache all core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate event: clean up old caches if any
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event: network first, then fallback to cache
self.addEventListener('fetch', (event) => {
    // We use a network-first strategy for a dynamic app like this, 
    // falling back to cache if offline.
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
