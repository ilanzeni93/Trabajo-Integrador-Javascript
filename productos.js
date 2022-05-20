const botonProducto = document.querySelectorAll(".botonProducto")
const carrito = document.getElementById("carrito")
const carritoVacio = document.getElementById("carritoVacio")
const formCategorias = document.getElementById("formCategorias")
const input = document.getElementById("input")
const hamburguesasCarne = document.getElementById("cajaProductos1")
const hamburguesasPollo = document.getElementById("cajaProductos2")
const hamburguesasVeggie = document.getElementById("cajaProductos3")
const promociones = document.getElementById("cajaProductos4")

function cargarEventos () {
    document.addEventListener("DOMContentLoaded", leerProductosLocalStorage())
}

cargarEventos()

botonProducto.forEach((producto) => {
    producto.addEventListener("click", botonSeleccionado)
})

function botonSeleccionado(evento) {
    const boton = evento.target;
    const traerProducto = boton.parentElement
    const producto = {
        titulo : traerProducto.querySelector(".tituloProducto").textContent,
        precio : traerProducto.querySelector(".precio").textContent,
        imagen : traerProducto.querySelector(".imgProducto").src
    }

    agregarProducto(producto)
}

function agregarProducto(producto) {
    const compraProducto = document.createElement("div")
    compraProducto.classList.add("compraProducto")
    carrito.appendChild(compraProducto)
    carritoVacio.classList.add("carritoVacio")

    compraProducto.innerHTML = `
    <img src=${producto.imagen}>
    <div class="descripcionProducto">
        <p class="nombreProducto">${producto.titulo}</p>
        <div class="cajaCantidad">
            <p class="cantidad">1</p>
            <p class="operador">x</p>
            <p class="precioProducto">${producto.precio}</p>
        </div>
        <button class="fa-solid fa-trash botonBorrar"></button>
    </div>
    `

    const botonEliminar = compraProducto.querySelector(".botonBorrar")
    
    botonEliminar.addEventListener("click", borrarProducto)

    actualizarCarrito()
    this.guardarProductosLocalStorage(producto)
}

function borrarProducto (e) {
    e.preventDefault;
    e.target.parentElement.parentElement.remove()
    let producto = e.target.parentElement.parentElement;
    let nombreProducto = producto.querySelector(".nombreProducto").textContent

    actualizarCarrito()
    eliminarProductosLocalStorage(nombreProducto)
}

function actualizarCarrito () {
    let total = 0;
    const totalCarrito = document.querySelector(".total")
    const productos = document.querySelectorAll(".descripcionProducto")
    
    productos.forEach(descripcionProducto => {
        const precioProductosCarrito = descripcionProducto.querySelector(".precioProducto")
        const precioProducto = Number(precioProductosCarrito.textContent.replace("$", ""))
        
        const cantidadProductoCarrito = document.querySelector(".cantidad")
        const cantidadProducto = Number(cantidadProductoCarrito.textContent)

        total = total + precioProducto * cantidadProducto;

        console.log(total)
    })
    totalCarrito.innerHTML = `TOTAL: $${total}`
}

function guardarProductosLocalStorage(producto) {
    let productos 
    productos = this.obtenerProductosLocalStorage()

    productos.push(producto)
    localStorage.setItem("productos", JSON.stringify(productos))
}

function obtenerProductosLocalStorage() {
    let productoLS

    if(localStorage.getItem("productos") === null) {
        productoLS = []
        console.log(productoLS)
    } 
    else {
        productoLS = JSON.parse(localStorage.getItem("productos"))
    }
    return productoLS
}

function eliminarProductosLocalStorage (nombreProducto) {
    let productosLS
    productosLS = this.obtenerProductosLocalStorage()
    productosLS.forEach(function(productoLS, index){
        if (productoLS.titulo === nombreProducto) {
            productosLS.splice(index, 1)
        }
    })
    localStorage.setItem("productos", JSON.stringify(productosLS))
}


function leerProductosLocalStorage () {
    let productosLS
    productosLS = this.obtenerProductosLocalStorage()
    productosLS.forEach(function(producto){
        const compraProducto = document.createElement("div")
        compraProducto.classList.add("compraProducto")
        carritoVacio.classList.add("carritoVacio")

        compraProducto.innerHTML = `
        <img src=${producto.imagen}>
        <div class="descripcionProducto">
            <p class="nombreProducto">${producto.titulo}</p>
            <div class="cajaCantidad">
                <p class="cantidad">1</p>
                <p class="operador">x</p>
                <p class="precioProducto">${producto.precio}</p>
            </div>
            <button class="fa-solid fa-trash botonBorrar"></button>
        </div>
        `
        const botonEliminar = compraProducto.querySelector(".botonBorrar")
        botonEliminar.addEventListener("click", borrarProducto)

        carrito.appendChild(compraProducto)
    })
}

formCategorias.addEventListener("change", filtrarProductos)

function filtrarProductos () {
    const input = formCategorias.opcion
    const inputValue = input.value

    hamburguesasCarne.classList.remove("eliminarCategoria")
    hamburguesasPollo.classList.remove("eliminarCategoria")
    hamburguesasVeggie.classList.remove("eliminarCategoria")
    promociones.classList.remove("eliminarCategoria")

    if (inputValue === "1") {
        hamburguesasPollo.classList.add("eliminarCategoria")
        hamburguesasVeggie.classList.add("eliminarCategoria")
        promociones.classList.add("eliminarCategoria")
    } else if (inputValue === "2") {
        hamburguesasCarne.classList.add("eliminarCategoria")
        hamburguesasVeggie.classList.add("eliminarCategoria")
        promociones.classList.add("eliminarCategoria")
    } else if (inputValue === "3") {
        hamburguesasCarne.classList.add("eliminarCategoria")
        hamburguesasPollo.classList.add("eliminarCategoria")
        promociones.classList.add("eliminarCategoria")
    } else {
        hamburguesasCarne.classList.add("eliminarCategoria")
        hamburguesasPollo.classList.add("eliminarCategoria")
        hamburguesasVeggie.classList.add("eliminarCategoria")
    }
}





