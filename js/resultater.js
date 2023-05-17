import {getData, getResultatData} from "./rest-services.js";


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

async function generateResultatTable() {
    const resultatData = await getResultatData();
    const medlemData = await getData();
  
    resultatData.forEach(resultat => {
      const medlem = medlemData.find(medlem => medlem.id === resultat.svømmerId);
  
      if (medlem) {
        console.log('Resultat:', resultat);
        console.log('Corresponding Medlem:', medlem);
  
        // Perform DOM manipulation here to display the results
      }
    });
  }

export {medlemOptions, enableStævneInput, generateResultatTable}

