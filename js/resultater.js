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

async function generateResultatTable() {
    const resultatData = await getResultatData();
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

export {medlemOptions, enableStævneInput, generateResultatTable}

