const menu = document.querySelector('.equiposcomputo');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnOrdenadores = document.querySelector('.ordenadores');
const btnAudifonos = document.querySelector('.audifonos');
const btnSillas = document.querySelector('.sillas');
const btnTeclados = document.querySelector('.teclados');
const contenedorProductos = document.querySelector('.productos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    productos();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const productos = () =>{
    let productosArreglo = [];
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto=> productosArreglo = [...productosArreglo,producto]);

    const ordenadores = productosArreglo.filter(ordenador=> ordenador.getAttribute('data-producto') === 'ordenador');
    const audifonos = productosArreglo.filter(audifono => audifono.getAttribute('data-producto') === 'audifono');
    const sillas = productosArreglo.filter(silla => silla.getAttribute('data-producto') === 'silla');
    const teclados = productosArreglo.filter(teclado=> teclado.getAttribute('data-producto') === 'teclado');

    mostrarProductos(ordenadores, audifonos, sillas, teclados, productosArreglo);

}

const mostrarProductos = (ordenadores, audifonos, sillas, teclados, todos) =>{
    btnOrdenadores.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        ordenadores.forEach(ordenador=> contenedorProductos.appendChild(ordenador));
    });

    btnAudifonos.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        audifonos.forEach(audifono=> contenedorProductos.appendChild(audifono));
    });

    btnSillas.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        sillas.forEach(silla=> contenedorProductos.appendChild(silla));
    });
    btnTeclados.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        teclados.forEach(teclado=> contenedorProductos.appendChild(teclado));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        todos.forEach(todo=> contenedorProductos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}