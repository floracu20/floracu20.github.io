const button = document.getElementById("ingBtn");

function inicio(){
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    if ((email.length) && (pass.length)){
        window.location = "index.html";
    }
}

button.onclick = inicio;
inicio();