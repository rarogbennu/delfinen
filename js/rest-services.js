import { showData } from "./script.js";

// Henter data fra JSON fil
async function getData() {
  const response = await fetch("data.json");
  const data = await response.json();
  const medlemmer = data.medlemmer;

  if (Array.isArray(medlemmer)) {
    showData(medlemmer.slice(0, 24));
  }
}

export {getData}