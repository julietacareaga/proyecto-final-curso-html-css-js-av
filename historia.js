window.addEventListener("scroll",()=>{
    if(window.scrollY>100){
        document.querySelector(".cabecera").classList.add("fondoCabecera")
        document.querySelectorAll(".ancla").forEach(a=>a.classList.add("colorAnclas"))
    }else{
        document.querySelector(".cabecera").classList.remove("fondoCabecera")
        document.querySelectorAll(".ancla").forEach(a=>a.classList.remove("colorAnclas"))
    }
})

window.addEventListener("scroll",()=>{
    if(window.scrollY>200){
        document.querySelector(".texto1").classList.add("animacionTexto1")
        document.querySelector("#imagen1").classList.add("animacionImagenes1")
    }if(window.scrollY>600){
        document.querySelector(".texto2").classList.add("animacionTexto2")
        document.querySelector("#imagen2").classList.add("animacionImagenes2")      
    }if(window.scrollY>1200){
        document.querySelector(".texto3").classList.add("animacionTexto1")
        document.querySelector("#imagen3").classList.add("animacionImagenes1")
    }    
})

let play=document.querySelector("#play")
let pausa=document.querySelector("#pausa")
let video=document.querySelector("video")
let tiempoVideo=document.querySelector("#tiempo")
let textoBase=tiempoVideo.textContent

let duracionVideo

let pasarATiempo=(tiempo)=>{
    if(tiempo<60){
        if(tiempo.toFixed(0)<10){
            return`00:0${tiempo.toFixed(0)}`
        }
        return`00:${tiempo.toFixed(0)}`
    }else{
        let minutos=parseInt(tiempo/60)
        let segundos=(tiempo/60-minutos)*60
        if(segundos<10){
            return`${minutos}:0${segundos.toFixed(0)}`
        }
        return`${minutos}:${segundos.toFixed(0)}`
    }
}

setTimeout(()=>{
    tiempoVideo.textContent =
        textoBase+" "+
        pasarATiempo(video.currentTime) +
        " / " +
        pasarATiempo(video.duration)
},500)

play.addEventListener("click",()=>{
    video.play()
    clearInterval(duracionVideo)
    duracionVideo=setInterval(()=>{
        tiempoVideo.textContent=
            textoBase + " " +
            pasarATiempo(video.currentTime) +
            " / "+ pasarATiempo(video.duration)
    },1000)
})

pausa.addEventListener("click",()=>{
    video.pause()
    clearInterval(duracionVideo)
})