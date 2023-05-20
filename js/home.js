// home.js

window.onload = function() {
  const homeSection = document.getElementById('home');
  homeSection.innerHTML = `
    <img class="logo" src="./images/dolphin.png" alt="Dolphin logo">
    <div class="home-content">
      <h2 class="welcome">Welcome to</h2>
      <h1 class="club-name">The Dolphine Swimming Club</h1>
      <p class="subtext">We are thrilled to have you as a member of our club.</p>
      <p class="subtext">Enjoy your swimming experience!</p>
    </div>
  `;
}
