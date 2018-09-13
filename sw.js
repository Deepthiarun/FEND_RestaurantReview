const filesToCache = [
/*     '/index.html',
    '/restaurant.html' */
];

console.log("SW Registered");

self.addEventListener('install', function (evt) {
    evt.waitUntill(
        caches.open('offline-v1').then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
    
});

/* self.addEventListener('activate', function (evt) {

    console.log("ACTIVATE");
    
});

self.addEventListener('fetch', function (evt) {
    console.log("FETCH");
}); */