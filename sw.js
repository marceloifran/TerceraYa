 const cache_name = 'v1 cache'
 urlsToCache = [
    '<link href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic" rel="stylesheet" />',
    'css/estilos.css',
    'script.js',
    'manifest.json'
 ]
 
 self.addEventListener('install',e => {
    e.waitUntil (caches.open(cache_name))
    .then(cache=>{
       return cache.addAll(urlsToCache)
       .then(()=>self.skipWaiting())
    })
 })


 self.addEventListener('activate',e => {
    const cacheWhiteList =[cache_name]
    e.waitUntil(
       caches.keys()
       .then(cache_name=>{
          return Promise.all(
          cache_name.map(cache_name=> {
             if(cacheWhiteList.indexOf(cache_name)===-1) {
                return caches.delete(cache_name)
             }
          })
          )
       })
       .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch',e => {
    e.respondWith(
       caches.match(e.request)
       .then(res=> {
          if (res) {
             return res
          }
          return fetch(e.request)
       })
    )
})

