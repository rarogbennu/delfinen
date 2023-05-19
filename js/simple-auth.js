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
        mail: "formand@mail.dk", 
        password: "password1",
        role: "admin" // Kan gøre alt
    }, 
    {
        mail: "træner@mail.com", 
        password: "password2",
        role: "editor" // Kan redigere nogle ting
    }, 
    {
        mail: "kasserer@mail.com", 
        password: "password3",
        role: "viewer" // Kan kun se men ikke redigere
    }
];

function signIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;

    const user = users.find(user => user.mail === mail && user.password === password);

    if (user) {
        localStorage.setItem("authUser", mail);
        localStorage.setItem("userRole", user.role);
        document.querySelector("#signin-message").textContent = "";

        userIsSignedIn();
    } else {
        document.querySelector("#signin-message").textContent = "Wrong mail and/or password";
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
    userIsSignedOut();
}

export { initAuth, signIn, signOutUser };
