import { zapatillas } from "./zapatillas.js";
import { zapatosFormales } from "./zapatosFormales.js";

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    const carritoElemento = document.getElementById('carrito');
    const cartTotalSpan = document.getElementById('cart-total');
    const productosContainer = document.getElementById('product-list');

    const mostrarProductos = () => {
        productosContainer.innerHTML = '';

        // Mostrar zapatillas
        zapatillas.forEach(producto => {
            const productElement = crearProductoElemento(producto);
            productosContainer.appendChild(productElement);
        });

        // Mostrar zapatos formales
        zapatosFormales.forEach(producto => {
            const productElement = crearProductoElemento(producto);
            productosContainer.appendChild(productElement);
        });

        // Agregar listeners a botones de agregar al carrito
        document.querySelectorAll('.agregar').forEach(button => {
            button.addEventListener('click', agregarAlCarrito);
        });
    };

    const crearProductoElemento = (producto) => {
        const productElement = document.createElement('div');
        productElement.classList.add('col-md-4', 'mb-4');
        productElement.innerHTML = `
            <div class="card">
                <img src="${producto.Img}" class="card-img-top" alt="${producto.Nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.Nombre}</h5>
                    <p class="card-text">Marca: ${producto.Marca}</p>
                    <p class="card-text">Talla: ${producto.Talla}</p>
                    <p class="card-text">Género: ${producto.Genero}</p>
                    <p class="card-text">Precio: $${producto.Precio}</p>
                    <p class="card-text">Stock: ${producto.Stock}</p>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control cantidad" value="1" min="1" max="${producto.Stock}">
                        <div class="input-group-append">
                            <button class="btn btn-primary agregar" type="button" 
                                    data-id="${producto.Id}" data-nombre="${producto.Nombre}" 
                                    data-precio="${producto.Precio}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return productElement;
    };

    function agregarAlCarrito(event) {
        const id = event.target.getAttribute('data-id');
        const nombre = event.target.getAttribute('data-nombre');
        const precio = parseFloat(event.target.getAttribute('data-precio'));
        const cantidad = parseInt(event.target.parentElement.querySelector('.cantidad').value);

        const productoExistente = carrito.find(item => item.id === id);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ id, nombre, precio, cantidad });
        }

        actualizarCarrito();
    }

    function eliminarDelCarrito(id) {
        const index = carrito.findIndex(item => item.id === id);
        if (index !== -1) {
            carrito.splice(index, 1);
            actualizarCarrito();
        }
    }

    function actualizarCarrito() {
        carritoElemento.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}`;
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => eliminarDelCarrito(producto.id));
            li.appendChild(botonEliminar);
            carritoElemento.appendChild(li);

            total += producto.precio * producto.cantidad;
        });

        cartTotalSpan.textContent = total.toFixed(2);
    }

    mostrarProductos();
});