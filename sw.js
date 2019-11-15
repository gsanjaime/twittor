importScripts('js/sw-utils.js');


const CACHE_STATIC = 'static-v3';
const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_INMUTABLE = 'inmutable-v1';

self.addEventListener('install', event => {
    
    const miCacheStatico = caches.open(CACHE_STATIC).then(miCache =>{
            return miCache.addAll([
                //'/',
                'index.html',
                'css/style.css',
                'img/favicon.ico',
                'img/avatars/spiderman.jpg',
                'img/avatars/ironman.jpg',
                'img/avatars/wolverine.jpg',
                'img/avatars/thor.jpg',
                'img/avatars/hulk.jpg',
                'js/sw-utils.js',
                'js/app.js'
            ]);
    });    

    const miCacheInmutable = caches.open(CACHE_INMUTABLE).then(miCache =>{
            return miCache.addAll([
                'https://fonts.googleapis.com/css?family=Quicksand:300,400',
                'https://fonts.googleapis.com/css?family=Lato:400,300',
                'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
                'css/animate.css',
                'js/libs/jquery.js'
            ]);        
    });
        
    event.waitUntil(Promise.all([miCacheStatico,miCacheInmutable]));
});

self.addEventListener('activate', event => {

    const miRespuesta = caches.keys().then(miKeys => {
        miKeys.forEach(miCacheName => {
            if (miCacheName !== CACHE_STATIC && miCacheName.includes('static')) {
                return caches.delete(miCacheName);
            }
        });

    });
    event.waitUntil(miRespuesta);
});

self.addEventListener('fetch', event => {

    // 3- Estrategia cache on network fallback
    const miRespuesta = caches.match(event.request).then(miResponse =>{
        if (miResponse) return miResponse;

        return fetch(event.request).then(miResponse_2 =>{

            return actualizaCacheDinamico(CACHE_DYNAMIC,event.request,miResponse_2);            

        });
    });

    event.respondWith(miRespuesta);    
});

