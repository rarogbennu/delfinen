import { getData } from './rest-services.js';

export async function generateKontingentTable(filteredData = null) {
  const medlemmerData = filteredData || await getData();

  let tableHTML = `<table>
        <thead>
            <tr>
                <th>Fornavn</th>
                <th>Efternavn</th>
                <th>Aldersgruppe</th>
                <th>Aktivitetsstatus</th>
                <th>Kontingent</th>
            </tr>
        </thead>
        <tbody>`;

  let totalKontingent = 0;

  for (let id in medlemmerData) {
    let medlem = medlemmerData[id];
    tableHTML += `
        <tr>
            <td>${medlem.fornavn}</td>
            <td>${medlem.efternavn}</td>
            <td>${medlem.aldersgruppe}</td>
            <td>${medlem.aktivitetsstatus}</td>
            <td>${medlem.kontingent}</td>
        </tr>
    `;
    totalKontingent += medlem.kontingent;
  }

  tableHTML += `</tbody>
      <tfoot>
          <tr>
              <td id="totalkol"colspan="4">Total</td>
              <td id="totalkol">${totalKontingent}</td>
          </tr>
      </tfoot>
  </table>`;

  const tableContainer = document.getElementById('kontingentTableContainer');
  tableContainer.innerHTML = tableHTML;
}

async function applyFilters() {
  const medlemmerData = await getData();
  const filterAldersgruppeValue = document.getElementById('filter-aldersgruppe').value;
  const filterAktivitetsstatusValue = document.getElementById('filter-aktivitetsstatus').value;

  const filteredData = Object.values(medlemmerData).filter((medlem) => {
    const aldersgruppeMatch = !filterAldersgruppeValue || medlem.aldersgruppe === filterAldersgruppeValue;
    const aktivitetsstatusMatch = !filterAktivitetsstatusValue || medlem.aktivitetsstatus === filterAktivitetsstatusValue;

    return aldersgruppeMatch && aktivitetsstatusMatch;
  });

  const filteredDataAsObject = filteredData.reduce((acc, medlem) => {
    acc[medlem.id] = medlem;
    return acc;
  }, {});

  await generateKontingentTable(filteredDataAsObject);
}

// Generer tabel ved indlæsning af siden
generateKontingentTable();


  const filterAldersgruppe = document.getElementById('filter-aldersgruppe');
  filterAldersgruppe.addEventListener('change', async () => {
    await applyFilters();
  });

  const filterAktivitetsstatus = document.getElementById('filter-aktivitetsstatus');
  filterAktivitetsstatus.addEventListener('change', async () => {
    await applyFilters();
  });

  // Tilføj event listener til Restance knappen
  const restanceButton = document.getElementById('restance-button');
  restanceButton.addEventListener('click', async () => {
    const medlemmerData = await getData();
    const filteredData = Object.values(medlemmerData).filter((medlem) => {
      return medlem.kontingent < 0 || medlem.kontingent === undefined;
    });

    const filteredDataAsObject = filteredData.reduce((acc, medlem) => {
      acc[medlem.id] = medlem;
      return acc;
    }, {});

    await generateKontingentTable(filteredDataAsObject);
  });