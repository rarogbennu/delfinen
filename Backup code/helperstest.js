"use strict";

// Indlæser applikationen når siden er indlæst
window.addEventListener("load", () => {
  hentData();
});

// Henter data fra JSON fil
async function hentData() {
  const response = await fetch("data.json");
  const data = await response.json();
  const medlemmer = data.medlemmer;

  if (Array.isArray(medlemmer)) {
    visData(medlemmer.slice(0, 24));
  }
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

// Opretter knapper til redigering og sletning
function opretKnapContainer(item) {
  const knapContainer = document.createElement("div");
  knapContainer.classList.add("button-container");

  const redigerKnap = document.createElement("button");
  redigerKnap.classList.add("edit");
  redigerKnap.innerHTML = "&#9998;";
  redigerKnap.addEventListener("click", () => redigerData(item));
  knapContainer.appendChild(redigerKnap);

  const sletKnap = document.createElement("button");
  sletKnap.classList.add("delete");
  sletKnap.innerHTML = "&#128465;";
  sletKnap.addEventListener("click", () => sletData(item));
  knapContainer.appendChild(sletKnap);

  return knapContainer;
}

// Funktion til at redigere data
function redigerData(item) {
  console.log("Rediger data:", item);
}

// Funktion til at slette data
function sletData(item) {
  console.log("Slet data:", item);
}

// Funktion til at søge i data
function søgData() {
  const søgefelt = document.getElementById("searchField");
  const forespørgsel = søgefelt.value.toLowerCase();

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const medlemmer = data.medlemmer;

      if (Array.isArray(medlemmer)) {
        const filtreretData = medlemmer.filter((item) => {
          return (
            item.fornavn.toLowerCase().includes(forespørgsel) ||
            item.efternavn.toLowerCase().includes(forespørgsel) ||
            item.fødselsdato.toLowerCase().includes(forespørgsel) ||
            item.indmeldelsesdato.toLowerCase().includes(forespørgsel)
          );
        });

        visData(filtreretData.slice(0, 24));
      }
});
}