window.customElements.define('card-product', class Element extends HTMLElement {

    static get observedAttributes(){
      return ['idi','imagen','nombre','precio','descripcion','categoria','disponible'];
    }

    constructor(){ super(); this.attachShadow({mode:'open'}); }

    attributeChangedCallback(attr, oldVal, newVal){
      /*
        if(attr=="nombre") this.nombre = newVal;
        if(attr=="idi") this.id = newVal;
        if(attr=="precio") this.precio = newVal;
        if(attr=="imagen") this.imagen = newVal;
        if(attr=="categoria") this.categoria = newVal;
        if(attr=="descripcion") this.descripcion = newVal;
        */
      this[attr]=newVal
    }

    connectedCallback(){
      this.shadowRoot.innerHTML =
        `
    <style>
    </style>
    <section id="${this.id}">
      <img src="${this.imagen}" />
      <span>${this.categoria}</span>
      <h2>${this.nombre}</h2>
      <p>${this.descripcion}</p>
      <span>${this.precio}</span>
    </section>
    `;

    }

  })
