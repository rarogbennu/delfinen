<<<<<<< HEAD
import { displayData } from "./script.js";
=======
import { showData } from "./script.js";
>>>>>>> 1b3497e72a07e3dde9dcb3502875d5b1a974ec6b

// Henter data fra JSON fil
async function getData() {
  const response = await fetch("data.json");
  const data = await response.json();
  const medlemmer = data.medlemmer;

  if (Array.isArray(medlemmer)) {
<<<<<<< HEAD
    displayData(medlemmer.slice(0, 24));
=======
    showData(medlemmer.slice(0, 24));
>>>>>>> 1b3497e72a07e3dde9dcb3502875d5b1a974ec6b
  }
}

export {getData}