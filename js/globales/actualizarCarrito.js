function updateCart(){
    const storageLength = JSON.parse(localStorage.getItem('canasta')) || [];
    document.querySelector("boton-basket").setAttribute("count",storageLength.length)
}



