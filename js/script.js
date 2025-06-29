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

// funcion anonima autoejecutable del instalador de la app web

(() => {
    let aviso;

    window.addEventListener('beforeinstallprompt', (event) => {
        // prevenimos que el navegador muestre el avisito de instalación para tener el nuestro propio
        event.preventDefault();
        aviso = event;
        console.log('Evento beforeinstallprompt capturado:', aviso);

        ShowAddToHomeScreen();
    });

    const ShowAddToHomeScreen = () => {
        //mostramos el botoncito de instalación de la app web
        let showAlert = document.querySelector('#install-app');
        showAlert.style.display = 'flex';
        //al clickearlo, llamamos a la función AddToHomeScreen
        showAlert.addEventListener('click', AddToHomeScreen);
    };

    const AddToHomeScreen = () => {
        // se supone que no debería volver a mostrar el botón de instalación :')
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

//si el navegador soporta notificaciones, y el usuario no las ha denegado, se le pide permiso para mostrarlas
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


/* status de conección a la red */

(()=>{
    //busca el div con el id status-app
    let statusMenu = document.querySelector('#status-app');

    //si está online, el background del div cambia a verde
    const state = () =>{
        if(navigator.onLine){
            statusMenu.style.background = '#37db5b';
            console.log("hay conexión!!!")
        }else{
           //si está offline, el background del div cambia a rosa
            console.log(" No hay conexión D:")
            statusMenu.style.background = '#E40080';
        }
    }
    //si está online llama a la función state para verificar otra vez el estado de la conexión
    if(navigator.onLine){
        state()
    }
    //agrega un listener al evento online y offline y ejecuta la función cada vez que se conecta o desconecta de la red
    window.addEventListener("online", state);
    window.addEventListener("offline", state)

})();

