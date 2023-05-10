"use strict"

const endpoint = "https://delfinen-724e2-default-rtdb.europe-west1.firebasedatabase.app/";

async function getMedlemData() {
    const response = await fetch (`${endpoint}/medlemmer.json`);
    const medlemData = await response.json();
    const medlemmer = prepareMedlemData(medlemData);
    return medlemmer;
}

async function getResultatData() {
    const response = await fetch (`${endpoint}/resultater.json`);
    const resultatData = await response.json();
    const resultater = prepareResultaterData(resultatData);
    return resultater;
}

async function createMedlem() {

}

async function updateMedlem() {

}

async function deleteMedlem() {

}

async function createResultat() {

}

async function updateResultat() {

}

async function deleteResultat() {

}

export {getMedlemData, getResultatData, createMedlem, updateMedlem, deleteMedlem, createResultat, updateResultat, deleteResultat}