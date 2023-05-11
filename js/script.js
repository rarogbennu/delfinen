import {searchData, createButtonContainer} from "./helpers.js"
import {getData, updateMedlem} from "./rest-services.js"
import {initViews} from "./views.js"
import { currentPage } from './state.js';


// Global variables for page size and current page
const pageSize = 15;
window.currentPage = 1;

window.addEventListener("load", initApp)

function initApp() {
    console.log("initApp");
    initViews();
    searchData();
    getData();

// event listeners til CRUD functions
document.querySelector("#form-update-medlem").addEventListener("submit", updateMedlemClicked);
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

       showData(medlemmer, currentPage);}
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
function showData(data, page = 1) {
  // Calculate start and end indices based on page number
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  // Slice data array to get items for current page
  const pageData = data.slice(start, end);
  const dataView = document.getElementById("dataDisplay");
  dataView.innerHTML = "";

  pageData.forEach((item) => {
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
// Create function to render previous page
function previousPage(data) {
  window.currentPage--;
  if (window.currentPage < 1) window.currentPage = 1;  // Prevent going below page 1
  showData(data, window.currentPage);
}

// Create function to render next page
function nextPage(data) {
 window.currentPage++;
  showData(data, window.currentPage);
}

// events

function updateMedlemClicked(event) {
  const form = event.target;

  const fornavn = form.fornavn.value;
  const efternavn = form.efternavn.value;
  const fødselsdato = form.fødselsdato.value;
  const adresse = form.adresse.value;
  const telefon = form.telefon.value;
  const email = form.email.value;
  const medlemstype = form.medlemstype.value;
  const aktivitetsstatus = form.aktivitetsstatus.value;
  const indmeldelsesdato = form.indmeldelsesdato.value;

  const id = form.getAttribute("data-id");
  updateMedlem(id, fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato);
}


// Dialogs for update and delete medlem 

function updateClicked(item) {
  console.log(item)
  const updateForm = document.querySelector("#form-update-medlem");
  updateForm.fornavn.value = item.fornavn;
  updateForm.efternavn.value = item.efternavn;
  updateForm.fødselsdato.value = item.fødselsdato;
  updateForm.adresse.value = item.adresse;
  updateForm.telefon.value = item.telefon;
  updateForm.email.value = item.email;
  updateForm.medlemstype.value = item.medlemstype;
  updateForm.aktivitetsstatus.value = item.aktivitetsstatus;
  updateForm.indmeldelsesdato.value = item.indmeldelsesdato;
  updateForm.setAttribute("data-id", item.id);
  document.querySelector("#dialog-update-medlem").showModal();
}


export {showData, updateClicked, nextPage, previousPage}
