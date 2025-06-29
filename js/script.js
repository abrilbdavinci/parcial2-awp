if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('sw.js')
            .then(function(registration){
                console.log('el registro del SW fue exitoso. Tiene este alcance; ', registration.scope)
            }).catch(function(error){
                console.log('el registro del SW salio mal (no le gusto un joraca):', error)
            })
    }); //cuando cargue (load) el js se ejecuta

}

// funcion anonima autoejecutable. 

(() => {
    let aviso;

    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        aviso = event;
        console.log('Evento beforeinstallprompt capturado:', aviso);

        ShowAddToHomeScreen();
    });

    const ShowAddToHomeScreen = () => {
        let showAlert = document.querySelector('#install-app');
        showAlert.style.display = 'flex';
        showAlert.addEventListener('click', AddToHomeScreen);
    };

    const AddToHomeScreen = () => {
        let showAlert = document.querySelector('#install-app');
        showAlert.style.display = 'none';

        if (aviso) {
            aviso.prompt().then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('El usuario aceptó la instalación');
                } else {
                    console.log('El usuario rechazó la instalación');
                }
                aviso = null;
            });                
        }
    };
})();


if(window.Notification && Notification.permission !== 'denied'){
    console.log('notificaciones permitidas');

    setTimeout('Notification.requestPermission()', 5000)

    //crear notificacion
    //dos parametros(tituloNotificacion, objetoJS para el cuerpo de la notifiacion)
    new Notification("Busca SeriesTV", {
        body: "Encontrar tus series favoritas ahora es más fácil!",
        icon: "favicon/android-icon-144x144.png",//como script se ejecuta desde index.html, no se usa ../
        image: "img/img-notification-push.png",
        badge: "favicon/android-icon-144x144.png"

    })

    
}

/* status en linea */

(()=>{
    //busca el div con el id status-app
    let statusMenu = document.querySelector('#status-app');

    //si está online, elimina la clase 'offline' del div
    const state = () =>{
        if(navigator.onLine){
            statusMenu.classList.remove('offline')
            statusMenu.style.background = '#37db5b';
            console.log("hay conexión!!!")
        }else{
            //si está offline, agrega la clase 'offline' al div
            console.log(" No hay conexión D:")
            statusMenu.classList.add('offline');
            statusMenu.style.background = '#E40080';
        }
    }
    //si está online llama a la función state de recién par verificar de vuelta el estado de la conexión
    if(navigator.onLine){
        state()
    }

    window.addEventListener("online", state);
    window.addEventListener("offline", state)

})();

