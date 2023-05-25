// Importer funktioner og variabler fra andre moduler
import {updateClicked, deleteClicked} from "./script.js";
import {sortData, showData} from "./data-handling.js";
import {endpoint} from "./rest-services.js";

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

function searchData() {
  // Nulstil nuværende side
  window.currentPage = 1;
  const searchField = document.getElementById("searchField");
  const searchTerm = searchField.value.toLowerCase();

  fetch(`${endpoint}/medlemmer.json`)
    .then((response) => response.json())
    .then((data) => {
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


export {searchData, createButtonContainer, prepareData, capitalizeFirstLetter, closeDialog};