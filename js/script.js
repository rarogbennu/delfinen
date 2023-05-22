import {getData, getResultatData, createMedlem, deleteMedlem, updateMedlem, createResultat} from "./rest-services.js"
import {searchData, capitalizeFirstLetter} from "./helpers.js"
import {initViews} from "./views.js"
import { sortData, showData, previousPage, nextPage, calcKontingent, calcAge, calcAldersgruppe} from "./data-handling.js";
import { generateKontingentTable } from "./kontingent.js";
import {medlemOptions, enableStævneInput, generateResultatTable} from "./resultater.js";
import { initAuth, signIn, signOutUser } from "./simple-auth.js";

const pageSize = 1500;
window.currentPage = 1;
window.currentSortBy = '';
window.currentSortOrder = '';

window.addEventListener("load", initApp)

// Funktion til at initialisere applikationen - alle kald der er knyttet til et bestemt view, kan rykkes over i views.js 
function initApp() {
    console.log("initApp");
    initViews();
    searchData();
    getData();
    getResultatData();
    generateKontingentTable();
    medlemOptions();
    enableStævneInput();
    generateResultatTable();
    
    document.querySelector("#btn-create-medlem").addEventListener("click", showCreateMedlemDialog);
    document.querySelector("#form-create-medlem").addEventListener("submit", createMedlemClicked);
    document.querySelector("#button-create-medlem").addEventListener("click", showMedlemCreated);
    document.querySelector("#form-update-medlem").addEventListener("submit", updateMedlemClicked);
    document.querySelector("#form-delete-medlem").addEventListener("submit", deleteMedlemClicked);
    document.querySelector("#form-delete-medlem .btn-cancel").addEventListener("click", deleteCancelClicked);
    document.querySelector("#btn-create-resultat").addEventListener("click", showCreateResultatDialog);
    document.querySelector("#form-create-resultat").addEventListener("submit", createResultatClicked);
    
 
    initAuth();
    document.querySelector("#form-signin").addEventListener("submit", signIn);
    document.querySelector("#btn-sign-out").addEventListener("click", signOutUser);
  }

document.getElementById("searchField").addEventListener("keyup", searchData);

document.querySelectorAll(".sort-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const sortBy = button.dataset.sort;
    const sortOrder = button.dataset.order;
    sortData(sortBy, sortOrder);
  });
});

//CRUD medlem helpers

// Funktion til at vise dialogboksen for oprettelse af medlem
function showCreateMedlemDialog() {
  document.querySelector("#dialog-create-medlem").showModal();
}

// Funktion der kaldes, når der klikkes på knappen til at oprette et medlem
async function createMedlemClicked(event) {
  const form = event.target;

  const fornavn = capitalizeFirstLetter(form.fornavn.value.trim());
  const efternavn = capitalizeFirstLetter(form.efternavn.value.trim());
  const fødselsdato = form.fødselsdato.value;
  const adresse = form.adresse.value.trim();
  const telefon = form.telefon.value.trim();
  const email = form.email.value.trim();
  const medlemstype = form.medlemstype.value;
  const aktivitetsstatus = form.aktivitetsstatus.value;
  const indmeldelsesdato = form.indmeldelsesdato.value;
  const aldersgruppe = calcAldersgruppe(fødselsdato)
  const kontingent = calcKontingent(fødselsdato, aktivitetsstatus);

  const medlem = await createMedlem(fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato, kontingent, aldersgruppe);
  form.reset();

  showMedlemCreated(medlem)
}

// viser nyeste created medlem på #opretmedlem
function showMedlemCreated(item) {

console.log(item)
console.log("show medlem")

const html = /*html*/ `
    <p>Fornavn: ${item.fornavn}</p>
    <p>Efternavn: ${item.efternavn}</p>
    <p>Fødselsdato: ${item.fødselsdato}</p>
    <p>Adresse: ${item.adresse}</p>
    <p>Telefon: ${item.telefon}</p>
    <p>Email: ${item.email}</p>
    <p>Medlemstype: ${item.medlemstype}</p>
    <p>Aktivitetsstatus: ${item.aktivitetsstatus}</p>
    <p>Indmeldelsesdato: ${item.indmeldelsesdato}</p>
    <p>Kontingent: ${item.kontingent}</p>
    <p>Aldersgruppe: ${item.aldersgruppe}</p>
    <button id="opdater-button">Opdater</button>
    <button id="slet-medlem-button">Slet medlem</button>
    <button id="godkend-button">Godkend</button>
`;

document.querySelector("#show-medlem-created").insertAdjacentHTML("beforeend", html);

// document.querySelector("#opdater-button").addEventListener("click",  () => updateClicked(item));


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

  const fornavn = capitalizeFirstLetter(form.fornavn.value.trim());
  const efternavn = capitalizeFirstLetter(form.efternavn.value.trim());
  const fødselsdato = form.fødselsdato.value;
  const adresse = form.adresse.value.trim();
  const telefon = form.telefon.value.trim();
  const email = form.email.value.trim();
  const medlemstype = form.medlemstype.value;
  const aktivitetsstatus = form.aktivitetsstatus.value;
  const indmeldelsesdato = form.indmeldelsesdato.value;
  const aldersgruppe = calcAldersgruppe(fødselsdato)
  const kontingent = calcKontingent(fødselsdato, aktivitetsstatus);

  const id = form.getAttribute("data-id");
  updateMedlem(id, fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato, kontingent, aldersgruppe);
}

async function updateMedlemTable(medlemmer) {
  medlemmer = await getData();
  showData(medlemmer); 
}

// Funktion til at annullere sletning af medlem
function deleteCancelClicked() {
  document.querySelector("#dialog-delete-medlem").close();
}

// CRUD resultat helpers

function showCreateResultatDialog() {
  document.querySelector("#dialog-create-resultat").showModal();
}

async function createResultatClicked(event) {
  console.log("opret resultat clicked")
  event.preventDefault();
  const form = event.target;

  const hold = form.hold.value;
  const disciplin = form.disciplin.value;
  const svømmerOption = form["medlem-assign-resultat"].value;
  const svømmerId = svømmerOption;
  const aktivitetstype = form.aktivitetstype.value;
  const stævne = capitalizeFirstLetter(form.stævne.value.trim());
  const dato = form["resultat-dato"].value;
  const placering = form.placering.value;
  const tid = form.tid.value

  const resultat = await createResultat(hold, disciplin, svømmerId, aktivitetstype, stævne, dato, placering, tid);
  form.reset();

  // showResultCreated();
}

export {
  showData,
  updateClicked,
  createMedlemClicked,
  updateMedlemClicked,
  updateMedlemTable,
  createResultatClicked,
  nextPage,
  previousPage,
  deleteClicked,
  sortData,
  pageSize
};