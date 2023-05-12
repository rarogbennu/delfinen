import {showData, updateClicked, deleteClicked, nextPage, previousPage} from "./script.js"
import { endpoint } from "./rest-services.js";
import { currentPage } from './state.js';


// Globale variabler for side størrelse og nuværende side
const pageSize = 15;

function prepareData(dataObject) {
    const dataArray = [];
    for (const key in dataObject) {
        if (dataObject.hasOwnProperty(key)) {
            const data = dataObject[key];
            // Skip if data is null
            if (data !== null) {
                data.id = key;
                dataArray.push(data);
            }
        }
    }
    return dataArray;
}


function showPaginationButtons() {
  const pageButtonContainer = document.getElementById("page-buttons");
  pageButtonContainer.style.display = "block";
}

function hidePaginationButtons() {
  const pageButtonContainer = document.getElementById("page-buttons");
  pageButtonContainer.style.display = "none";
}


// Opretter knapper til redigering og sletning
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

function createPageButtons(data) {
  const totalPages = Math.ceil(data.length / pageSize);

  // Opret en div til at indeholde sideknapperne
  const pageButtonContainer = document.createElement('div');
  pageButtonContainer.id = 'page-buttons';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i.toString();
    pageButton.addEventListener('click', () => {
      window.currentPage = i;
      showData(data, window.currentPage);
    });
    pageButtonContainer.appendChild(pageButton);  // Tilføj knappen til beholderen
  }

  document.getElementById('medlemmer').appendChild(pageButtonContainer);  // Tilføj beholderen til medlemmer-sektionen
}


function searchData() {
  // Nulstil nuværende side
  window.currentPage = 1;
  const searchField = document.getElementById("searchField");
  const request = searchField.value.toLowerCase();

  fetch(`${endpoint}/medlemmer.json`)
  .then((response) => response.json())
  .then((data) => {
    console.log("Data:", data);  // Konsollog data
    if (data) {
      const medlemmer = prepareData(data);  // Konverter dataen til et array ved hjælp af prepareData

      const filteredData = medlemmer.filter((item) => {
        return (
          item.fornavn.toLowerCase().includes(request) ||
          item.efternavn.toLowerCase().includes(request) ||
          item.fødselsdato.toLowerCase().includes(request) ||
          item.indmeldelsesdato.toLowerCase().includes(request)
        );
      });

      // Vis første side efter fetching og filtering af data
      showData(filteredData, window.currentPage);

      // Lav side nummer knapper
      createPageButtons(filteredData);
    }
  });
}



export {searchData, createButtonContainer, prepareData}