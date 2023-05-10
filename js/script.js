
import { searchData, createButtonContainer } from "./helpers.js";
import { getData } from "./rest-services.js";

window.addEventListener("load", initApp)

function initApp() {
console.log("loaded");    
searchData();
getData();
}

// Event listener for the keyup event on the search field
document.getElementById("searchField").addEventListener("keyup", searchData);

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
    const dataRow = document.createElement("div");
    dataRow.classList.add("data-row");

    const relevantKeys = ["fornavn", "efternavn", "fødselsdato", "indmeldelsesdato"];
    relevantKeys.forEach((key) => {
      const dataCell = document.createElement("div");
      dataCell.classList.add("data-cell");
      dataCell.innerText = item[key];
      dataRow.appendChild(dataCell);
    });

    dataRow.appendChild(createButtonContainer(item));
    displayData.appendChild(dataRow);
  });
}

function updateMedlemClicked(event) {
  const form = event.target;

  const fornavn = form.fornavn.value;
  const efternavn = form.efternavn.value;

  const id = form.getAttribute("data-id");
  updatePost(id, fornavn, efternavn);
}

function updateClicked(medlemObject) {
  const updateForm = document.querySelector("#form-update-medlem");
  updateForm.fornavn.value = medlemObject.fornavn;
  updateForm.efternavn.value = medlemObject.efternavn;
  updateForm.setAttribute("data-id", medlemObject.id);
  document.querySelector("#dialog-update-medlem").showModal();
}

export {showData}
