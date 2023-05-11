import { showData } from "./script.js";
import { prepareData } from "./helpers.js";

const endpoint = "https://delfinen-724e2-default-rtdb.europe-west1.firebasedatabase.app/";

// Get and prepare data (tilføj ID til hver post, vigtigt!)

async function getMedlemData() {
    const response = await fetch (`${endpoint}/medlemmer.json`);
    const medlemData = await response.json();
    const medlemmer = prepareData(medlemData);
    return medlemmer;
}

// Get resultat data når vi når dertil (husk at eksporter)

// async function getResultatData() {
//     const response = await fetch (`${endpoint}/resultater.json`);
//     const resultatData = await response.json();
//     const resultater = prepareData(resultatData);
//     return resultater;
// }

// Henter data fra JSON fil (igen??)
async function getData() {
  const response = await fetch("data.json");
  const data = await response.json();
  const medlemmer = data.medlemmer;
  const item = prepareData(medlemmer)
  

  if (Array.isArray(medlemmer)) {
    showData(medlemmer.slice(0, 24));
  }

  return item;
}

// Create, update, delete

async function updateMedlem(id, fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato ) {
  const medlemToUpdate = { fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato }; // post update to update
  const json = JSON.stringify(medlemToUpdate);

  const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
      method: "PUT",
      body: json
  });

  if (response.ok) {
      console.log("Medlem succesfully updated in Firebase 🔥");
      // updateMedlemmerList();
  }
}

async function deleteMedlem(id){
    const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
      method: "DELETE"
  });
  if (response.ok) {
      console.log("Medlem succesfully deleted from Firebase 🔥");
      // updateMedlemmerList();
  }
}


export {getData, getMedlemData, updateMedlem, deleteMedlem}