
import {getData, createMedlem, updateMedlem, deleteMedlem, endpoint} from "./rest-services.js"
import {searchData, createButtonContainer, prepareData, transformDateFormat} from "./helpers.js"
import {initViews} from "./views.js"
import { currentPage } from './state.js';


// Globale variabler for side størrelse og nuværende side
const pageSize = 15;
window.currentPage = 1;

window.addEventListener("load", initApp)

function initApp() {
    console.log("initApp");
    initViews();
    searchData();
    getData();

// event listeners til CRUD functions
document.querySelector("#btn-create-medlem").addEventListener("click", showCreateMedlemDialog); //html section #opretmedlem
document.querySelector("#form-create-medlem").addEventListener("submit", createMedlemClicked);
document.querySelector("#form-update-medlem").addEventListener("submit", updateMedlemClicked);
document.querySelector("#form-delete-medlem").addEventListener("submit", deleteMedlemClicked);
document.querySelector("#form-delete-medlem .btn-cancel").addEventListener("click", deleteCancelClicked);
}

// Event listener for keyup-eventet på søgefeltet
document.getElementById("searchField").addEventListener("keyup", searchData);

// Event listener for sorterings knappen
document.querySelectorAll(".sort-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const sortBy = button.dataset.sort;
    const sortOrder = button.dataset.order;
    sortData(sortBy, sortOrder);
  });
});

// Sorter data og opdater visningen
function sortData(sortBy, sortOrder) {
 fetch(`${endpoint}/medlemmer.json`)
    .then((response) => response.json())
    .then((data) => {
      let medlemmer = prepareData(data); // Brug prepareData-funktionen til at konvertere data til et array

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

// Viser data i HTML
function showData(data, page = 1) {
  // Beregn start- og slutindekser baseret på sidenummer
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  // Skær data-arrayet for at få elementer til den aktuelle side
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
// Opret funktion til at vise forrige side
function previousPage(data) {
  window.currentPage--;
  if (window.currentPage < 1) window.currentPage = 1;  // Prevent going below page 1
  showData(data, window.currentPage);
}

// Opret funktion til at vise næste side
function nextPage(data) {
 window.currentPage++;
  showData(data, window.currentPage);
}

// Dialoger til opdatering og sletning af medlem

function showCreateMedlemDialog() {
  document.querySelector("#dialog-create-medlem").showModal();
}

function createMedlemClicked(event) {
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

  createMedlem(fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato);
      form.reset();
}

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

function deleteClicked(item) {
  document.querySelector("#dialog-delete-medlem-navn").textContent = item.fornavn + " " + item.efternavn;
  document.querySelector("#form-delete-medlem").setAttribute("data-id", item.id);
  document.querySelector("#dialog-delete-medlem").showModal();
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

function deleteMedlemClicked(event) {
  const id = event.target.getAttribute("data-id"); // event.target is the delete form
  deleteMedlem(id); // call deletePost with id
}

function deleteCancelClicked() {
  document.querySelector("#dialog-delete-medlem").close(); // close dialog
}

export {showData, updateClicked, deleteClicked, createMedlemClicked, nextPage, previousPage}