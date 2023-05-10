
import { displayData } from "./script.js";

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

        displayData(filtreretData.slice(0, 24));
      }
});
}

export {søgData, opretKnapContainer}