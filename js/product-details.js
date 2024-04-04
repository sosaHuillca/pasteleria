import "./boton-agregar.js";

window.customElements.define('product-details', class Element extends HTMLElement {

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
  position:absolute;
  width: 100%;
  height:100vh;
  background-color: darkorange;
  display: grid;
  align-content:start;
  top:3.3rem;
  left:0;

}
*{ box-sizing:border-box; }

img{ width:100%; }

.layout-product{
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5,auto);
  background-color: darkorange;
  overflow: hidden;
}
.layout-product img{ grid-column: 1/-1 }

.layout-product h3{
  grid-column: 1/-1;
  grid-row: 2/3;
  font-size:2rem;
}

.layout-product span{
}
#precio{
  grid-column: 2/3;
  grid-row: 3/4;
}
#precio{
  grid-column: 1/2;
  grid-row: 3/4;
}

.layout-product p{
  grid-column: 1/-1;
  grid-row: 4/5;
}

.layout-product button{
  border-radius:50%;
  border:none;
  background: var(--cl-primary);

  width: 50px;
  height: 50px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center; 
  color:var(--cl-secundary);
  position: absolute;

}

.search-icon{
  position: absolute;
  width: 2rem;
  top: .5rem;
  left: 4.5rem;
}
    </style>
    <section class="layout-product" id="${this.id}">
      <button class="quitar">X</button>
      <img src="${this.imagen}" />
      <h3>${this.nombre}</h3>
      <span id="precio">Precio: ${this.precio}</span>
      <span id="categoria">Categoria: ${this.categoria}</span>
      <p>${this.descripcion}</p>
      <boton-agregar data-id="${this.id} "class="agregar">+</boton-agregar>
    </section>
    `;
   this.shadowRoot.querySelector('.quitar').addEventListener('click',e=>{
      document.querySelector("product-details").remove()
   });

    }



  })
