"use strict"

import { prepareData } from "./helpers.js";

const endpoint = "https://delfinen-724e2-default-rtdb.europe-west1.firebasedatabase.app/";

async function getMedlemData() {
    const response = await fetch (`${endpoint}/medlemmer.json`);
    const medlemData = await response.json();
    const medlemmer = prepareData(medlemData);
    return medlemmer;
}

async function getResultatData() {
    const response = await fetch (`${endpoint}/resultater.json`);
    const resultatData = await response.json();
    const resultater = prepareData(resultatData);
    return resultater;
}
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

export {getData, getMedlemData, getResultatData}