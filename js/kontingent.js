import { getData } from './rest-services.js';

export async function generateKontingentTable() {
  console.log("generateKontingentTable called"); // 1
  const medlemmerData = await getData();
  console.log("getData finished", medlemmerData); // 2
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
      console.log("Processing member", medlem); // 3
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

  console.log("All members processed"); // 4
  tableHTML += `</tbody>
      <tfoot>
          <tr>
              <td colspan="4">Total</td>
              <td>${totalKontingent}</td>
          </tr>
      </tfoot>
  </table>`;

  console.log("Table generated", tableHTML); // 5
  return tableHTML;

    // Add this code at the end of the function
  const tableContainer = document.getElementById('kontingentTableContainer');
  tableContainer.innerHTML = tableHTML;

  const filterAldersgruppe = document.getElementById('filter-aldersgruppe');
  filterAldersgruppe.addEventListener('change', async () => {
    await applyFilters();
  });

  const filterAktivitetsstatus = document.getElementById('filter-aktivitetsstatus');
  filterAktivitetsstatus.addEventListener('change', async () => {
    await applyFilters();
  });
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

  const tableHTML = await generateTable(filteredDataAsObject);
  const tableContainer = document.getElementById('kontingentTableContainer');
  tableContainer.innerHTML = tableHTML;
}