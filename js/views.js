function initViews() {
    console.log("initViews");
    window.addEventListener("hashchange", changeView);
    changeView();
}

function changeView() {
    let hashLink = "#home";

    if (location.hash) {
        hashLink = location.hash;
    }

    hideViews();

    document.querySelector(hashLink).classList.add("active");
    setActiveLink(hashLink);
}

function setActiveLink(view) {
    const link = document.querySelector(`a.show-link[href="${view}"]`);
    if (link) {
        link.classList.add("active");
    }
}

function hideViews() {
    document.querySelectorAll(".show-content").forEach(link => link.classList.remove("active"));
    document.querySelectorAll(".show-link").forEach(link => link.classList.remove("active"));
}

export {initViews};