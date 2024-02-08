const menu = document.querySelector('.expansive');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnVinos = document.querySelector('.vinos');
const contenedorPlatillos = document.querySelector('.platillos');
document.addEventListener('DOMContentLoaded',()=>{ /*se abre cuando se ejecuta el html */
    eventos();
    platillos();
});

const eventos = () =>{
    menu.addEventListener('click', abrirMenu)
}

const abrirMenu = () =>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = ()=>{
    const btnCerrar = document.createElement('p')
    const overlay = document.createElement('div'); /*cubre la pantalla */
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return; /* para no poder generar mas overlay, solo 1 */
    body.appendChild(overlay);
    btnCerrar.textContent='x';
    btnCerrar.classList.add('btn-cerrar');
    while(navegacion.children[5]){ /*Así se evita que la acción cerrar se ejecute incontables veces*/
        navegacion.removeChild(navegacion.children[5]);
    }
    navegacion.appendChild(btnCerrar); /*Le pasamos un nuevo hijo a navegación (el boton cerrar) */
    cerrarMenu(btnCerrar, overlay);
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen=>{
    imagen.src = imagen.dataset.src;
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click', ()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
    });
    
    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
    }
}

const platillos = () =>{
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');
    platillos.forEach(platillo=>platillosArreglo = [...platillosArreglo,platillo]);

    const ensaladas = platillosArreglo.filter(ensalada=> ensalada.getAttribute('data-platillo') ==='ensalada');
    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo')=== 'pasta');
    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo')=== 'pizza');
    const vinos = platillosArreglo.filter(vino => vino.getAttribute('data-platillo')=== 'vino');

    mostrarPlatillos(ensaladas, pastas, pizzas, vinos, platillosArreglo);
}

const mostrarPlatillos = (ensaladas, pastas, pizzas, vinos, todos) =>{
    btnEnsaladas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        ensaladas.forEach(ensalada=> contenedorPlatillos.appendChild(ensalada));
    });

    btnPasta.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pastas.forEach(pasta=> contenedorPlatillos.appendChild(pasta));
    });

    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pizzas.forEach(pizza=> contenedorPlatillos.appendChild(pizza));
    });

    btnVinos.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        vinos.forEach(vino=> contenedorPlatillos.appendChild(vino));
    });

    btnTodos.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    })
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}