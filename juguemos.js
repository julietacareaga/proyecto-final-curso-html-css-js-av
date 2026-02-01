window.addEventListener("scroll",()=>{
    if(window.scrollY>100){
        document.querySelector(".cabecera").classList.add("fondoCabecera")
        document.querySelectorAll(".ancla").forEach(a=>a.classList.add("colorAnclas"))
    }else{
        document.querySelector(".cabecera").classList.remove("fondoCabecera")
        document.querySelectorAll(".ancla").forEach(a=>a.classList.remove("colorAnclas"))
    }
})

let contador = 0;
let soltar, soltar2, soltar3;

function iniciar() {
    // Seleccionamos tus clases e IDs actuales
    const imagenes = document.querySelectorAll('.pieza');
    soltar = document.getElementById('zona1');
    soltar2 = document.getElementById('zona2');
    soltar3 = document.getElementById('zona3');

    // Eventos para las piezas
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].addEventListener('dragstart', arrastrado, false);
    }

    // Eventos para las zonas de soltado
    const zonas = [soltar, soltar2, soltar3];
    zonas.forEach(zona => {
        zona.addEventListener('dragenter', (e) => e.preventDefault(), false);
        zona.addEventListener('dragover', (e) => e.preventDefault(), false);
        zona.addEventListener('drop', soltado, false);
    });
}

function arrastrado(e) {
    // Guardamos el ID de la pieza
    e.dataTransfer.setData('Text', e.target.id);
}

function soltado(e) {
    e.preventDefault();
    let id = e.dataTransfer.getData('Text');
    let imagenOriginal = document.getElementById(id);
    
    // Determinamos el contenedor (la zona)
    let contenedor;
    if (e.target.tagName === "P") {
        contenedor = e.target.parentNode;
    } else {
        contenedor = e.target;
    }

    // Si la zona está vacía, ponemos la imagen
    if (contenedor.classList.contains('zona') && !contenedor.querySelector('img')) {
        contenedor.innerHTML = '<img src="' + imagenOriginal.src + '" style="width:100%; height:100%;">';
        contenedor.setAttribute('data-id', id); // Guardamos el ID para validar
        imagenOriginal.style.display = 'none';
        contador++;

        if (contador === 3) {
            finalizarJuego();
        }
    }
}

function finalizarJuego() {
    const zonaDestino = document.querySelector(".zonaDestino");
    const titulo = document.querySelector(".rompecabezas h2");
    const primerSec = document.querySelector(".primerSeccion");
    const segundaSec = document.querySelector(".segundaSeccion");
    const btnReiniciar = document.getElementById("reiniciar");

    // VALIDACIÓN SEGÚN TU HTML:
    // Zona 1 (Rompe1.png) -> pieza3
    // Zona 2 (Rompe2.png) -> pieza1
    // Zona 3 (rompe3.png) -> pieza2
    let esCorrecto = 
        document.getElementById('zona1').getAttribute('data-id') === "pieza3" &&
        document.getElementById('zona2').getAttribute('data-id') === "pieza1" &&
        document.getElementById('zona3').getAttribute('data-id') === "pieza2";

    // 1. Animación de Unión (Igual al link)
    zonaDestino.classList.add('unir');

    if (esCorrecto) {
        // ÉXITO: Esperamos a que se unan y luego disparamos el mensaje
        setTimeout(() => {
            primerSec.classList.add('ocultar');
            segundaSec.classList.add('ocultar');
            
            titulo.innerHTML = "¡Felicitaciones!!<br>Puzzle correctamente resuelto";
            titulo.classList.add('mensaje-final-animado');
            
            btnReiniciar.classList.add('visible');
            btnReiniciar.style.opacity = "1";
        }, 2500);
    } else {
        // ERROR: Estilo visual de fallo
        setTimeout(() => {
            primerSec.classList.add('ocultar');
            segundaSec.classList.add('ocultar');

            titulo.innerHTML = "Lo sentimos, Puzzle no resuelto.<br>Prueba otra vez";
            titulo.style.color = "white";
            titulo.style.textShadow = "2px 2px #808080, 4px 4px black";
            titulo.classList.add('mensaje-final-animado');
            
            btnReiniciar.classList.add('visible');
            btnReiniciar.style.opacity = "1";
        }, 2500);
    }
    btnReiniciar.addEventListener("click", ()=>{
        window.location.reload();
    })
}

iniciar();