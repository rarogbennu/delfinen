
import { søgData, opretKnapContainer } from "./helpers.js";
import { hentData } from "./rest-services.js";

window.addEventListener("load", initApp)

function initApp() {
console.log("loaded");    
søgData();
hentData();
}

const søgefelt = document.getElementById("searchField");

// Viser data i HTML
function visData(data) {
  const dataVisning = document.getElementById("dataDisplay");
  dataVisning.innerHTML = "";

  data.forEach((item) => {
    const dataRække = document.createElement("div");
    dataRække.classList.add("data-row");

    const relevanteNøgler = ["fornavn", "efternavn", "fødselsdato", "indmeldelsesdato"];
    relevanteNøgler.forEach((nøgle) => {
      const dataCelle = document.createElement("div");
      dataCelle.classList.add("data-cell");
      dataCelle.innerText = item[nøgle];
      dataRække.appendChild(dataCelle);
    });

    dataRække.appendChild(opretKnapContainer(item));
    dataVisning.appendChild(dataRække);
  });
}

export {visData}