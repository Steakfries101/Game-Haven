let search = document.querySelector(".search-button");



const 

function duh() {
  let search = document.querySelector(".search-bar").value;
  let list = document.getElementById("intro");
  let h2 = document.createElement("h1");
  h2.textContent = search;
  h2.classList = "game-desc"; // Remove the dot before "game-desc"
  list.appendChild(h2);
}
search.addEventListener("click", duh);
