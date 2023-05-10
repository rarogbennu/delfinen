"use strict"

window.addEventListener("load", initApp)

function initApp() {
console.log("loaded");    
}


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