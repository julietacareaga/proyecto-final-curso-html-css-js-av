window.addEventListener("scroll",()=>{
    if(window.scrollY>100){
        document.querySelector(".cabecera").classList.add("fondoCabecera")
        document.querySelectorAll(".ancla").forEach(a=>a.classList.add("colorAnclas"))
    }else{
        document.querySelector(".cabecera").classList.remove("fondoCabecera")
        document.querySelectorAll(".ancla").forEach(a=>a.classList.remove("colorAnclas"))
    }
})

let contador=0;
let drop1, drop2, drop3;

function iniciar() {
    let imagenes=document.querySelectorAll(".pieza");
    drop1=document.getElementById("zona1");
    drop2=document.getElementById("zona2");
    drop3=document.getElementById("zona3");
    


    // eventos piezas
    for (let i=0; i<imagenes.length; i++){
        imagenes[i].addEventListener("dragstart", arrastrar, false);
    }

    // eventos drop
    let zonas=[drop1, drop2, drop3]
    zonas.forEach(zona=>{
        zona.addEventListener("dragenter", (e)=>e.preventDefault(), false);
        zona.addEventListener("dragover", (e)=>e.preventDefault(), false);
        zona.addEventListener("drop", soltar, false);
    })
}

function arrastrar(e){
    //se guarda el id
    e.dataTransfer.setData("Text", e.target.id);
}

function soltar(e){
    e.preventDefault();
    let id=e.dataTransfer.getData("Text");
    let imagenOriginal=document.getElementById(id);
    
    let contenedor
    if(e.target.tagName==="p"){
        contenedor=e.target.parentNode
    }else{
        contenedor=e.target
    }
    // si la zona esta vacia, ponemos la imagen
    if(contenedor.classList.contains('zona') && !contenedor.querySelector("img")){
        contenedor.innerHTML='<img src="'+imagenOriginal.src+'" style="width:100%; height:100%;">'
        contenedor.setAttribute("data-id",id)
        imagenOriginal.style.display="none"
        contador++

        if(contador===3){
            finalizarJuego()
        }
    }
}

function finalizarJuego() {
    let zonaDestino=document.querySelector(".zonaDestino")
    let titulo=document.querySelector(".tituloPuzzle")
    let primerSec=document.querySelector(".primerSeccion")
    let segundaSec=document.querySelector(".segundaSeccion")
    let btnReiniciar=document.getElementById("reiniciar")

    // zona 1-> pieza3
    // zona 2-> pieza1
    // zona 3-> pieza2
    let esCorrecto= 
        document.getElementById("zona1").getAttribute("data-id")=== "pieza3" &&
        document.getElementById("zona2").getAttribute("data-id")=== "pieza1" &&
        document.getElementById("zona3").getAttribute("data-id")=== "pieza2"

    // animacion unir
    zonaDestino.classList.add("unir");

    if(esCorrecto){
        // exito
        setTimeout(()=>{
            primerSec.classList.add("ocultar")
            segundaSec.classList.add("ocultar")
            
            titulo.innerHTML="Felicitaciones!!<br>Puzzle correctamente resuelto"
            titulo.classList.add("tituloAnimado")
            
            btnReiniciar.style.opacity="1"
        },2500)
    }else{
        // error
        setTimeout(()=>{
            primerSec.classList.add("ocultar2")
            segundaSec.classList.add("ocultar2")

            titulo.innerHTML="Lo sentimos, Puzzle no resuelto.<br>Prueba otra vez"
            titulo.style.color="white"
            titulo.style.textShadow="2px 2px #808080, 4px 4px black"
            titulo.classList.add("tituloAnimado")
            
            btnReiniciar.style.opacity="1"
        },2500)
    }
    btnReiniciar.addEventListener("click",()=>{
        window.location.reload()
    })
}

iniciar()