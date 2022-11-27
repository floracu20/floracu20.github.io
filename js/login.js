const button = document.getElementById("ingBtn");

function inicio(){
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    if ((email.length) && (pass.length) && (email.includes('@'))){
        window.location = "index.html";
    }
}

button.onclick = inicio;
inicio();

document.getElementById("ingBtn").addEventListener("click", ()=>{
    localStorage.setItem("user", document.getElementById("email").value);
    document.getElementById("mostrarUsuario").innerHTML = localStorage.getItem("user");
})