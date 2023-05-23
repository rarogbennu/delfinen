// Importer funktioner og variabler fra andre moduler
import { updateClicked, deleteClicked } from "./script.js";
import { sortData, showData} from "./data-handling.js";
import { endpoint } from "./rest-services.js";

// Definér en global variabel for sidestørrelse
const pageSize = 105;

// Funktion til at forberede data - konverterer et objekt til et array
function prepareData(dataObject) {
  const dataArray = [];
  for (const key in dataObject) {
    if (dataObject.hasOwnProperty(key)) {
      const data = dataObject[key];
      // Spring over, hvis data er null
      if (data !== null) {
        data.id = key;
        dataArray.push(data);
      }
    }
  }
  return dataArray;
}

// Funktioner til at vise og skjule sidens knapper
function showPaginationButtons() {
  const pageButtonContainer = document.getElementById("page-buttons");
  pageButtonContainer.style.display = "block";
}

function hidePaginationButtons() {
  const pageButtonContainer = document.getElementById("page-buttons");
  pageButtonContainer.style.display = "none";
}

// Funktion til at oprette en beholder med redigerings- og sletningsknapper
function createButtonContainer(item) {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.innerHTML = "&#9998;";
  editButton.addEventListener("click", () => updateClicked(item));
  buttonContainer.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = "&#128465;";
  deleteButton.addEventListener("click", () => deleteClicked(item));
  buttonContainer.appendChild(deleteButton);

  return buttonContainer;
}

function createResultatButtonContainer(resultat) {
  const buttonResultatContainer = document.createElement("div");
  buttonResultatContainer.classList.add("button-resultat-container");

  const editResultatButton = document.createElement("button");
  editResultatButton.classList.add("edit");
  editResultatButton.innerHTML = "&#9998;";
  editResultatButton.addEventListener("click", () => updateResultatClicked(resultat));
  buttonResultatContainer.appendChild(editResultatButton);

  const deleteResultatButton = document.createElement("button");
  deleteResultatButton.classList.add("delete");
  deleteResultatButton.innerHTML = "&#128465;";
  deleteResultatButton.addEventListener("click", () => deleteResultatClicked(resultat));
  buttonResultatContainer.appendChild(deleteResultatButton);

  return buttonResultatContainer;
}

// Funktion til at oprette sidens knapper
function createPageButtons(data) {
  const totalPages = Math.ceil(data.length / pageSize);

  // Få den eksisterende pageButtonContainer, hvis den findes
  let pageButtonContainer = document.getElementById('page-buttons');

  // Hvis pageButtonContainer ikke findes, opret den
  if (!pageButtonContainer) {
    pageButtonContainer = document.createElement('div');
    pageButtonContainer.id = 'page-buttons';
  } else {
    // Hvis den findes, fjern dens indhold
    pageButtonContainer.innerHTML = '';
  }

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i.toString();
    pageButton.addEventListener('click', () => {
      window.currentPage = i;
      showData(data, window.currentPage);
    });
    //pageButtonContainer.appendChild(pageButton);  // Tilføj knappen til beholderen
  }

  // Tilføj beholderen til medlemmer-sektionen
  document.getElementById('medlemmer').appendChild(pageButtonContainer);
}function searchData() {
  // Nulstil nuværende side
  window.currentPage = 1;
  const searchField = document.getElementById("searchField");
  const searchTerm = searchField.value.toLowerCase();

  fetch(`${endpoint}/medlemmer.json`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data:", data); // Console log data
      if (data) {
        const medlemmer = prepareData(data); // Konverter data til et array ved hjælp af prepareData

        // Filtrer data baseret på søgetermen
        const filteredData = medlemmer.filter((item) => {
          return (
            item.fornavn.toLowerCase().includes(searchTerm) ||
            item.efternavn.toLowerCase().includes(searchTerm) ||
            item.fødselsdato.toLowerCase().includes(searchTerm) ||
            item.indmeldelsesdato.toLowerCase().includes(searchTerm)
          );
        });

        window.allData = filteredData; // Gem de filtrerede data

        // Opret side-nummer knapper
        createPageButtons(window.allData);

        // Vis den første side efter at have hentet og filtreret dataene
        showData(window.allData, window.currentPage);

        // Hvis der er en sorteringsrækkefølge og sorteringsfelt, sorter dataene
        if (window.currentSortBy && window.currentSortOrder) {
          sortData(window.currentSortBy, window.currentSortOrder);
        }
      }
    });
}



  function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function closeDialog() {
    const dialogs = document.querySelectorAll(".dialog");
  
    dialogs.forEach((dialog) => {
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
          dialog.close();
        }
      });
    });
  }


export { searchData, createButtonContainer, createResultatButtonContainer, prepareData, capitalizeFirstLetter, closeDialog };