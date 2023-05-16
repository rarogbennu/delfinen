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
      
      if (key === 'fødselsdato' || key === 'indmeldelsesdato') {
        dataCell.innerText = transformDateFormat(item[key]);
      } else {
        dataCell.innerText = item[key];
      }
      
      dataRow.appendChild(dataCell);
    });

    dataRow.appendChild(createButtonContainer(item));
    dataView.appendChild(dataRow);
  });
}

function transformDateFormat(dateString) {
  const parts = dateString.split("-");
  const day = parts[2];
  const month = parts[1];
  const year = parts[0];
  return `${day}/${month}/${year}`;
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

function calcAldersgruppe(fødselsdatoinput) {
  const today = new Date();
  const fødselsdato = new Date(fødselsdatoinput)

  let age = today.getFullYear() - fødselsdato.getFullYear();
  const months = today.getMonth() - fødselsdato.getMonth();
  const days = today.getDate() - fødselsdato.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    age--;
  }

  let category;
  if (age < 18) {
    return "junior";
  } else {
    return "senior";
  }
}

function calcAge(fødselsdatoinput) {
  const today = new Date();
  const fødselsdato = new Date(fødselsdatoinput)

  let age = today.getFullYear() - fødselsdato.getFullYear();
  const months = today.getMonth() - fødselsdato.getMonth();
  const days = today.getDate() - fødselsdato.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    age--;
  }

  return {age};
}

function calcKontingent(fødselsdato, aktivitetsstatus) {

const ageObject = calcAge(fødselsdato);
const age = ageObject.age;

  if (aktivitetsstatus === "passiv") {
    return 500  
  } else if (aktivitetsstatus === "aktiv" && age < 18) {
    return 1000
  } else if (aktivitetsstatus === "aktiv" && age >= 60) {
    return 1200
  } else { 
    return 1600
  }

}


export {sortData, showData, previousPage, nextPage, calcAge, calcAldersgruppe, calcKontingent};