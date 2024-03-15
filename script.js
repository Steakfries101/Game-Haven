import { adjustPadding } from "./components/adjustPadding.js";
import { search } from "./components/search.js";
import { buildGame } from "./components/utils/buildGameItem.js";
import { fetchGameData } from "./components/utils/fetchGameData.js";
import { toTopHider } from "./components/toTopLink.js";
import { gameList } from "./components/utils/buildGameItem.js";

const searchButt = document.querySelector(".search-button");

searchButt.addEventListener("click", search);
window.addEventListener("scroll", toTopHider);
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search");
  if (searchQuery) {
    document.querySelector(".search-bar").value = searchQuery; // corrected
    search();
  }
});

//Beginning of loop that loops through returned data games and builds javascript
export async function loopData(gameName) {
  const gameData = await fetchGameData(gameName);
  const error = document.createElement("h2");
  error.className = "search-display";
  error.textContent = searchDisplay(gameData);
  gameList.appendChild(error);
  //Check if data returned from search query
  if (gameData) {
    gameData.forEach(async (game) => {
      buildGame(game, gameList);
    });
    adjustPadding(gameData);
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
