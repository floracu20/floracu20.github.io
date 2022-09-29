const URL = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE
let currentProductsArray = []
let array = []
const ORDER_BY_PROD_COUNT = "Cant."
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

//Función que permite ordenar los productos según la cantidad de vendidos
function sortProducts(criteria, array1) {
    let result = [];
    if (criteria === ORDER_BY_PROD_COUNT) {
        result = array1.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

//almaceno el ID de cada producto en el localStorage
function setProduct(id){
    localStorage.setItem("prodID", id);
    window.location.href = "product-info.html"; //redirijo a product-info.html
}

function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.soldCount) <= maxCount))) {

            htmlContentToAppend += `
            <div onclick="setProduct(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name + " - " + product.currency + " - " + product.cost}</h4>
                            <small class="text-muted">${product.soldCount} Vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        }
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}


function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos, ahora ordenados
    showProductsList();
}


document.addEventListener("DOMContentLoaded", () => {

    fetch(URL)
        .then(respuesta => respuesta.json())
        .then(data => {
            currentProductsArray = data.products;
            showProductsList(currentProductsArray);
        })

    document.getElementById("sortAsc").addEventListener("click", () => {
        currentProductsArray = currentProductsArray.sort((a, b) => { return a.cost - b.cost })
        showProductsList(currentProductsArray);
    })

    document.getElementById("sortDesc").addEventListener("click", () => {
        currentProductsArray = currentProductsArray.sort((a, b) => { return b.cost - a.cost })
        showProductsList(currentProductsArray);
    })

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    //Defino la funcionalidad del botón Limpiar
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    //Defino la funcionalidad del botón Filtrar
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de vendidos.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });


    //Muestra el nombre de usuario en la barra superior, pero en caso de no tener usuario muestra Login
    if (localStorage.getItem('user') == undefined){
        document.getElementById("mostrarUsuario").innerHTML = "Login"
    }else{
        document.getElementById("mostrarUsuario").innerHTML = localStorage.getItem('user')
    }

})

