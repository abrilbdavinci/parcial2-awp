//sw se pone en la carpeta raiz del proyecto para que tenga alcance global

//"self" se refiere al propio sw
self.addEventListener('active', function(e){
    console.log('El SW esta ativado', e)
})

self.addEventListener('install', function(e){
    console.log('El SW se instalo', e) //install event
})