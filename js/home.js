// home.js

window.onload = function() {
  const homeSection = document.getElementById('home');
  homeSection.innerHTML = `
<img class="logo" src="./images/dolphin.png" alt="Dolphin logo">
<div class="home-content">
  <h2 class="welcome">Velkommen til</h2>
  <h1 class="club-name">Dolphine Svømmeklubben</h1>
  <p class="subtext">Vi er glade for at have dig som medlem af vores klub.</p>
  <p class="subtext">Nyd din svømmeoplevelse!</p>
</div>
  `;
}
