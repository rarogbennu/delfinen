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
    // Show the sign-out button
    document.getElementById('btn-sign-out').classList.add('show');
    // Hide the sign-in form
    document.querySelector('#signin').style.display = 'none';

    // Get user's role
    const userRole = localStorage.getItem("userRole");

    // Get the elements that should be hidden for 'viewer' role
    const opretMedlemButton = document.getElementById('btn-create-medlem');
    const opretResultatButton = document.getElementById('btn-create-resultat');

    if (userRole === "admin" || userRole === "editor") {
        // If the user is an admin or editor, show the buttons
        if (opretMedlemButton) {
            opretMedlemButton.style.display = "";
        }
        if (opretResultatButton) {
            opretResultatButton.style.display = "";
        }
    } else {
        // If the user is a viewer, hide the buttons
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
    // Hide the sign-out button
    document.getElementById('btn-sign-out').classList.remove('show');

     // Show the sign-in form
    document.querySelector('#signin').style.display = 'flex';

}

function displayUserInfo() {
    let userElement = document.querySelector("#profile .mail");
    console.log(userElement); // this should log the element, or null if it doesn't exist
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

// Check if user is signed in when the window loads
window.onload = initAuth;

// Toggle Password functionality
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password-input');

togglePassword.addEventListener('click', function (e) {
  // Toggle the type attribute
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  // Toggle the eye slash icon
  this.classList.toggle('fa-eye-slash');
});

// Sign In function
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

    // Hide the sign-in form
    document.querySelector('#signin').style.display = 'none';
  } else {
    document.querySelector('#signin-message').textContent = 'Wrong mail and/or password';
  }
}


// Later, when checking if a user can perform an action or see a page
function userCanSeePage() {
    const userRole = localStorage.getItem("userRole");
    
    if (userRole === "admin" || userRole === "editor") {
        // The user is an admin or an editor and can see the page
    } else {
        // The user cannot see the page
    }
}

// On signout, make sure to also clear the user role
function signOutUser() {
    
    localStorage.removeItem("authUser");
    localStorage.removeItem("userRole");
    
    // Show the sign-in form
    document.querySelector('#signin').style.display = 'flex'; // Or 'block' or whatever it was initially
    
    userIsSignedOut();
}

export { initAuth, signIn, signOutUser };
