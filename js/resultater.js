import {getData, getResultatData} from "./rest-services.js";
import {updateResultatClicked, deleteResultatClicked} from "./script.js";

let resultatData = {}; 
let medlemData = [];

// get medlemmer og tilføj til "svømmer" option 
async function medlemOptions () {
    const medlemmer = await getData();
    const holdSelect = document.querySelector("#hold-create");
    const selectElement = document.querySelector("#medlem-assign-resultat");

    holdSelect.addEventListener("change", function () {
      const selectedHold = holdSelect.value;
      selectElement.innerHTML = "";

      medlemmer.forEach(function(medlem) {

      if (medlem.medlemstype === "konkurrence" && medlem.aldersgruppe === selectedHold){
      const option = document.createElement("option");
      option.value = medlem.id;
      option.textContent = medlem.fornavn + " " + medlem.efternavn;
      selectElement.appendChild(option);
      }
    });
  });

    selectElement.required = true;
}

function enableStævneInput() {
    const aktivitetstypeSelect = document.querySelector("#aktivitetstype-create");
    const stænveInput = document.querySelector("#stævne-create");

    aktivitetstypeSelect.addEventListener("change", function() {
        stænveInput.disabled = (this.value !== "Konkurrence");
    })
}

function enablePlaceringInput() {
  const aktivitetstypeSelect = document.querySelector("#aktivitetstype-create");
  const placeringInput = document.querySelector("#placering-create");

  aktivitetstypeSelect.addEventListener("change", function() {
      placeringInput.disabled = (this.value !== "Konkurrence");
  })
}

function enableStævneInputUpdate() {
  const aktivitetstypeSelectUpdate = document.querySelector("#aktivitetstype-update");
  const stævneInputUpdate = document.querySelector("#stævne-update");

  aktivitetstypeSelectUpdate.addEventListener("change", function(){
      stævneInputUpdate.disabled = (this.value !== "Konkurrence");
  })
}

function enablePlaceringInputUpdate() {
  const aktivitetstypeSelectUpdate = document.querySelector("#aktivitetstype-update");
  const placeringInputUpdate = document.querySelector("#placering-update");

  aktivitetstypeSelectUpdate.addEventListener("change", function(){
      placeringInputUpdate.disabled = (this.value !== "Konkurrence");
  })
}


async function generateResultatTable(filteredData = null) {
  resultatData = filteredData || await getResultatData();
  const medlemData = await getData();

  const resultsTableContainer = document.querySelector("#resultsTableContainer table tbody");

  resultsTableContainer.innerHTML = '';

  for (let id in resultatData) {
    let result = resultatData[id];
    const medlem = medlemData.find((medlem) => medlem.id === result.svømmerId);
    let tableHTML = "";

    tableHTML = /*html*/`
      <tr>
        <td>${medlem.fornavn} ${medlem.efternavn}</td>
        <td>${result.aktivitetstype}</td>
        <td>${result.dato}</td>
        <td>${result.disciplin}</td>
        <td>${result.hold}</td>
        <td>${result.placering}</td>
        <td>${result.stævne}</td>
        <td>${result.tid}</td>
        <td><div class="button-resultat-container"><button class="edit">✎</button><button class="delete">🗑</button></div></td>
      </tr>
    `;

    resultsTableContainer.insertAdjacentHTML("beforeend", tableHTML);

    const editButton = document.querySelector("#resultsTableContainer tr:last-child button.edit");
    editButton.addEventListener("click", () => updateResultatClicked(result));

    const deleteButton = document.querySelector("#resultsTableContainer tr:last-child button.delete");
    deleteButton.addEventListener("click", () => deleteResultatClicked(result));
  }

  const sortButtons = document.querySelectorAll('.sort-btn-update');
  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const sortAttribute = button.getAttribute('data-sort');
      const sortOrder = button.getAttribute('data-order');
      applyResultatSort(sortAttribute, sortOrder);
    });
  });
}


// function sortResultatByTime(resultatA, resultatB){
//   return resultatA.tid.localeCompare(resultatB.tid)
// }


function applyResultatSort(sortAttribute, sortOrder) {
  const sortButtons = document.querySelectorAll('.sort-btn-update');
  sortButtons.forEach((button) => {
    button.classList.remove('active');
  });

  const sortButton = document.querySelector(`.sort-btn-update[data-sort="${sortAttribute}"][data-order="${sortOrder}"]`);
  sortButton.classList.add('active');

  const sortDirection = sortOrder === 'asc' ? 1 : -1;

  const sortData = async () => {
    medlemData = await getData(); // Fetch member data before sorting

    const sortedData = Object.values(resultatData).sort((a, b) => {
      let valueA, valueB;

      if (sortAttribute === 'navn') {
        const medlemA = medlemData.find((medlem) => medlem.id === a.svømmerId);
        const medlemB = medlemData.find((medlem) => medlem.id === b.svømmerId);
        valueA = `${medlemA.fornavn} ${medlemA.efternavn}`;
        valueB = `${medlemB.fornavn} ${medlemB.efternavn}`;
      } else if (sortAttribute === 'placering') {
        valueA = parseInt(a[sortAttribute], 10) || 0;
        valueB = parseInt(b[sortAttribute], 10) || 0;
      } else {
        valueA = a[sortAttribute];
        valueB = b[sortAttribute];
      }

      if (valueA < valueB) {
        return -1 * sortDirection;
      } else if (valueA > valueB) {
        return 1 * sortDirection;
      } else {
        return 0;
      }
    });

    generateResultatTable(sortedData);
  };

  sortData();
}


document.addEventListener('DOMContentLoaded', async () => {
  const sortButtons = document.querySelectorAll('.sort-btn-update');
  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const sortAttribute = button.getAttribute('data-sort');
      const sortOrder = button.getAttribute('data-order');
      applyResultatSort(sortAttribute, sortOrder);
    });
  });

  // Add event listeners to filter elements
  const filterAktivitetstype = document.getElementById('filter-aktivitetstype');
  filterAktivitetstype.addEventListener('change', applyResultatFilters);

  const filterDisciplin = document.getElementById('filter-disciplin');
  filterDisciplin.addEventListener('change', applyResultatFilters);

  const filterHold = document.getElementById('filter-hold');
  filterHold.addEventListener('change', applyResultatFilters);

  // Initial table generation on page load
  await generateResultatTable();
});

async function applyResultatFilters() {
  const resultatData = await getResultatData();


  const filterAktivitetstypeValue = document.getElementById('filter-aktivitetstype').value;
  const filterDisciplinValue = document.getElementById('filter-disciplin').value;
  const filterHoldValue = document.getElementById('filter-hold').value;

  const filteredData = Object.values(resultatData).filter((resultat) => {
    const aktivitetstypeMatch = !filterAktivitetstypeValue || resultat.aktivitetstype === filterAktivitetstypeValue;
    const disciplinMatch = !filterDisciplinValue || resultat.disciplin === filterDisciplinValue;
    const holdMatch = !filterHoldValue || resultat.hold === filterHoldValue;

    return (
      aktivitetstypeMatch &&
      disciplinMatch &&
      holdMatch
    );
  });

  const filteredDataAsObject = filteredData.reduce((acc, resultat) => {
    acc[resultat.id] = resultat;
    return acc;
  }, {});

  await generateResultatTable(filteredDataAsObject);
}


export {medlemOptions, enableStævneInput, enablePlaceringInput, enableStævneInputUpdate, enablePlaceringInputUpdate, generateResultatTable}

