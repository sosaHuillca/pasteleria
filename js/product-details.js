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
  place-content:center;
  top:0;
  left:0;

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
    <section class="" id="${this.id}">
      <button class="quitar">X</button>
      <img src="${this.imagen}" />
      <h3>${this.nombre}</h3>
      <span>${this.precio}</span>
      <span>${this.categoria}</span>
      <p>${this.descripcion}</p>
      <boton-agregar data-id="${this.id} "class="agregar">+</boton-agregar>
    </section>
    `;
   this.shadowRoot.querySelector('.quitar').addEventListener('click',e=>{
      document.querySelector("product-details").remove()
   });

    }



  })
