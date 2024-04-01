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
        div{
          position:absolute;
          width:100%;
          height:100vh;
          background-color: red;
          top:0;
          left:0;
          z-index:1111;
          display:none;
        }
        .modal{
        display:block;
        }
      </style>
      <span>${this.count}</span>
      <svg class="basket" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10L18.5145 17.4276C18.3312 18.3439 18.2396 18.8021 18.0004 19.1448C17.7894 19.447 17.499 19.685 17.1613 19.8326C16.7783 20 16.3111 20 15.3766 20H8.62337C7.6889 20 7.22166 20 6.83869 19.8326C6.50097 19.685 6.2106 19.447 5.99964 19.1448C5.76041 18.8021 5.66878 18.3439 5.48551 17.4276L4 10M3 10H21M8 13V13.01M16 13V13.01M6 10L9 4M18 10L15 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

      <div>
        <button class="cerrar-modal">x</div>
      </div>
      `;
    }

    connectedCallback(){
  this.shadowRoot.querySelector('svg').addEventListener('click',e=>{
    this.shadowRoot.querySelector('div').classList.toggle("modal")
    let productos = JSON.parse(localStorage.getItem('canasta')) || [];

    if(productos.length!=0){
    productos.forEach(producto=>{
      let li = document.createElement("p");
      li.innerHTML=`nombre ${producto.nombre} - precio unitario: ${producto.precio} - cantidad: ${producto.cantidad} = ${producto.precio * producto.cantidad}`
      this.shadowRoot.querySelector('div').appendChild(li)
      
    })
      let botonlink = document.createElement("a");
      let boton = document.createElement("button");
      boton.textContent = "enviar"
      botonlink.appendChild(boton);
      this.shadowRoot.querySelector('div').appendChild(botonlink)
    }else{
      let li = document.createElement("li");
      li.innerHTML="lista vacia";
      this.shadowRoot.querySelector('div').appendChild(li)
    }


  });
  this.shadowRoot.querySelector('.cerrar-modal').addEventListener('click',e=>{
    this.shadowRoot.querySelector('div').classList.toggle("modal")
  })
    }

})
