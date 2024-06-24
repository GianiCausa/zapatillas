import { zapatillas } from "./zapatillas.js";
import { zapatosFormales } from "./zapatosFormales.js";

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-list');
    const filterForm = document.getElementById('filter-form');
    const carritoElemento = document.getElementById('carrito');
    const cartTotalSpan = document.getElementById('cart-total');

    const displayProducts = (products) => {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('col-md-4', 'mb-4');
            productElement.innerHTML = `
                <div class="card">
                    <img src="${product.Img}" class="card-img-top" alt="${product.Nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${product.Nombre}</h5>
                        <p class="card-text">Marca: ${product.Marca}</p>
                        <p class="card-text">Talla: ${product.Talla}</p>
                        <p class="card-text">Género: ${product.Genero}</p>
                        <p class="card-text">Precio: $${product.Precio}</p>
                        <p class="card-text">Stock: ${product.Stock}</p>
                        <div class="input-group mb-3">
                            <input type="number" class="form-control cantidad" value="1" min="1" max="${product.Stock}">
                            <div class="input-group-append">
                                <button class="btn btn-dark agregar" type="button" data-id="${product.Id}" data-nombre="${product.Nombre}" data-precio="${product.Precio}">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productContainer.appendChild(productElement);

            // Agregar event listener al botón "Agregar al carrito"
            const btnAgregar = productElement.querySelector('.agregar');
            btnAgregar.addEventListener('click', () => {
                agregarAlCarrito(product);
            });
        });
    };

    const filterProducts = (productos) => {
        const selectedMarca = document.getElementById('marca').value;
        const selectedTalla = document.getElementById('talla').value;
        const selectedGenero = document.getElementById('genero').value;

        const filteredProducts = productos.filter(producto => {
            return (selectedMarca === 'All' || producto.Marca === selectedMarca) &&
                   (selectedTalla === 'All' || producto.Talla === selectedTalla) &&
                   (selectedGenero === 'All' || producto.Genero === selectedGenero);
        });

        displayProducts(filteredProducts);
    };

    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedProducts = document.getElementById('filtro-producto').value === 'zapatillas' ? zapatillas : zapatosFormales;
        filterProducts(selectedProducts);
    });

    function agregarAlCarrito(producto) {
        const id = producto.Id;
        const nombre = producto.Nombre;
        const precio = parseFloat(producto.Precio);
        const cantidad = parseInt(productoElement.querySelector('.cantidad').value);

        const productoExistente = carrito.find(item => item.id === id);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ id, nombre, precio, cantidad });
        }

        actualizarCarrito();
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

    displayProducts(zapatillas);
});