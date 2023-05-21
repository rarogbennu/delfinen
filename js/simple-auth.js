function initAuth() {
    const user = localStorage.getItem("authUser");

    if (user) {
        userIsSignedIn();
    } else {
        userIsSignedOut();
    }
}

function userIsSignedIn() {
    location.hash = "#home";
    document.querySelector("nav").classList.remove("hide");
    displayUserInfo();
    // Vis sign-out knappen
    document.getElementById('btn-sign-out').classList.add('show');
    // Skjul sign-in formularen
    document.querySelector('#signin').style.display = 'none';

    // Hent brugerens rolle
    const userRole = localStorage.getItem("userRole");

    // Hent elementerne der skal skjules for 'viewer' rollen
    const opretMedlemButton = document.getElementById('btn-create-medlem');
    const opretResultatButton = document.getElementById('btn-create-resultat');

    if (userRole === "admin" || userRole === "editor") {
        // Hvis brugeren er admin eller editor, vis knapperne
        if (opretMedlemButton) {
            opretMedlemButton.style.display = "";
        }
        if (opretResultatButton) {
            opretResultatButton.style.display = "";
        }
    } else {
        // Hvis brugeren er en viewer, skjul knapperne
        if (opretMedlemButton) {
            opretMedlemButton.style.display = "none";
        }
        if (opretResultatButton) {
            opretResultatButton.style.display = "none";
        }
    }
}


function userIsSignedOut() {
    location.hash = "#signin";
    document.querySelector("nav").classList.add("hide");
    // Skjul sign-out knappen
    document.getElementById('btn-sign-out').classList.remove('show');

     // Vis sign-in formularen
    document.querySelector('#signin').style.display = 'flex';

}

function displayUserInfo() {
    let userElement = document.querySelector("#profile .mail");
    console.log(userElement); // dette skal logge elementet, eller null hvis det ikke findes
    if (userElement) {
        userElement.textContent = localStorage.getItem("authUser");
    }
}



let users = [
    {
        mail: "formand@mail.com", 
        password: "password1",
        role: "admin" // Kan gøre alt
    }, 
    {
        mail: "træner@mail.com", 
        password: "password2",
        role: "editor" // Kan redigere nogle ting. lige nu kan den også alt
    }, 
    {
        mail: "kasserer@mail.com", 
        password: "password3",
        role: "viewer" // Kan kun se men ikke redigere
    }
];

// Tjek om brugeren er logget ind når vinduet indlæses
window.onload = initAuth;

// Toggle Password funktionalitet
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password-input');

togglePassword.addEventListener('click', function (e) {
  // Skift typen attribut
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  // Skift ikonet til øje eller øje-slash
  this.classList.toggle('fa-eye-slash');
});

// Sign In funktion
function signIn(event) {
  event.preventDefault();

  const mail = event.target.mail.value;
  const password = event.target.password.value;

  const user = users.find(user => user.mail === mail && user.password === password);

  if (user) {
    localStorage.setItem('authUser', mail);
    localStorage.setItem('userRole', user.role);
    document.querySelector('#signin-message').textContent = '';

    userIsSignedIn();

    // Skjul sign-in formularen
    document.querySelector('#signin').style.display = 'none';
  } else {
    document.querySelector('#signin-message').textContent = 'Forkert mail og/eller kodeord';
  }
}


// Senere, når der skal tjekkes om en bruger kan udføre en handling eller se en side
function userCanSeePage() {
    const userRole = localStorage.getItem("userRole");
    
    if (userRole === "admin" || userRole === "editor") {
        // Brugeren er en admin eller editor og kan se siden
    } else {
        // Brugeren kan ikke se siden
    }
}

// Ved logud skal brugerens rolle også fjernes
function signOutUser() {
    
    localStorage.removeItem("authUser");
    localStorage.removeItem("userRole");
    
    // Vis sign-in formularen
    document.querySelector('#signin').style.display = 'flex'; // Eller 'block' eller hvad det var til at starte med
    
    userIsSignedOut();
}

export { initAuth, signIn, signOutUser };
