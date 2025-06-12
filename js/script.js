if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration){
                console.log('el registro del SW fue exitoso. Tiene este alcance; ', registration.scope)
            }).catch(function(error){
                console.log('el registro del SW salio mal (no le gusto un joraca):', error)
            })
    }); //cuando cargue (load) el js se ejecuta

}