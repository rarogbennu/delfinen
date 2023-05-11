import {showData, updateClicked, deleteClicked, nextPage, previousPage} from "./script.js"
import { currentPage } from './state.js';


// Global variables for page size and current page
const pageSize = 15;

function prepareData(dataObject) {
    const dataArray = [];
    for (const key in dataObject) {
      const data = dataObject[key];
      data.id = key;
      dataArray.push(data);
    }
  
    return dataArray;
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

 // Create a div to contain the page buttons
  const pageButtonContainer = document.createElement('div');
  pageButtonContainer.id = 'page-buttons';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i.toString();
    pageButton.addEventListener('click', () => {
      window.currentPage = i;
      showData(data, window.currentPage);
     });
    pageButtonContainer.appendChild(pageButton);  // append the button to the container
  }

  document.body.appendChild(pageButtonContainer);  // append the container to the body
}

// Funktion til at søge i data
function searchData() {
   // Reset current page
 window.currentPage = 1;
  const searchField = document.getElementById("searchField");
  const request = searchField.value.toLowerCase();

fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const medlemmer = data.medlemmer;

      if (Array.isArray(medlemmer)) {
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

        // Create page number buttons
        createPageButtons(filteredData);
      }
  });
}

export {searchData, createButtonContainer, prepareData}