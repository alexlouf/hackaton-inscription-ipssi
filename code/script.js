//Wait for the DOM to be initialized before adding actions to DOM element like buttons etc...
window.addEventListener("DOMContentLoaded", ()=>{
    
    // retrieving DOM elements necessary for developping
    submitButton = document.getElementById("submit-form");
    form = document.getElementById("form");

    console.log(submitButton);

    submitButton.onclick = function(e){

        e.preventDefault();
        valid = true;
        message = "Vérifier votre ";

        for(var i = 0; i < form.length-1; i++){
            if (form[i].name == "email") {
                if (!controlEmail(form[i].value)) {
                    form[i].classList.add("is-invalid");
                    valid = false;
                    message += form[i].placeholder;
                    break;
                }
            } else {
                if (!controlText(form[i].value)) {
                    form[i].classList.add("is-invalid");
                    valid = false;
                    message += form[i].placeholder;
                    break;
                }
            }
        }

        if (!valid) {
            alert(message);
            return;
        }
        return;
    }

});

function controlEmail(email) {
    // Ajouter controle email
    // required
    // regex pour controler @ nom de domaines . indicatid pays ---- ça se trouve sur google
    // pas de balise HTML du genre <script> pour eviter le XSS 
    // pas de caractère spéciaux pour eviter le 'OR 1=1#
    // return true ou flase si c'est bon ou pas

    return true;
}

function controlText(text) {
    // Ajouter controle texte
    // Required & minimum 2 caractères
    // pas de balise HTML du genre <script> pour eviter le XSS 
    // pas de caractère spéciaux pour eviter le 'OR 1=1#
    // return true ou flase si c'est bon ou pas

    return true;
}