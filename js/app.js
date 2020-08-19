import * as UI from './interfaz.js';
import { API } from './api.js';

UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener os datos del formulario
    const artista = document.querySelector('#artista').value,
        cancion = document.querySelector('#cancion').value;
    
    if (artista === '' || cancion === '') {
        // El usuario deja los campos vacios, genera un error
        UI.divMensajes.innerHTML = 'Error debe diligenciar todos los campos del formulario';
        UI.divMensajes.classList.add('error');
        setTimeout(() => {
             UI.divMensajes.innerHTML ='';
             UI.divMensajes.classList.remove("error");
        }, 3000);
    } else {
        // Los datos estan validados, realizar la consulta.
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(data => {
                if (data.respuesta.lyrics) {
                    //la cacion si existe
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                } else {
                     UI.divMensajes.innerHTML =
                       "La canción no existe revisan los datos ingresados";
                     UI.divMensajes.classList.add("error");
                     setTimeout(() => {
                       UI.divMensajes.innerHTML = "";
                         UI.divMensajes.classList.remove("error");
                         UI.formularioBuscar.reset();
                     }, 3000);
                }
            })
    }

})