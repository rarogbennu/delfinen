// Importer funktioner og variabler fra andre moduler
import { updateClicked, deleteClicked } from "./script.js";
import { sortData, showData} from "./data-handling.js";
import { endpoint } from "./rest-services.js";

// Definér en global variabel for sidestørrelse
const pageSize = 15;

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
    pageButtonContainer.appendChild(pageButton);  // Tilføj knappen til beholderen
  }

  // Tilføj beholderen til medlemmer-sektionen
  document.getElementById('medlemmer').appendChild(pageButtonContainer);
}
function searchData() {
  // Reset current page
  window.currentPage = 1;
  const searchField = document.getElementById("searchField");
  const request = searchField.value.toLowerCase();

  fetch(`${endpoint}/medlemmer.json`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data:", data); // Console log data
      if (data) {
        const medlemmer = prepareData(data); // Convert data to an array using prepareData

        window.allData = medlemmer;  // Store all data

        // Create page number buttons
        createPageButtons(window.allData);

        // Show first page after fetching and filtering of data
        showData(window.allData, window.currentPage);

        // If there's a sorting order and sorting field, sort the data
        if(window.currentSortBy && window.currentSortOrder) {
          sortData(window.currentSortBy, window.currentSortOrder);
        }
      }
    });
}

function transformDateFormat(dateString) {
  const parts = dateString.split("-");
  const day = parts[2].padStart(2, "0");
  const month = parts[1].padStart(2, "0");
  const year = parts[0];
  return `${day}/${month}/${day}`;
}

export { searchData, createButtonContainer, prepareData };