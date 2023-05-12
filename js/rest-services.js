import { showData } from "./script.js";
import { prepareData } from "./helpers.js";

const endpoint = "https://delfinen-724e2-default-rtdb.europe-west1.firebasedatabase.app";

// Hent og forbered data (tilføj ID til hver post, vigtigt!)
async function getMedlemData() {
    const response = await fetch (`${endpoint}/medlemmer.json`);
    const medlemData = await response.json();
    const medlemmer = prepareData(medlemData);
    return medlemmer;
}

// Hent resultatdata, når vi når dertil (husk at eksportere)
// async function getResultatData() {
//     const response = await fetch (`${endpoint}/resultater.json`);
//     const resultatData = await response.json();
//     const resultater = prepareData(resultatData);
//     return resultater;
// }

// Henter data fra JSON-fil (igen??)
async function getData() {
  const response = await fetch (`${endpoint}/medlemmer.json`);
  console.log("Svar:", response); 
  const data = await response.json();
  console.log("Analyseret JSON:", data);
  const medlemmer = prepareData(data); // ændret fra data.medlemmer til data

  if (Array.isArray(medlemmer)) {
    showData(medlemmer.slice(0, 24));
    return medlemmer; // returner medlemmer-data i stedet for udefineret element
  }
}

// Opret, opdater, slet

async function createMedlem(fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato) {
  const medlemToCreate = { fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato }; // create new post object
  const json = JSON.stringify(medlemToCreate);

  const response = await fetch(`${endpoint}/medlemmer.json`, {
      method: "POST",
      body: json
  });
  if (response.ok) {
      console.log("New medlem succesfully added to Firebase 🔥");
      // updateMedlemTable();
  }
}

async function updateMedlem(id, fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato ) {
  const medlemToUpdate = { fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato }; // post update to update
  const json = JSON.stringify(medlemToUpdate);

  const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
      method: "PUT",
      body: json
  });

  if (response.ok) {
      console.log("Medlem succesfully updated in Firebase 🔥");
      // updateMedlemTable();

  }
}

async function deleteMedlem(id){
    const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
      method: "DELETE"
  });
  if (response.ok) {
      console.log("Medlem succesfully deleted from Firebase 🔥");
      // updateMedlemTable();

  }
}




// original getDatas: hvis noget går galt, aktiver getMedlemData og eksporter

// Get and prepare data (tilføj ID til hver post, vigtigt!)

// async function getMedlemData() {
//     const response = await fetch (`${endpoint}/medlemmer.json`);
//     const medlemData = await response.json();
//     const medlemmer = prepareData(medlemData);
//     return medlemmer;
// }

// Get resultat data når vi når dertil (husk at eksporter)

// async function getResultatData() {
//     const response = await fetch (`${endpoint}/resultater.json`);
//     const resultatData = await response.json();
//     const resultater = prepareData(resultatData);
//     return resultater;
// }

export {getData, createMedlem, updateMedlem, deleteMedlem, endpoint}

