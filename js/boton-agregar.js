import "./globales/actualizarCarrito.js";

window.customElements.define('boton-agregar', class Element extends HTMLElement {

    static get observedAttributes(){
      return [];
    }

    constructor(){ super(); this.attachShadow({mode:'open'}); }

    attributeChangedCallback(attr, oldVal, newVal){ this[attr]=newVal }

    connectedCallback(){
      this.shadowRoot.innerHTML =`
      <style>
      button{
        padding:10px;
        background-color: darkorange;
      }
      </style>
      <button>+</button>
      `;
  this.shadowRoot.querySelector('button').addEventListener('click',e=>{
        fetch('./js/db_products.json')
          .then(response => response.json())
          .then(data => {
            function getElementById(id) {
              return data.productos.find(producto => producto.id === id);
            }

            let { id, nombre, precio } = getElementById(+(this.getAttribute("data-id")));

            let storage = JSON.parse(localStorage.getItem('canasta')) || [];

            if (storage.length==0) {
              storage.push({id,nombre,precio,cantidad:1})
              localStorage.setItem('canasta',JSON.stringify(storage))
            } else{
              let productosEncontrado = storage.filter(producto => {
                return producto.id == id;
              })
              if(productosEncontrado.length==1){
                const newStorage = storage.map(Producto => {
                  if (Producto.id == id) {
                    return {...Producto,cantidad: Producto.cantidad+1};
                  }else{
                    return Producto;
                  }
                })
                localStorage.setItem('canasta',JSON.stringify(newStorage))
              }else{
                storage.push({id,nombre,precio,cantidad:1})
                localStorage.setItem('canasta',JSON.stringify(storage))
              }

            }

            const storageLength = JSON.parse(localStorage.getItem('canasta')) || [];
            document.querySelector("boton-basket").setAttribute("count",storageLength.length)
          })
  });
    }

});
