import {getData} from "./rest-services.js";


// get medlemmer og tilføj til "svømmer" option 
async function medlemOptions () {
    const medlemmer = await getData();

    const selectElement = document.querySelector("#medlem-assign-resultat");

    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "-- vælg svømmer --";
    selectElement.appendChild(defaultOption);

    medlemmer.forEach(function(medlem) {
    var option = document.createElement("option");
    option.value = medlem.id;
    option.textContent = medlem.fornavn + " " + medlem.efternavn;
    selectElement.appendChild(option);
    });
}

function enableStævneInput() {
    const aktivitetstypeSelect = document.querySelector("#aktivitetstype-create");
    const stænveInput = document.querySelector("#stævne-create");

    aktivitetstypeSelect.addEventListener("change", function() {
        stænveInput.disabled = (this.value !== "Konkurrence");
    })
}

export {medlemOptions, enableStævneInput}