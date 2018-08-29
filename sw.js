let staticCacheName = 'restaurants-static-v3';
let urlsToCache = [
	'./',
	'index.html',
	'restaurant.html',
	'css/styles.css',
	'dist/main.js',
	'dist/restaurant.js',
	'images/img/favicon.ico',
	'images/img/icon-512.png',
	'images/img/icon-256.png',
	'images/img/icon.png',
	'images/1-small.jpg',
	'images/2-small.jpg',
	'images/3-small.jpg',
	'images/4-small.jpg',
	'images/5-small.jpg',
	'images/6-small.jpg',
	'images/7-small.jpg',
	'images/8-small.jpg',
	'images/9-small.jpg',
	'images/10-small.jpg',
	'images/1-medium.jpg',
	'images/2-medium.jpg',
	'images/3-medium.jpg',
	'images/4-medium.jpg',
	'images/5-medium.jpg',
	'images/6-medium.jpg',
	'images/7-medium.jpg',
	'images/8-medium.jpg',
	'images/9-medium.jpg',
	'images/10-medium.jpg'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(staticCacheName)
			.then(cache => cache.addAll(urlsToCache))
			.then(self.skipWaiting())
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames =>
			Promise.all(
				cacheNames
					.filter(
						cacheName =>
							cacheName.startsWith('restaurants-') &&
							cacheName !== staticCacheName
					)
					.map(cacheName => {
						console.log(
							`⚙️ ServiceWorker Deleting the cached files from ${cacheName} `
						);
						return caches.delete(cacheName);
					})
			)
		)
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});
