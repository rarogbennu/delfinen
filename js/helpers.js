
<<<<<<< HEAD
import { displayData } from "./script.js";
=======
import { showData } from "./script.js";
>>>>>>> 1b3497e72a07e3dde9dcb3502875d5b1a974ec6b

// Opretter knapper til redigering og sletning
function createButtonContainer(item) {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const editButton = document.createElement("button");
  editButton.classList.add("edit");
  editButton.innerHTML = "&#9998;";
  editButton.addEventListener("click", () => redigerData(item));
  buttonContainer.appendChild(editButton);

  const deletebutton = document.createElement("button");
  deletebutton.classList.add("delete");
  deletebutton.innerHTML = "&#128465;";
  deletebutton.addEventListener("click", () => sletData(item));
  buttonContainer.appendChild(deletebutton);

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
        const filtreredData = medlemmer.filter((item) => {
          return (
            item.fornavn.toLowerCase().includes(request) ||
            item.efternavn.toLowerCase().includes(request) ||
            item.fødselsdato.toLowerCase().includes(request) ||
            item.indmeldelsesdato.toLowerCase().includes(request)
          );
        });

<<<<<<< HEAD
        displayData(filtreretData.slice(0, 24));
=======
        showData(filtreredData.slice(0, 24));
>>>>>>> 1b3497e72a07e3dde9dcb3502875d5b1a974ec6b
      }
});
}

export {searchData, createButtonContainer}