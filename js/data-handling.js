import {createButtonContainer} from "./helpers.js"
import { pageSize } from "./script.js";

// Funktion til at sortere data efter en bestemt kategori og rækkefølge
function sortData(sortBy, sortOrder) {
  window.currentSortBy = sortBy;
  window.currentSortOrder = sortOrder;

  // Kontrollerer om der er data tilgængelig
  if (window.allData) {
    window.allData.sort((a, b) => {
      let valueA = a[window.currentSortBy];
      let valueB = b[window.currentSortBy];

      if (window.currentSortBy === "fødselsdato") {
        valueA = transformDateFormat(a[window.currentSortBy]);
        valueB = transformDateFormat(b[window.currentSortBy]);
      }

      if (valueA === undefined || valueB === undefined) {
        return 0; // Værdier er ikke defineret, behandles som ens
      }

      if (window.currentSortBy === "fornavn") {
        valueA = valueA.toString().toLowerCase();
        valueB = valueB.toString().toLowerCase();
      }

      if (window.currentSortOrder === "asc") {
        return valueA.localeCompare(valueB, "en", { numeric: true }) || 0;
      } else {
        return valueB.localeCompare(valueA, "en", { numeric: true }) || 0;
      }
    });

    // Kalder showData med den sorteret data på den aktuelle side
    showData(window.allData, window.currentPage);
  }
}

// Funktion til at udfylde et tal med et foranstillet nul, hvis det er mindre end 10
function padNumber(number) {
  return number < 10 ? "0" + number : number;
}

// Funktion til at omdanne datoformatet fra "MM/DD/ÅÅÅÅ" til "ÅÅÅÅ/MM/DD"
function transformDateFormat(dateString) {
  if (!dateString) {
    return '';
  }

  const parts = dateString.split("/");
  const year = parts[2];
  const month = padNumber(parseInt(parts[0], 10));
  const day = padNumber(parseInt(parts[1], 10));
  return `${year}/${month}/${day}`;
}


// Funktion til at vise data i visningen
function showData(data, page = 1) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  // Her filtrerer vi data for den aktuelle side
  const pageData = data.slice(start, end);

  const dataView = document.getElementById('dataDisplay');
  dataView.innerHTML = '';

  pageData.forEach((item) => {
    const dataRow = document.createElement('div');
    dataRow.classList.add('data-row');

    const relevantKeys = ['fornavn', 'efternavn', 'fødselsdato', 'indmeldelsesdato'];
    relevantKeys.forEach((key) => {
      const dataCell = document.createElement('div');
      dataCell.classList.add('data-cell');
      dataCell.innerText = item[key];
      dataRow.appendChild(dataCell);
    });

    dataRow.appendChild(createButtonContainer(item));
    dataView.appendChild(dataRow);
  });
}


// Funktion til at vise data for den foregående side
function previousPage(data) {
  window.currentPage--;
  if (window.currentPage < 1) window.currentPage = 1;
  showData(data, window.currentPage);
}

// Funktion til at vise data for den næste side
function nextPage(data) {
  window.currentPage++;
  showData(data, window.currentPage);
}

export {sortData, padNumber, transformDateFormat, showData, previousPage, nextPage};