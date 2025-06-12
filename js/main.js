const API = 'https://api.tvmaze.com/shows'; //URL base de la API para hacer las peticiones.

const contenedorShows = document.getElementById('shows');
const modal = document.getElementById('modal');
const buscador = document.getElementById('buscador');

async function obtenerShows(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta){
            console.log('Error al conectar con la API');
        }else{
            console.log('Conectado a la API correctamente')
        }
        const datos = await respuesta.json();
        mostrarShows(datos);
    } catch (error) {
        contenedorShows.innerHTML = '<p class="error"> No se pudo cargar la información. Intenta nuevamente.</p>';
        console.error('Error:', error)
    }
}



function mostrarShows(data) {
    contenedorShows.innerHTML = '';

    const shows = data && data[0]?.show ? data.map(item => item.show) : data || [];

    if (!Array.isArray(shows)) {
        contenedorShows.innerHTML = `<p class="text-danger">No se encontró el título buscado. Intentar con otro título.</p>`;
        return;
    }

    shows.forEach(show => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer';

        tarjeta.innerHTML = `
            <img 
                src="${show.image?.original || 'https://via.placeholder.com/300x450?text=No+Image'}" 
                alt="${show.name}" 
                style="width: 100%; height: 500px; object-fit: cover;" 
            />
            <h3>${show.name}</h3>
        `;

        cardFooter.innerHTML = `
            <button onclick='verDetalle(${show.id})'>
                <i class="fa-solid fa-circle-info"></i>
                <span class="btn-text">Ver detalles</span>
            </button>
            <button onclick='agregarAFavoritos(${show.id})'>
                <i class="fa-solid fa-star"></i>
                <span class="btn-text">Agregar a favoritos</span>
            </button>
        `;

        tarjeta.appendChild(cardFooter);
        contenedorShows.appendChild(tarjeta);
    });
}



async function verDetalle(id) {
    try {
        const respuesta = await fetch(`${API}/${id}`);
        const show = await respuesta.json();

        // Definimos el contenido del modal con estilo responsive
        modal.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-centered animate__animated animate__fadeInDown">
            <div class="modal-content shadow-lg border-0 rounded-4">
            
            <div class="modal-header d-flex justify-content-between align-items-center flex-wrap w-100">
                <h2 class="modal-title fs-4 mb-2 mb-md-0">${show.name}</h2>
                <button onclick="cerrarModal()" class="btn-close" aria-label="Close"></button>
            </div>

            <div class="modal-body row align-items-center">
                <div class="col-12 col-md-5 mb-3 mb-md-0 text-center">
                    <img src="${show.image.original}" alt="${show.name}" class="img-fluid w-100 rounded-4 shadow-sm" style="max-height: 500px; object-fit: cover;">
                </div>
                <div class="col-md-7 summary-container">
                    <div class="summary" style="max-height: 400px; overflow-y: auto;">
                        ${show.summary}
                    </div>
                </div>

            </div>

            </div>
        </div>
        `;


        // Mostramos el modal
        modal.classList.add('mostrar');
    } catch (error) {
        console.error('Error:', error);
    }
}


// Función para cerrar el modal
function cerrarModal() {
    modal.classList.remove('mostrar');
}

async function agregarAFavoritos(id) {
    try {
        const respuesta = await fetch(`${API}/${id}`);
        const show = await respuesta.json();
        
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

        // Encuentra si el show ya está en favoritos
        let yaExiste = favoritos.find(item => item.id === show.id);

        // Si no está, se agrega
        if (!yaExiste) {
            favoritos.push(show); // Agrega el nuevo show
            localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Guarda en local storage
            alert('Show agregado a favoritos');
        } else {
            // Si ya estaba, mostramos un mensaje
            alert('El show ya está en favoritos');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar a favoritos');
    }
}


buscador.addEventListener('change', () => {
    const buscar = buscador.value.trim();
    if (buscar.length > 0) {
        obtenerShows(`https://api.tvmaze.com/search/shows?q=${buscar}`);
    }
});

// antes de llamar a obtenerShows verificar si hay datos guardadso en localstorage
const datosGuardados = localStorage.getItem('shows');

if (datosGuardados) {
    mostrarShows(JSON.parse(datosGuardados)); 
} else {
    obtenerShows(`${API}`);// llamar a la API solo si no hay datos guardados
}


