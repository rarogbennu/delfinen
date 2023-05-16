// home.js

window.onload = function() {
  const homeSection = document.getElementById('home');
  homeSection.innerHTML = `
    <div class="home-content">
      <img class="logo" src="./images/dolphin.png" alt="Dolphin logo">
      <h2>Welcome to the Dolphin Swimming Club</h2>
    <p>We are thrilled to have you as a member of our club. Enjoy your swimming experience!</p>
  `;
}
