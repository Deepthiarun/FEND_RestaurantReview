const cacheName = 'offline-v1';
const filesToCache = [
    '/',
    '/css',
    '/data',
    '/img',
    '/js',
    '/index.html',
    '/restaurant.html',
    '/sw.js',
    '/css/styles-details.css',
    '/css/styles-main.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/10.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js'
];

self.addEventListener('install', function (event) {
    event.waitUntill(
        caches.open(cacheName).then(function (myCache) {
            console.log(cacheName + ' cache opened successfully');
            return myCache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            }

            var fetchRequest = event.request.clone(); // create a copy of the reqest
            return fetch(fetchRequest).then(function (response) {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    //console.log(response);
                    return response;
                }

                let cloneOfResponse = response.clone(); // create a copy of the response
                caches.open(cacheName).then(function (cache) {
                    cache.put(event.request, cloneOfResponse);
                })
                return response;
            })
            .catch(function (err) {
                console.log(err);
            });
        })
    );
});


/* Ref: https://developers.google.com/web/fundamentals/primers/service-workers/ */

self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['offline-v1'];
     event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });