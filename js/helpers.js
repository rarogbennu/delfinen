import { showData } from "./script.js";

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
  editButton.addEventListener("click", () => editData(item));
  buttonContainer.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = "&#128465;";
  deleteButton.addEventListener("click", () => deleteData(item));
  buttonContainer.appendChild(deleteButton);

  return buttonContainer;
}

// Funktion til at redigere data
function editData(item) {
  console.log("Rediger data:", item);
}

// Funktion til at slette data
function deleteData(item) {
  console.log("Slet data:", item);
}

// Funktion til at søge i data
function searchData() {
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

        showData(filteredData.slice(0, 24));
      }
});
}

export {searchData, createButtonContainer, prepareData}