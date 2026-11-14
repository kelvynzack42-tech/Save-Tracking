const CACHE_NAME = 'savetrack-v29-blue-white-yellow';
const APP_SHELL = ['./','./index.html','./manifest.webmanifest','./icons/savetrack-192.png','./icons/savetrack-512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req=event.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin)return;
  // Never cache authenticated API responses or payment endpoints: they contain private account data.
  if(url.pathname.startsWith('/api/'))return;
  // Keep the dashboard shell current; static icons can use cache-first.
  if(req.mode==='navigate'||url.pathname.endsWith('.html')){
    event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy))}return response}).catch(()=>caches.match(req).then(x=>x||caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(c=>c.put(req,copy))}return response}).catch(()=>caches.match('./index.html'))));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const client of list)if('focus'in client)return client.focus();if(self.clients.openWindow)return self.clients.openWindow('./')}));
});
