import { showData, updateMedlemTable } from "./script.js";
import { prepareData } from "./helpers.js";

const endpoint = "https://delfinen-724e2-default-rtdb.europe-west1.firebasedatabase.app";

// Henter data fra JSON-fil
async function getData() {
  const response = await fetch (`${endpoint}/medlemmer.json`);
  // console.log("Svar:", response); 
  const data = await response.json();
  // console.log("Analyseret JSON:", data);
  const medlemmer = prepareData(data); // ændret fra data.medlemmer til data

  return medlemmer; // returner medlemmer-data i stedet for udefineret element
}

// Henter resultat data fra JSON-fil
async function getResultatData() {
  const response = await fetch(`${endpoint}/resultater.json`);
  const resultatData = await response.json();
  const resultater = prepareData(resultatData);
  console.log("Analyseret JSON resultater:", resultatData);
  return resultater;
}


// Opret, opdater, slet medlemmer

async function createMedlem(fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato, kontingent, aldersgruppe) {
  const medlemToCreate = {fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato, kontingent, aldersgruppe}; // create new post object
  const json = JSON.stringify(medlemToCreate);

  const response = await fetch(`${endpoint}/medlemmer.json`, {
      method: "POST",
      body: json
  });
  if (response.ok) {
      updateMedlemTable();
      const jsonResult = await response.json();
      const id = jsonResult.name;
      console.log("New medlem succesfully added to Firebase 🔥");

      console.log("Nyt id: " + id);

      const lastCreatedMedlemEndpoint = await fetch (`${endpoint}/medlemmer/${id}.json`);
      const lastCreatedMedlem = await lastCreatedMedlemEndpoint.json();
      console.log(lastCreatedMedlem)
      return lastCreatedMedlem;
      
  }
}

async function updateMedlem(id, fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato, kontingent, aldersgruppe) {
  const medlemToUpdate = {fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato, kontingent, aldersgruppe}; // post update to update
  const json = JSON.stringify(medlemToUpdate);

  const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
      method: "PUT",
      body: json
  });

  if (response.ok) {
      console.log("Medlem succesfully updated in Firebase 🔥");
      updateMedlemTable();

  }
}

async function deleteMedlem(id){
    const response = await fetch(`${endpoint}/medlemmer/${id}.json`, {
      method: "DELETE"
  });
  if (response.ok) {
      console.log("Medlem succesfully deleted from Firebase 🔥");
      updateMedlemTable();

  }
}

// Opret, opdater, slet medlemmer

export {getData, getResultatData, createMedlem, updateMedlem, deleteMedlem, endpoint}


// original getDatas: hvis noget går galt, aktiver getMedlemData og eksporter

// Get and prepare data (tilføj ID til hver post, vigtigt!)

// async function getMedlemData() {
//     const response = await fetch (`${endpoint}/medlemmer.json`);
//     const medlemData = await response.json();
//     const medlemmer = prepareData(medlemData);
//     return medlemmer;
// }
