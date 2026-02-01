window.addEventListener("scroll",()=>{
    if(window.scrollY>200){
        document.querySelector(".tarjeta1").classList.add("animacionTarjeta1")
    }
})    

window.addEventListener("scroll",()=>{
    if(window.scrollY>200){
        document.querySelector(".tarjeta2").classList.add("animacionTarjeta2")
    }
}) 

window.addEventListener("scroll",()=>{
    if(window.scrollY>100){
        document.querySelector(".cabecera").classList.add("fondoCabecera")
        document.querySelectorAll(".ancla").forEach(a=>a.classList.add("colorAnclas"))
    }else{
        document.querySelector(".cabecera").classList.remove("fondoCabecera")
        document.querySelectorAll(".ancla").forEach(a=>a.classList.remove("colorAnclas"))
    }
})
