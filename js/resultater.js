import {getData, getResultatData} from "./rest-services.js";

let resultatData = {}; 
let medlemData = [];

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
  resultatData = filteredData || (await getResultatData());
  const medlemData = await getData();

  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Navn
            <button class="sort-btn" data-sort="navn" data-order="asc">&#9650;</button>
            <button class="sort-btn" data-sort="navn" data-order="desc">&#9660;</button>
          </th>
          <th>Aktivitetstype
            <button class="sort-btn" data-sort="aktivitetstype" data-order="asc">&#9650;</button>
            <button class="sort-btn" data-sort="aktivitetstype" data-order="desc">&#9660;</button>
          </th>
          <th>Dato
            <button class="sort-btn" data-sort="dato" data-order="asc">&#9650;</button>
            <button class="sort-btn" data-sort="dato" data-order="desc">&#9660;</button>
          </th>
          <th>Disciplin
            <button class="sort-btn" data-sort="disciplin" data-order="asc">&#9650;</button>
            <button class="sort-btn" data-sort="disciplin" data-order="desc">&#9660;</button>
          </th>
          <th>Hold
            <button class="sort-btn" data-sort="hold" data-order="asc">&#9650;</button>
            <button class="sort-btn" data-sort="hold" data-order="desc">&#9660;</button>
          </th>
          <th>Placering
            <button class="sort-btn" data-sort="placering" data-order="asc">&#9650;</button>
            <button class="sort-btn" data-sort="placering" data-order="desc">&#9660;</button>
          </th>
          <th>Stævne
            <button class="sort-btn" data-sort="stævne" data-order="asc">&#9650;</button>
            <button class="sort-btn" data-sort="stævne" data-order="desc">&#9660;</button>
          </th>
          <th>Tid
            <button class="sort-btn" data-sort="tid" data-order="asc">&#9650;</button>
            <button class="sort-btn" data-sort="tid" data-order="desc">&#9660;</button>
          </th>
        </tr>
      </thead>
      <tbody>`;

  for (let id in resultatData) {
    let result = resultatData[id];
    const medlem = medlemData.find((medlem) => medlem.id === result.svømmerId);

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

  const sortButtons = document.querySelectorAll('.sort-btn');
  sortButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const sortAttribute = button.getAttribute('data-sort');
      const sortOrder = button.getAttribute('data-order');
      applyResultatSort(sortAttribute, sortOrder);
    });
  });
}

function applyResultatSort(sortAttribute, sortOrder) {
  const sortButtons = document.querySelectorAll('.sort-btn');
  sortButtons.forEach((button) => {
    button.classList.remove('active');
  });

  const sortButton = document.querySelector(`.sort-btn[data-sort="${sortAttribute}"][data-order="${sortOrder}"]`);
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
        valueA = parseInt(a[sortAttribute], 10);
        valueB = parseInt(b[sortAttribute], 10);
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
  const sortButtons = document.querySelectorAll('.sort-btn');
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

  const filterDato = document.getElementById('filter-dato');
  filterDato.addEventListener('input', applyResultatFilters);

  const filterDisciplin = document.getElementById('filter-disciplin');
  filterDisciplin.addEventListener('change', applyResultatFilters);

  const filterHold = document.getElementById('filter-hold');
  filterHold.addEventListener('change', applyResultatFilters);

  const filterPlacering = document.getElementById('filter-placering');
  filterPlacering.addEventListener('input', applyResultatFilters);

  const filterStævne = document.getElementById('filter-stævne');
  filterStævne.addEventListener('input', applyResultatFilters);

  const filterTid = document.getElementById('filter-tid');
  filterTid.addEventListener('input', applyResultatFilters);

  // Initial table generation on page load
  await generateResultatTable();
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

    return (
      aktivitetstypeMatch &&
      datoMatch &&
      disciplinMatch &&
      holdMatch &&
      placeringMatch &&
      stævneMatch &&
      tidMatch
    );
  });

  const filteredDataAsObject = filteredData.reduce((acc, resultat) => {
    acc[resultat.id] = resultat;
    return acc;
  }, {});

  await generateResultatTable(filteredDataAsObject);
}


export {medlemOptions, enableStævneInput, generateResultatTable}

