/* service worker registration */
/* Ref: https://developers.google.com/web/fundamentals/primers/service-workers/ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js', { scope: "/" }).then(function (registration) {
      // Registration was successful
      console.log('Service Worker Registration Successful!: ', registration.scope);
    }, function (err) {
      // registration failed
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}