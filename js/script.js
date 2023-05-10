
import { søgData, opretKnapContainer } from "./helpers.js";
import { hentData } from "./rest-services.js";

window.addEventListener("load", initApp)

function initApp() {
console.log("loaded");    
søgData();
hentData();
}

// Event listener for the keyup event on the search field
document.getElementById("searchField").addEventListener("keyup", søgData);

// Event listener for sort buttons
document.querySelectorAll(".sort-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const sortBy = button.dataset.sort;
    const sortOrder = button.dataset.order;
    sortData(sortBy, sortOrder);
  });
});

// Sort data and refresh the display
function sortData(sortBy, sortOrder) {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const medlemmer = data.medlemmer;

      if (Array.isArray(medlemmer)) {
        medlemmer.sort((a, b) => {
          if (sortOrder === "asc") {
            return a[sortBy].localeCompare(b[sortBy], undefined, { numeric: true });
          } else {
            return b[sortBy].localeCompare(a[sortBy], undefined, { numeric: true });
          }
        });

        displayData(medlemmer.slice(0, 24));
      } else {
        console.error("JSON data is not formatted as expected. Please ensure it is an array of objects.");
      }
    });
}


// Viser data i HTML
function displayData(data) {
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

export {displayData}