/* Función que valida que ningún campo quede vacío y guarda los datos */
function validarDatos() {
    let nombre = document.getElementById("nombre1");
    let apellido = document.getElementById("apellido1");
    let nroTeléfono = document.getElementById("teléfono");
    let campoVacio = false;

    /* Valido campos vacíos */
    if (nombre.value === '') {
        nombre.classList.add('is-invalid');
        campoVacio = true;
    }

    if (apellido.value === '') {
        apellido.classList.add('is-invalid');
        campoVacio = true;
    }

    if (nroTeléfono.value === '') {
        nroTeléfono.classList.add('is-invalid');
        campoVacio = true;
    }

    if (!campoVacio) {
        GuardarDatosUser();
    }

}

/* Función que quita el mensaje de error cuando se completa el campo */
function removerInvalido(id) {
    let inputError = document.getElementById(id);
    inputError.classList.remove('is-invalid');
}
 
/* FIN VALIDACIÓN */


function GuardarDatosUser() {
    let nombre = document.getElementById("nombre1").value;
    let apellido = document.getElementById("apellido1").value;
    let nroTel = document.getElementById("teléfono").value;
    let segundoNombre = document.getElementById("nombre2").value;
    let segundoApellido = document.getElementById("apellido2").value;

    /* Acá guardo los datos en localStorage */
    localStorage.setItem("inputNombre1", nombre);
    localStorage.setItem("inputApellido1", apellido);
    localStorage.setItem("inputNroTeléfono", nroTel);
    localStorage.setItem("inputNombre2", segundoNombre);
    localStorage.setItem("inputApellido2", segundoApellido);

}


/* Función que muestra los datos del usuario en los inputs */
function showDatos() {
    /* Muestro los datos ingresados y guardados en LocalStorage */
    document.getElementById('nombre1').value = localStorage.getItem("inputNombre1");
    document.getElementById('apellido1').value = localStorage.getItem("inputApellido1");
    document.getElementById('teléfono').value = localStorage.getItem("inputNroTeléfono");
    document.getElementById('nombre2').value = localStorage.getItem("inputNombre2");
    document.getElementById('apellido2').value = localStorage.getItem("inputApellido2");
    document.getElementById('correo').value = localStorage.getItem('user');
    document.getElementById("display_image").src = localStorage.getItem("foto");
    /* Muestro foto de perfil predeterminada si el usuario no tiene una imagen cargada (desafiate): */
    if (localStorage.getItem("foto") == null) {
        document.getElementById("display_image").src = fotoPerfil
    }
}


/* Para la foto de perfil (desafiate): */
const image_input = document.querySelector("#image_input");
var uploaded_image = "";
let fotoPerfil = "img/img_perfil.png";

/* Actualiza la foto de perfil */
image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        localStorage.setItem("foto", uploaded_image);
        document.getElementById("display_image").src = localStorage.getItem("foto")
    });
    reader.readAsDataURL(this.files[0]);
})


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
    showDatos();
}


function cierraSesion() {
    localStorage.removeItem("user");
    localStorage.removeItem("inputNombre1");
    localStorage.removeItem("inputApellido1");
    localStorage.removeItem("inputNroTeléfono");
    localStorage.removeItem("inputNombre2");
    localStorage.removeItem("inputApellido2");
    localStorage.removeItem("foto");
};