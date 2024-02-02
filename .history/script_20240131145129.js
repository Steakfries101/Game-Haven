let searchButton = document.querySelector(".search-button");
const introList = document.getElementById("intro");

searchButton.addEventListener("click", () => {
  const searchText = document.querySelector(".search-bar").value.trim();

  if (searchText) {
    const h2 = document.createElement("h1");
    h2.textContent = searchText;
    h2.classList.add("game-desc");
    introList.appendChild(h2);
  }
});

