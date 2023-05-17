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
  hidePaginationButtons();

  document.querySelector(hashLink).classList.add("active");
  setActiveLink(hashLink);

  if (hashLink === "#medlemmer") {
    showPaginationButtons();
  }
  else if (hashLink === "#opret-medlem") {
    console.log("#opret-medlem")
  }
  else if (hashLink === "#resultat") {
    console.log("#resultat")
  }
  else if (hashLink === "#kontingent") {
    console.log("#kontingent")
  }
}


function hidePaginationButtons() {
    const paginationButtons = document.querySelectorAll(".page-buttons");
    paginationButtons.forEach(button => {
        button.style.display = "none";
    });
}

function showPaginationButtons() {
    const paginationButtons = document.querySelectorAll(".page-buttons");
    paginationButtons.forEach(button => {
        button.style.display = "block";
    });
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