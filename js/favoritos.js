const seccionFavoritos = document.getElementById('favoritos');
let listaFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function mostrarFavoritos() {
    seccionFavoritos.innerHTML = '';

    if (listaFavoritos.length === 0) {
        seccionFavoritos.innerHTML = '<p class="text-white"><i class="fa-regular fa-circle-xmark text-white"></i>No hay shows en favoritos aún.</p>';
        return;
    }

    listaFavoritos.forEach((show, indice) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        
        // Verificar si existe la imagen y usar una imagen por defecto si no existe
        const imagenUrl = show.image && show.image.medium ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image';
        
        tarjeta.innerHTML = `
            <img src="${imagenUrl}" alt="${show.name}" />
            <h3>${show.name}</h3>
            <div class="card-footer eliminar-favoritos">
                <button onclick='eliminarFavorito(${indice})'><i class="fa-solid fa-trash"></i> Eliminar</button>
            </div>
        `;
        seccionFavoritos.appendChild(tarjeta);
    });
}

//busca en el localStorage los favoritos guardados con el indice de la peli elegida
function eliminarFavorito(indice) {
    // busca el nro del indice y de ahí borra 1 elemento(osea, una sola peli)
    listaFavoritos.splice(indice, 1);
    localStorage.setItem('favoritos', JSON.stringify(listaFavoritos));
    //muestra los favoritos actualizados
    mostrarFavoritos();
}

mostrarFavoritos();
