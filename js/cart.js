const URL = CART_INFO_URL + "25801" + EXT_TYPE;
let productosAComprar = [];

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj);
            productosAComprar = resultObj.data.articles; /*Asigno los productos en el carrito del .json, al array*/
            showCart();
            }       
    });
});

/*Función que muestra el contenido del carrito*/
function showCart() {
    let htmlContenidoCarrito = "";
    let htmlContenidoProd = "";

    for (let i = 0; i < productosAComprar.length; i++) {  /*En esta entrega va a mostrar un solo artículo*/
        let datos = productosAComprar[i];
        htmlContenidoProd += `
        <div class="list-group-item list-group-item-action" style="text-align: center">
            <div class="row">
                <div class="col-md-2">  
                    <img src="${datos.image}" class="img-responsive" width="50%" height="80%">  
                </div>  
                <div class="col-md-2">    
                    <p class="mb-1">${datos.name}</p>
                </div>  
                <div class="col-md-2"> 
                    <p class="mb-1">${datos.currency} ${datos.unitCost}</p>
                </div>  
                <div class="col-md-2"> 
                    <input type="number" min="0" id="cantidadArticulos" name="cantidadArticulos" style="width:50px" onchange="multiplicar(this.value, ${datos.unitCost}, '${datos.currency}')" value="${datos.count}">
                </div>  
                <div class="col-md-2"> 
                    <p class="mb-1" id="subtotal">${datos.currency} ${datos.unitCost}</p>
                </div>
            </div>
        </div>
        `
    };

    htmlContenidoCarrito += `
    <hr/>
    <div class="list-group-item" style="text-align: center; background-color: #a7e7ec" >
        <div class="row">
            <div class="col-md-2">
                <h5 class="col-3 bg-light"></h5>
            </div>
            <div class="col-md-2">
                <h5>Nombre</h5>
            </div>
            <div class="col-md-2">
                <h5>Costo</h5>
            </div>
            <div class="col-md-2">           
                <h5>Cantidad</h5>
            </div>
            <div class="col-md-2">
                <h5>Subtotal</h5>
            </div>
            <hr size="5" style="background-color: #005706; height: 2px">
                ${htmlContenidoProd}
        </div>
    </div> 
    `
        document.getElementById("comp-list-container").innerHTML = htmlContenidoCarrito;
   
}

/* Función que multiplica el precio unitario del artículo, por el valor del input "cantidadArticulos" */

function multiplicar(cantidad, precioUnitario, currency) {
    var subtotal = cantidad * precioUnitario;
    document.getElementById("subtotal").innerHTML = currency + " " + subtotal;
}


//Muestra el nombre de usuario con menú desplegable en la barra superior, pero en caso de no tener usuario muestra Login
const menu = document.getElementById("desplegable_login");
if (localStorage.getItem('user') == undefined) {
    const desplegable =
        `<a class="nav-link" id="mostrarUsuario" href="login.html">Login</a>`
    menu.innerHTML = desplegable;
} else {
    const desplegable =
        `<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="mostrarUsuario" role="button" aria-haspopup="true" aria-expanded="false">` + localStorage.getItem('user') + `</a>
            <ul class="dropdown-menu" aria-labelledby="mostrarUsuario">
                <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
                <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="login.html" onclick="cierraSesion()">Cerrar sesión</a></li>
            </ul>
        </li>
        `
    menu.innerHTML = desplegable;
}


function cierraSesion(){
    localStorage.removeItem("user");
};