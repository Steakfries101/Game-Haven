let searchButton = document.querySelector(".search-button");

function duh() {
  let search = document.querySelector(".search-bar").value;
  let list = document.getElementById("intro");
  let h2 = document.createElement("h1");
  h2.textContent = search;
  h2.classList = "game-desc"; // Remove the dot before "game-desc"
  list.appendChild(h2);
}
search.addEventListener("click", duh);

// Selecting elements
const searchButton = document.querySelector(".search-button");
const searchBar = document.querySelector(".search-bar");
const introList = document.getElementById("intro");

// Function to handle search
function handleSearch() {
  const searchText = searchBar.value;

  if (searchText) {
    const h2 = document.createElement("h1");
    h2.textContent = searchText;
    h2.classList.add("game-desc"); // Use add method for adding classes
    introList.appendChild(h2);
  }
}

// Adding event listener
searchButton.addEventListener("click", handleSearch);
