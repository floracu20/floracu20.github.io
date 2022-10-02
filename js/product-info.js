const URL = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;
const URL_COM = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;

let producto = {};
let comentario = {};
let input = document.getElementById("nuevoComentario");


//almaceno el ID de cada producto en el localStorage
function setProduct(id){
    localStorage.setItem("prodID", id);
    window.location.href = "product-info.html"; //redirijo al product-info.html de ese producto.
}

function starscore(stars) {  //función que, según la puntuacion del usuario, califica en estrellas
    let htmlStar = ""
    for (let i = 0; i < stars; i++) {
        htmlStar += `<span class="fa fa-star checked"></span>`
    };
    for (i = stars; i < 5; i++) {
        htmlStar += `<span class="fa fa-star"></span>`
    }
    return htmlStar;
}

document.addEventListener("DOMContentLoaded", () => {

    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            producto = data //obtengo cada parte del .json de cada producto
            document.getElementById("productName").innerHTML = producto.name;
            document.getElementById("precio").innerHTML = producto.currency + " " + producto.cost;
            document.getElementById("descripción").innerHTML = producto.description;
            document.getElementById("categoría").innerHTML = producto.category;
            document.getElementById("cant_vendidos").innerHTML = producto.soldCount;
            let productos_relac = producto.relatedProducts;

            html_Img = ""
            for (let i = 0; i < producto.images.length; i++) { //Recorro las imágenes de cada producto
                html_Img += `<div class="col">    
                    <img src="${producto.images[i]}" class="img-thumbnail gallery-item">
                </div>`
            }
            document.getElementById("img_prod").innerHTML = html_Img;

            fetch(URL_COM)
                .then(resp => resp.json())
                .then(dato => {
                    comentario = dato;

                    htmlcomments = ""
                    for (let i = 0; i < comentario.length; i++) { //Recorro los comentarios 
                        let cantidad = comentario[i].score
                        let htmlStar = starscore(cantidad)

                        htmlcomments += `
                <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <h6 class="mb-1"><small class="fw-border h6">${comentario[i].user}${" "} - ${comentario[i].dateTime} - ${htmlStar} </small></h6>
                        <p class="mb-1">${comentario[i].description}</p>
                    </div>
                </div>     
                </div>   
                `
                    }
                    document.getElementById("comentarios").innerHTML = htmlcomments
                })
            
            let texto = "";
            for (let i = 0; i < productos_relac.length; i++){ //Recorro el listado de productos relacionados
                if (i===0) {
                    texto+=`
                <div onclick="setProduct(${productos_relac[i].id})" class="carousel-item active cursor-active" data-bs-interval="10000">
                    <img src=` + productos_relac[i].image + ` class="d-block w-100" alt="...">
                    <div class="d-flex h-100 align-bottom justify-content-center bg-light">
                    <h5>`+productos_relac[i].name+ `</h5>
                </div>
                </div>
                `
                }
                else{
                    texto+=`
                <div onclick="setProduct(${productos_relac[i].id})" class="carousel-item cursor-active" data-bs-interval="10000">
                    <img src=` + productos_relac[i].image + ` class="d-block w-100" alt="...">
                    <div class="d-flex h-100 align-bottom justify-content-center bg-light">
                        <h5>`+productos_relac[i].name+ `</h5>
                    </div>
                </div>
                `
                }
            }
            document.getElementById("productos_relac_carrusel").innerHTML = texto;
        });

    function comentar() {
        //Fecha y hora
        let hoy = new Date();
        let ahora = hoy.toLocaleString();

        let indice = document.getElementById('valoración');
        let cant = parseInt(indice.selectedIndex) + 1; //guardo la puntuación que le da el usuario, en la variable cant, para luego puntuar con estrellas.

        let textoComentario = `<div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <h6 class="mb-1"><small class="fw-border h6">${localStorage.getItem("user")}${" "} - ${ahora} - ${starscore(cant)} </small></h6>
                        <p class="mb-1"> ${input.value}</p>
                    </div>
                </div>
            </div>`;

        document.getElementById("comentarios").innerHTML += textoComentario;

        //borrado
        input.value = "";
    }

    //Funcionalidad del botón "Enviar" que envía el comentario
    document.getElementById("enviar").addEventListener("click", function () {
        if (input.value !== "") {
            comentar();
        }
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
    }
})

function cierraSesion(){
    localStorage.removeItem("user");
};