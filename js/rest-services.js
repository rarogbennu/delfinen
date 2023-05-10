// Henter data fra JSON fil
async function hentData() {
  const response = await fetch("data.json");
  const data = await response.json();
  const medlemmer = data.medlemmer;

  if (Array.isArray(medlemmer)) {
    visData(medlemmer.slice(0, 24));
  }
}