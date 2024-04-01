window.customElements.define('boton-basket', class Element extends HTMLElement {

    static get observedAttributes(){
      return ['count'];
    }

    attributeChangedCallback(attr, oldVal, newVal){ 
      this[attr]=newVal
      this.shadowRoot.querySelector('span').textContent = this.count
    }

    constructor(){ super(); 
      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML =`
      <style>
        .basket{
          width:2.5rem;
          color:white;
          }
      </style>
      <span>${this.count}</span>
      <svg class="basket" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M3 10H21M8 13V13.01M16 13V13.01M6 10L9 4M18 10L15 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      `;
    }

    connectedCallback(){
  this.shadowRoot.querySelector('svg').addEventListener('click',e=>{
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
              console.log(productosEncontrado)
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

          })

  });
    }

})
