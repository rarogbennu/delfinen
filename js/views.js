function initViews() {
    console.log("initViews");
    window.addEventListener("hashchange", changeView);
    changeView();
}

import { generateKontingentTable } from './kontingent.js'; // Tilføj denne linje øverst i filen

function changeView() {
  let hashLink = "#home";

  if (location.hash) {
    hashLink = location.hash;
  }

  hideViews();
  hidePaginationButtons();

  document.querySelector(hashLink).classList.add("active");
  setActiveLink(hashLink);

// set if/else op til at kalde side specifikke funktioner, så de ikke alle sammen bliver kaldt fra initApp!
  if (hashLink === "#medlemmer") {
    showPaginationButtons();
  } 
}

  // Tilføj dette
//   if (hashLink === "#kontingent") {
//     generateKontingentTable().then(tableHTML => {
//       const kontingentSection = document.querySelector('#kontingent'); // Erstat med den korrekte selector
//       kontingentSection.innerHTML = tableHTML;
//     }).catch(error => console.error("Failed to generate table", error));
// }



function hidePaginationButtons() {
    const paginationButtons = document.querySelectorAll(".page-buttons");
    paginationButtons.forEach(button => {
        button.style.display = "none";
    });
}

function showPaginationButtons() {
    const paginationButtons = document.querySelectorAll(".page-buttons");
    paginationButtons.forEach(button => {
        button.style.display = "block";
    });
}

function setActiveLink(view) {
    const link = document.querySelector(`a.show-link[href="${view}"]`);
    if (link) {
        link.classList.add("active");
    }
}

function hideViews() {
    document.querySelectorAll(".show-content").forEach(link => link.classList.remove("active"));
    document.querySelectorAll(".show-link").forEach(link => link.classList.remove("active"));
}




export {initViews};