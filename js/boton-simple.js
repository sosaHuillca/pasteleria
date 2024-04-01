import "./product-details.js"

window.customElements.define('card-product', class Element extends HTMLElement {

    static get observedAttributes(){
      return ['idi','imagen','nombre','precio','descripcion','categoria','disponible'];
    }

    constructor(){ super(); this.attachShadow({mode:'open'}); }

    attributeChangedCallback(attr, oldVal, newVal){ this[attr]=newVal }

    connectedCallback(){
      this.shadowRoot.innerHTML =
        `
    <style>
:host{
  --cl-primary:#85501e;
  --cl-secundary:#fff;
}
*{ box-sizing:border-box; }

img{ width:100%; }

.layout-product{
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto max-content auto;
  background-color: darkorange;
  border-radius: .6rem;
  overflow: hidden;
}
.layout-product img{
    grid-column: 1/-1;
    height:6rem;
}

.layout-product h3{
  grid-column: 1/-1;
  grid-row: 2/3;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size:1rem;
  margin-left:.9rem;
}

.layout-product span{
  margin-left:.9rem;
  align-self:center;
}

.layout-product button{
  border-radius:50%;
  border:none;
  background: var(--cl-primary);

  width: 40px;
  height: 40px;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center; 
  color:var(--cl-secundary);

  margin-bottom: 5px;
  margin-right: 5px;
  justify-self: end;
}

.search-icon{
  position: absolute;
  width: 2rem;
  top: .5rem;
  left: 4.5rem;
}
    </style>
  <section class="layout-product" id="${this.id}">
    <img src="${this.imagen}" />
    <h3>${this.nombre}</h3>
    <span>${this.precio}</span>
    <boton-agregar data-id="${this.id} "class="agregar">+</boton-agregar>
  </section>
  `;

      this.shadowRoot.querySelector('img').addEventListener('click',e=>{
        fetch('./js/db_products.json')
          .then(response => response.json())
          .then(data => {
            function getElementById(id) {
              return data.productos.find(producto => producto.id === id);
            }

            let id = +(this.shadowRoot.querySelector('section').getAttribute("id"));
            const producto = getElementById(id); // Cambia el número por el ID que desees buscar
            const productoDiv = document.createElement('product-details');

            productoDiv.setAttribute("id",producto.id);
            productoDiv.setAttribute("imagen",producto.imagen);
            productoDiv.setAttribute("nombre",producto.nombre);
            productoDiv.setAttribute("precio",producto.precio);
            productoDiv.setAttribute("categoria",producto.categoria);
            productoDiv.setAttribute("descripcion",producto.descripcion);
            document.querySelector("body").appendChild(productoDiv);
          })
          .catch(error => console.error('Error al obtener el JSON:', error));

      });

    }

  })
