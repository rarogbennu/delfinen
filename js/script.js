import {searchData, createButtonContainer} from "./helpers.js"
import {getData} from "./rest-services.js"
import {initViews} from "./views.js"

window.addEventListener("load", initApp)

function initApp() {
    console.log("initApp");
    initViews();
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
        let valueA;
        let valueB;

        if (sortBy === 'fødselsdato') {
          valueA = transformDateFormat(a[sortBy]);
          valueB = transformDateFormat(b[sortBy]);
        } else {
          valueA = a[sortBy];
          valueB = b[sortBy];
        } if (sortOrder === "asc") {
            return valueA.localeCompare(valueB, undefined, { numeric: true });
          } else {
            return valueB.localeCompare(valueA, undefined, { numeric: true });
          }
        });

        showData(medlemmer.slice(0, 24));
      } else {
        console.error("JSON data is not formatted as expected. Please ensure it is an array of objects.");
      }
    });
}

function transformDateFormat(dateString) {
  const parts = dateString.split("/");
  const day = parts[0].padStart(2, "0");
  const month = parts[1].padStart(2, "0");
  const year = parts[2];
  return `${year}-${month}-${day}`;
}

// Viser data i HTML
function showData(data) {
  const dataView = document.getElementById("dataDisplay");
  dataView.innerHTML = "";

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
    dataView.appendChild(dataRow);
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
