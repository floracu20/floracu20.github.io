document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

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

    
});

function cierraSesion(){
    localStorage.removeItem("user");
};