import { showData, updateMedlemTable, updateResultatTable } from "./script.js";
import { prepareData } from "./helpers.js";

const endpoint = "https://delfinen-724e2-default-rtdb.europe-west1.firebasedatabase.app";

// Henter data fra JSON-fil
async function getData() {
  const response = await fetch (`${endpoint}/medlemmer.json`);
  const data = await response.json();
  const medlemmer = prepareData(data); // ændret fra data.medlemmer til data

  return medlemmer; // returner medlemmer-data i stedet for udefineret element
}

// Henter resultat data fra JSON-fil
async function getResultatData() {
  const response = await fetch(`${endpoint}/resultater.json`);
  const resultatData = await response.json();
  const resultater = prepareData(resultatData);
  return resultater;
}


// Opret, opdater, slet medlemmer

async function createMedlem(fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato, kontingent, aldersgruppe) {
  const medlemToCreate = {fornavn, efternavn, fødselsdato, adresse, telefon, email, medlemstype, aktivitetsstatus, indmeldelsesdato, kontingent, aldersgruppe}; // create nyt medlem object
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

// Opret, opdater, slet resultater

async function createResultat(hold, disciplin, svømmerId, aktivitetstype, stævne, dato, placering, tid){;
  const resultatToCreate = {hold, disciplin, svømmerId, aktivitetstype, stævne, dato, placering, tid}
  const json = JSON.stringify(resultatToCreate);

  const response = await fetch(`${endpoint}/resultater.json`, {
    method: "POST",
    body: json
  });

  if (response.ok) {
    console.log("Resultat succesfully added to Firebase 🔥");
    updateResultatTable();
  }
}

async function updateResultat(hold, disciplin, svømmerId, aktivitetstype, stævne, dato, placering, tid) {
  const resultatToUpdate = {hold, disciplin, svømmerId, aktivitetstype, stævne, dato, placering, tid};
  const json = JSON.stringify(resultatToUpdate);

  const response = await fetch(`${endpoint}/resultater/${id}.json`, {
    method: "PUT",
    body: json
  });

  if (response.ok) {
    console.log("Resultat succesfully updated in Firebase");
    updateResultatTable();
  }
}


export {getData, getResultatData, createMedlem, updateMedlem, deleteMedlem, createResultat, updateResultat, endpoint}
