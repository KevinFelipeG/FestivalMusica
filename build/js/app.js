document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});
function iniciarApp() {
    navegacionFija(); 
    crearGaleria();
    scrollNav();
}
 function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');
    window.addEventListener('scroll', function() {
        if(sobreFestival.getBoundingClientRect().bottom < 0 ){ // top con la parte de arriba / botton con la perte inferior / se activa
            barra.classList.add('fijo');//Se cream las clases que parcen invisbles, se crean ejecutando cierta accion estas se crean en cierta parte del scroll
             body.classList.add('body-scroll'); //Se cream las clases que parcen invisbles, se crean ejecutando cierta accion
         }else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
         }
     })
 }
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a'); // esto selescionara los enclaces que nos llevan al citio
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}
function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes ');
    
    for(let i = 1; i <= 12; i++) { //Se crea el condicional o cliclo for = para / para que rrecorra las 12 img (teniedo en cuenta que las img su numero son los numeros)
        const imagen = document.createElement('picture');
        imagen.innerHTML = ` 
        <source srcset="build/img/thumb/${i}avif" type="imagen${i}/avif"> 
        <source srcset="build/img/thumb/${i}.webp" type="imagen${i}/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen Galeria">    
        `;//La anterior Sintaxys es para que el ciclo rrecorra las imagenes de manera que el nevegador puedas escoger el formato que mas se adapte
        imagen.onclick = function() { //callBack para poder enviar la variable i 
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}
function mostrarImagen(id){
    const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="imagen${id}/avif"> 
        <source srcset="build/img/grande/${id}.webp" type="imagen${id}/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen Galeria">    
        `;
        //Crea el Overley con la iamgen 
        const overlay = document.createElement('DIV'); //Es creando el html el <dov>
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        overlay.onclick = function(){ // para que se pueda salir taambien si que tenga que dar en la x
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        }
        //Boton para cerrar el MODAL
        const cerrarModal = document.createElement('p');//Es creando el html el <p>
        cerrarModal.textContent = 'X'; //Este va hacer el texto de la x de cerrar
        cerrarModal. classList.add('btn-cerrar'); //se esta creando la clase del boton
        cerrarModal.onclick = function() { //CallBack - para ejecutar mas de accion
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();//este remove es especial de JavaScript lo que hace es cerrrar la accion de abrir la imagen
        }
        overlay.appendChild(cerrarModal);//SE TIENE QUE AGREGAR AL OVERLAY PARA QUE SEA VISIBLE
        //Añadirlo al Html
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body'); //Se crea la clase para caundo se abra la iamgen no se pueda dar scroll y la imagen sea fija
    }