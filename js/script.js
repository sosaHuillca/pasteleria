import "./boton-simple.js"
// Cargar el archivo JSON
fetch('./js/db_products.json')
    .then(response => response.json())
    .then(data => {
        // Manipular los datos JSON
        mostrarProductos(data.productos);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

// Función para mostrar los productos en el HTML
function mostrarProductos(productos) {
    const productosContainer = document.getElementById('productos-container');

    // Iterar sobre cada producto y crear un elemento HTML para cada uno
    productos.forEach(producto => {
        const productoDiv = document.createElement('card-product');
      
        productoDiv.setAttribute("id",producto.id);
        productoDiv.setAttribute("imagen",producto.imagen);
        productoDiv.setAttribute("nombre",producto.nombre);
        productoDiv.setAttribute("precio",producto.precio);

        // Agregar productoDiv al contenedor
        productosContainer.appendChild(productoDiv);
    });
}

window.addEventListener("DOMContentLoaded",()=>{
    const storageLength = JSON.parse(localStorage.getItem('canasta')) || [];
    document.querySelector("boton-basket").setAttribute("count",storageLength.length)
})
