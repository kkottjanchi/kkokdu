var CACHE='kkokdu-v5';
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(['./','./index.html']);}));
  self.skipWaiting();
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.map(function(k){ return k===CACHE?null:caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
/* 네트워크 우선 — 열 때마다 최신을 받고, 끊겼을 때만 캐시로 */
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(function(r){
      var cp=r.clone();
      caches.open(CACHE).then(function(c){ try{c.put(e.request,cp);}catch(err){} });
      return r;
    }).catch(function(){
      return caches.match(e.request).then(function(r){ return r||caches.match('./index.html'); });
    })
  );
});
