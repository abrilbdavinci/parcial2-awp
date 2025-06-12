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



