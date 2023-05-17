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
}

function displayUserInfo() {
    document.querySelector("#profile .mail").textContent = localStorage.getItem("authUser");
}

function userIsSignedOut() {
    location.hash = "#signin";
    document.querySelector("nav").classList.add("hide");
}

function signIn(event) {
    event.preventDefault();
    const mail = event.target.mail.value;
    const password = event.target.password.value;

    if (mail === "race@kea.dk" && password === "test123") {
        localStorage.setItem("authUser", mail);
        document.querySelector("#signin-message").textContent = "";

        userIsSignedIn();
    } else {
        document.querySelector("#signin-message").textContent = "Wrong mail and/or password";
    }
}

function signOutUser() {
    localStorage.removeItem("authUser");
    userIsSignedOut();
}

export { initAuth, signIn, signOutUser };
