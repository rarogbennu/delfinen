import {getData, getResultatData} from "./rest-services.js";


// get medlemmer og tilføj til "svømmer" option 
async function medlemOptions () {
    const medlemmer = await getData();

    const selectElement = document.querySelector("#medlem-assign-resultat");

    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "-- vælg svømmer --";
    selectElement.appendChild(defaultOption);

    medlemmer.forEach(function(medlem) {
    var option = document.createElement("option");
    option.value = medlem.id;
    option.textContent = medlem.fornavn + " " + medlem.efternavn;
    selectElement.appendChild(option);
    });
}

function enableStævneInput() {
    const aktivitetstypeSelect = document.querySelector("#aktivitetstype-create");
    const stænveInput = document.querySelector("#stævne-create");

    aktivitetstypeSelect.addEventListener("change", function() {
        stænveInput.disabled = (this.value !== "Konkurrence");
    })
}

async function generateResultatTable(filteredData = null) {
    const resultatData = filteredData || await getResultatData();
    const medlemData = await getData();
  
    let tableHTML = `<table>
        <thead>
            <tr>
                <th>Navn</th>
                <th>Aktivitetstype</th>
                <th>Dato</th>
                <th>Disciplin</th>
                <th>Hold</th>
                <th>Placering</th>
                <th>Stævne</th>
                <th>Tid</th>
            </tr>
        </thead>
        <tbody>`;

  for (let id in resultatData) {
    let result = resultatData[id];
    const medlem = medlemData.find(medlem => medlem.id === result.svømmerId);

    tableHTML += `
        <tr>
            <td>${medlem.fornavn} ${medlem.efternavn}</td>
            <td>${result.aktivitetstype}</td>
            <td>${result.dato}</td>
            <td>${result.disciplin}</td>
            <td>${result.hold}</td>
            <td>${result.placering}</td>
            <td>${result.stævne}</td>
            <td>${result.tid}</td>
        </tr>
    `;
  }

  tableHTML += `</tbody>
  </table>`;

  const tableContainer = document.getElementById('resultsTableContainer');
  tableContainer.innerHTML = tableHTML;
  }

// Initial table generation on page load
generateResultatTable();

document.addEventListener('DOMContentLoaded', (event) => {
  const filterAktivitetstype = document.getElementById('filter-aktivitetstype');
  filterAktivitetstype.addEventListener('change', async () => {
    await applyResultatFilters();
  });

  const filterDato = document.getElementById('filter-dato');
  filterDato.addEventListener('change', async () => {
    await applyResultatFilters();
  });

  const filterDisciplin = document.getElementById('filter-disciplin');
  filterDisciplin.addEventListener('change', async () => {
    await applyResultatFilters();
  });

  const filterHold = document.getElementById('filter-hold');
  filterHold.addEventListener('change', async () => {
    await applyResultatFilters();
  });

  const filterPlacering = document.getElementById('filter-placering');
  filterPlacering.addEventListener('change', async () => {
    await applyResultatFilters();
  });

  const filterStævne = document.getElementById('filter-stævne');
  filterStævne.addEventListener('change', async () => {
    await applyResultatFilters();
  });

  const filterTid = document.getElementById('filter-tid');
  filterTid.addEventListener('change', async () => {
    await applyResultatFilters();
  });
});

async function applyResultatFilters() {
  const resultatData = await getResultatData();

  const filterAktivitetstypeValue = document.getElementById('filter-aktivitetstype').value;
  const filterDatoValue = document.getElementById('filter-dato').value;
  const filterDisciplinValue = document.getElementById('filter-disciplin').value;
  const filterHoldValue = document.getElementById('filter-hold').value;
  const filterPlaceringValue = document.getElementById('filter-placering').value;
  const filterStævneValue = document.getElementById('filter-stævne').value;
  const filterTidValue = document.getElementById('filter-tid').value;

  const filteredData = Object.values(resultatData).filter((resultat) => {
    const aktivitetstypeMatch = !filterAktivitetstypeValue || resultat.aktivitetstype === filterAktivitetstypeValue;
    const datoMatch = !filterDatoValue || resultat.dato === filterDatoValue;
    const disciplinMatch = !filterDisciplinValue || resultat.disciplin === filterDisciplinValue;
    const holdMatch = !filterHoldValue || resultat.hold === filterHoldValue;
    const placeringMatch = !filterPlaceringValue || resultat.placering === filterPlaceringValue;
    const stævneMatch = !filterStævneValue || resultat.stævne === filterStævneValue;
    const tidMatch = !filterTidValue || resultat.tid === filterTidValue;

    return aktivitetstypeMatch && datoMatch && disciplinMatch && holdMatch && placeringMatch && stævneMatch && tidMatch;
  });

  const filteredDataAsObject = filteredData.reduce((acc, resultat) => {
    acc[resultat.id] = resultat;
    return acc;
  }, {});

  await generateResultatTable(filteredDataAsObject);
}




export {medlemOptions, enableStævneInput, generateResultatTable}

