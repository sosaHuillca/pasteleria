import "./boton-simple.js"
// Cargar el archivo JSON
fetch('db_products.json')
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
        productoDiv.className = 'producto';
        productoDiv.setAttribute("imagen",producto.imagen);
        productoDiv.setAttribute("nombre",producto.nombre);
        productoDiv.setAttribute("precio",producto.precio);
        productoDiv.setAttribute("categoria",producto.categoria);
        productoDiv.setAttribute("idi",producto.id);
        productoDiv.setAttribute("descripcion",producto.descripcion);

      /*
        // Crear imagen
        const imagen = document.createElement('img');
        imagen.src = producto.imagen;
        productoDiv.appendChild(imagen);

        // Crear nombre
        const nombre = document.createElement('h2');
        nombre.textContent = producto.nombre;
        productoDiv.appendChild(nombre);

        // Crear precio
        const precio = document.createElement('p');
        precio.textContent = `Precio: $${producto.precio}`;
        productoDiv.appendChild(precio);

        // Crear descripción
        const descripcion = document.createElement('p');
        descripcion.textContent = producto.descripcion;
        productoDiv.appendChild(descripcion);

        // Crear categoría
        const categoria = document.createElement('p');
        categoria.textContent = `Categoría: ${producto.categoria}`;
        productoDiv.appendChild(categoria);

        // Crear disponibilidad
        const disponibilidad = document.createElement('p');
        disponibilidad.textContent = producto.disponible ? 'Disponible' : 'No disponible';
        productoDiv.appendChild(disponibilidad);
        */

        // Agregar productoDiv al contenedor
        productosContainer.appendChild(productoDiv);
    });
}

