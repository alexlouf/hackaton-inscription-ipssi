//Wait for the DOM to be initialized before adding actions to DOM element like buttons etc...
window.addEventListener("DOMContentLoaded", ()=>{
    
    // retrieving DOM elements necessary for developping
    submitButton = document.getElementById("submit-form");
    form = document.getElementById("form");
    array = document.getElementById("registered-users")

    //Adding actions to DOM
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

        fetchArray(array);

        return;
    }

    //Setting intervals to refresh registered student
    fetchArray(array);
    refreshArray = setInterval(() => {
        fetchArray(array);
    }, 30000);

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

function fetchArray(array) {
    console.log(array)

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        editArray(this.responseText, array);
    }
    });

    xhr.open("GET", "local-api.php");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send();

}

function editArray(data, array){
    json = JSON.parse(data);
    tbody = array.children[1];
    tbody.innerHTML = "";
    //tr = document.createElement("tr");
    //thName = document.createElement("td");
    //thSurname = document.createElement("td");
    //thEmail = document.createElement("td");
    //thPromotion = document.createElement("td");
    //thSpeciality = document.createElement("td");

    for (var i = 0; i < json.length; i++) {
        //creating dom elements
        tr = document.createElement("tr");
        thName = document.createElement("td");
        thSurname = document.createElement("td");
        thEmail = document.createElement("td");
        thPromotion = document.createElement("td");
        thSpeciality = document.createElement("td");

        //Add values to dom elements
        thName.innerHTML = json[0].name;
        thSurname.innerHTML = json[0].surname;
        thEmail.innerHTML = json[0].email;
        thPromotion.innerHTML = json[0].promotion;
        thSpeciality.innerHTML = json[0].speciality

        //adding to HTML
        tr.appendChild(thName);
        tr.appendChild(thSurname);
        tr.appendChild(thEmail);
        tr.appendChild(thPromotion);
        tr.appendChild(thSpeciality);
        tbody.appendChild(tr);
    }

}