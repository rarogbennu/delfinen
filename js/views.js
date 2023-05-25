import {medlemOptions, enableStævneInput, enablePlaceringInput, generateResultatTable, enableStævneInputUpdate, enablePlaceringInputUpdate} from "./resultater.js"

function initViews() {
    window.addEventListener("hashchange", changeView);
    changeView();
}

function changeView() {
  let hashLink = "#home";

  if (location.hash) {
    hashLink = location.hash;
  }

  hideViews();

  document.querySelector(hashLink).classList.add("active");
  setActiveLink(hashLink);

  if (hashLink === "#medlemmer") {
    console.log("#medlemmer")
  }
  else if (hashLink === "#opret-medlem") {
    console.log("#opret-medlem")

    document.querySelector("#show-medlem-created").innerHTML = ""
  }
  else if (hashLink === "#resultater") {
    // forsøg på at kalde page specifikke funktioner fra views i stedet for initApp
    
    console.log("#resultater")
    medlemOptions();
    enableStævneInput();
    enablePlaceringInput();
    generateResultatTable();
    enableStævneInputUpdate();
    enablePlaceringInputUpdate();
  }
  else if (hashLink === "#kontingent") {
    console.log("#kontingent")
  }
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