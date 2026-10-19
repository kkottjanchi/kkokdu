self.addEventListener('install',function(e){e.waitUntil(caches.open('kkokdu-v3').then(function(c){return c.addAll(['./','./index.html']);}));self.skipWaiting();});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request);}));});
