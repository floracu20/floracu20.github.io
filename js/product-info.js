const URL = PRODUCT_INFO_URL + localStorage.getItem("prodID") + EXT_TYPE;
const URL_COM = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + EXT_TYPE;

let producto = {};
let comentario = {};
let input = document.getElementById("nuevoComentario");

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
        })

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


    //Muestra el nombre de usuario en la barra superior, pero en caso de no tener usuario muestra Login
    if (localStorage.getItem('user') == undefined) {
        document.getElementById("mostrarUsuario").innerHTML = "Login"
    } else {
        document.getElementById("mostrarUsuario").innerHTML = localStorage.getItem('user')
    }
})
