import { adjustPadding } from "./components/adjustPadding.js";
import { search } from "./components/search.js";
import { buildGame } from "./components/utils/buildGameItem.js";
import { fetchGameData } from "./components/utils/fetchGameData.js";

let searchButt = document.querySelector(".search-button");
searchButt.addEventListener("click", search);

window.addEventListener("scroll", () => {
  var scroll = window.scrollY;
  const toTop = document.getElementById("to-top");
  if (scroll < 1200) {
    toTop.className = "hide";
  } else {
    toTop.className = "show";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search");
  if (searchQuery) {
    document.querySelector(".search-bar").value = searchQuery; // corrected
    search();
  }
});

//YOUTUBE API

export let gameList = document.querySelector(".game-list");
//Stops the form from submitting (refreshing ) each time a search is made
document.getElementById("noRefreshForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

//Beginning of loop that loops through returned data games and builds javascript
export async function loopData(gameName) {
  const gameData = await fetchGameData(gameName);
  const gameList = document.querySelector(".game-list");
  const error = document.createElement("h2");
  error.className = "search-display";
  error.textContent = searchDisplay(gameData);
  gameList.appendChild(error);
  //Check if data returned from search query
  if (gameData) {
    gameData.forEach(async (game) => {
      buildGame(game, gameList);
    });
    adjustPadding(gameData, gameList);
  } else {
    return;
  }
}
export function getSearchValue() {
  const value = document.querySelector(".search-bar").value;
  return value;
}
function searchDisplay(data) {
  if (data == "") {
    return `No game by the name of ${getSearchValue()}`;
  } else {
    return `Showing results for ${getSearchValue()}`;
  }
}
