
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

// Viser data i HTML
function showData(data) {
  const displayData = document.getElementById("dataDisplay");
  displayData.innerHTML = "";

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