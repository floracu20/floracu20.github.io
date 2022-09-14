document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
    //Muestra el nombre de usuario en la barra superior, pero en caso de no tener usuario muestra Login
    if (localStorage.getItem('user') == undefined){
        document.getElementById("mostrarUsuario").innerHTML = "Login"
    }else{
        document.getElementById("mostrarUsuario").innerHTML = localStorage.getItem('user')
    }
});