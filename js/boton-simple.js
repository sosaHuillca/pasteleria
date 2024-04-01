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
      //<svg class="search-icon" width="64px" height="64px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>search</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-256.000000, -1139.000000)" fill="#fff"> <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>

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
