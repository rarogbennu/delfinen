import {getData, createMedlem, deleteMedlem, updateMedlem} from "./rest-services.js"
import {searchData} from "./helpers.js"
import {initViews} from "./views.js"
import { sortData, showData, previousPage, nextPage} from "./data-handling.js";

const pageSize = 15;
window.currentPage = 1;
window.currentSortBy = '';
window.currentSortOrder = '';

window.addEventListener("load", initApp)

// Funktion til at initialisere applikationen
function initApp() {
    console.log("initApp");
    initViews();
    searchData();
    getData();

    document.querySelector("#btn-create-medlem").addEventListener("click", showCreateMedlemDialog);
    document.querySelector("#form-create-medlem").addEventListener("submit", createMedlemClicked);
    document.querySelector("#form-update-medlem").addEventListener("submit", updateMedlemClicked);
    document.querySelector("#form-delete-medlem").addEventListener("submit", deleteMedlemClicked);
    document.querySelector("#form-delete-medlem .btn-cancel").addEventListener("click", deleteCancelClicked);
}

document.getElementById("searchField").addEventListener("keyup", searchData);

document.querySelectorAll(".sort-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const sortBy = button.dataset.sort;
    const sortOrder = button.dataset.order;
    sortData(sortBy, sortOrder);
  });
});

// Funktion til at vise dialogboksen for oprettelse af medlem
function showCreateMedlemDialog() {
  document.querySelector("#dialog-create-medlem").showModal();
}

// Funktion der kaldes, når der klikkes på knappen til at oprette et medlem
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

// Funktion der kaldes, når der klikkes på knappen til at opdatere et medlem
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


// Funktion der kaldes, når der klikkes på knappen til at slette et medlem
function deleteMedlemClicked(event) {
  const id = event.target.getAttribute("data-id"); // event.target is the delete form
  deleteMedlem(id); // call deletePost with id
}

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

async function updateMedlemTable(data) {
  data = await getData(); // get posts from rest endpoint and save in variable
  showData(data); // show all posts (append to the DOM) with posts as argument
}

// Funktion til at annullere sletning af medlem
function deleteCancelClicked() {
  document.querySelector("#dialog-delete-medlem").close(); // luk dialogboksen
}

export {
  showData,
  updateClicked,
  createMedlemClicked,
  updateMedlemClicked,
  updateMedlemTable,
  nextPage,
  previousPage,
  deleteClicked,
  sortData,
  pageSize
};