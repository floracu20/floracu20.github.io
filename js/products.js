const URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"

function showProductsList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
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

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }

fetch(URL)
.then(respuesta => respuesta.json())
.then(data => {
    let currentProductsArray = data.products;
    showProductsList(currentProductsArray);
})
