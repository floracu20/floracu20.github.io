const URL = CART_INFO_URL + "25801" + EXT_TYPE;
let productosAComprar = [];
let subtotal;
let costoEnvio = 0;

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
        unitCost = productosAComprar[i].unitCost;
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
                    <input type="number" min="0" id="cantidadArticulos" name="cantidadArticulos" style="width:50px" onchange="multiplicar(this.value, ${datos.unitCost}, '${datos.currency}'); calcularSubtotal()" value="${datos.count}">
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

    calcularSubtotal();
}

/* Función que multiplica el precio unitario del artículo, por el valor del input "cantidadArticulos" */
function multiplicar(cantidad, precioUnitario, currency) {
    subtotalArticulo = cantidad * precioUnitario;
    document.getElementById("subtotal").innerHTML = currency + " " + subtotalArticulo;
}


/* ENTREGA 6 */

/* Función que calcula el subtotal para mostrarlo en la sección de costos */
function calcularSubtotal() {
    let cantidadDeArticulos = document.getElementById("cantidadArticulos").value;
    subtotal = cantidadDeArticulos * unitCost;
    document.getElementById("subtotalText").innerHTML = "USD " + subtotal;
    costoTipoDeEnvio();
}

/* Función para calcular el costo de envío según lo seleccionado en el input*/
function costoTipoDeEnvio() {
    if (document.getElementById("Premium").checked) {
        costoEnvio = subtotal * 0.15

    } else if (document.getElementById("Express").checked) {
        costoEnvio = subtotal * 0.07

    } else if (document.getElementById("Standard").checked) {
        costoEnvio = subtotal * 0.05
    }
    document.getElementById("shippingText").innerHTML = "USD " + costoEnvio
    costoTotal();
}

/* Función para calcular el costo total de la compra */
function costoTotal() {
    document.getElementById("totalCostText").innerHTML = "USD " + (subtotal + costoEnvio);
}

/* Función que, dependiendo si se elige Transferencia bancaria o Tarjeta de crédito, activa o desactiva los campos de la otra opción */
function activarCampos(){
    if(document.getElementById("bankingRadio").checked){ /* Transferencia bancaria */
        document.getElementById("creditCardNumber").disabled = true;
        document.getElementById("creditCardSecurityCode").disabled = true;
        document.getElementById("dueDate").disabled = true;
        document.getElementById("bankAccountNumber").disabled = false;
    }
    else if(document.getElementById("creditCardPaymentRadio").checked){ /* Tarjeta de crédito */
        document.getElementById("creditCardNumber").disabled = false;
        document.getElementById("creditCardSecurityCode").disabled = false;
        document.getElementById("dueDate").disabled = false;
        document.getElementById("bankAccountNumber").disabled = true;
    }
}

/*PARA LA VALIDACIÓN:*/

/*de bootstrap:*/
(function () {
    'use strict'

    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')

    // Bucle sobre ellos y evitar el envío:
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                if (pagoEsValido()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');

            }, false)
        })

})()


/* Función que chequea si todos los datos de pago fueron ingresados correctamente y cambia el estado en Forma de Pago */
function pagoEsValido(){
    let paymentType = document.getElementById("paymentType");
    if(document.getElementById("creditCardPaymentRadio").checked && document.getElementById("creditCardNumber").checkValidity() && document.getElementById("creditCardSecurityCode").checkValidity() && document.getElementById("dueDate").checkValidity()){
        paymentType.innerHTML = "Se ha seleccionado la opción: <strong> tarjeta de crédito </strong>";
        paymentType.style.color = 'rgb(25, 135, 84)'; /* verde */
        return false;
    }
    else if(document.getElementById("bankingRadio").checked &&  document.getElementById("bankAccountNumber").checkValidity()){
        paymentType.innerHTML = "Se ha seleccionado la opción: <strong> transferencia bancaria </strong>";
        paymentType.style.color = 'rgb(25, 135, 84)'; /* verde */
        return false;
    }
    else{
        paymentType.innerHTML = "Datos incorrectos";
        paymentType.style.color = 'rgb(220, 53, 69)'; /* rojo */
        return true;
    }
}

/* Función que, al clickear en Finalizar compra, chequea que todos los campos hayan sido completados correctamente */
function verValidacion() {
    let envioValido = document.getElementById("Premium").checkValidity();
    let calleValida = document.getElementById("calle").checkValidity();
    let numeroValido = document.getElementById("numero").checkValidity();
    let esqValida = document.getElementById("esquina").checkValidity();
    if (!pagoEsValido() && calleValida && numeroValido && esqValida && envioValido) {
        alert('¡Has comprado con éxito') /*No funciona*/
    };
    return !pagoEsValido() && calleValida && numeroValido && esqValida && envioValido;
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


function cierraSesion() {
    localStorage.removeItem("user");
};