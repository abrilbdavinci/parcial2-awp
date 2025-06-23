//cacheo estatico - precacheo. 
var cacheName = 'cache';

//sw se pone en la carpeta raiz del proyecto para que tenga alcance global

//"self" se refiere al propio sw
self.addEventListener('activate', function(event){
    console.log('El SW esta ativado', event)
})

self.addEventListener('install', function(event){

    self.skipWaiting(); //cada vez que se haga un cambio y se recarga la pagina se vuelva a cargar el ws, asi no hay que limpiar el cache cada vez.


    console.log('El SW se instalo', event) //install event
    //se trabaja con el cache cuando se instala el service worker


})


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
            if (response) {
                //revisa si el request que se hace en el evento, existe. como es promesa, en caso de que SI exista, la devuelve. La respuesta que estaria devolviendo es
                // Si existe en caché, lo devuelve
                return response;
            }
    
            //sino, clona la solicitud: una solicitud es un flujo y se puede consumir solo una vez
            const requestToCache = event.request.clone();
    
            return fetch(requestToCache)
                .then((response) => {
                // Si la respuesta no es válida, simplemente la retorna
                if (!response || response.status !== 200) {
                    return response;
                }
    
                const responseToCache = response.clone();
                //cada vez que se usa la respuesta se tiene que clonar. Porque se necesita agregarla a la cache una sola vez. Se usa para la respuesta final.

                //si hubo respuesta del servidor optima, esa respuesta se usa para guardarla en cache.
    
                caches.open(cacheName)
                    .then((cache) => {
                    cache.put(event.request, responseToCache);
                    });
    
                    // Se devuelve la respuesta original
                    return response;
                });
            })
    );
});

(()=>{
    let statusMenu = document.querySelector('#status-app');
    let statusPwa = document.querySelector('meta[name=theme-color]');


    const state = () =>{
        if(navigator.online){
            statusMenu.classList.remove('offline')
            console.log("hay")
        }else{
            console.log(" No hay")
            statusMenu.classList.add('offline');
            statusPwa.setAttribute('content', '#E40080')
        }
    }

    if(navigator.online){
        state()
    }

    window.addEventListener("online", state);
    window.addEventListener("offlne", state)

})();


