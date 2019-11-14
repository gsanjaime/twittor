function actualizaCacheDinamico(miCachename,miRequest,miResponse) {
    if (miResponse.ok) {
        return caches.open(miCachename).then(miCache => {
            miCache.put(miRequest,miResponse.clone());
            return miResponse.clone();
        })
    } else {
        //return miResponse;
        
    }
}