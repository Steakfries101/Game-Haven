import { adjustPadding } from "./components/utils/adjustPadding.js";
import { search } from "./components/search.js";
import { buildGame } from "./components/buildGameItem.js";
import {
  fetchGameData,
  fetchYoutubePlaylist,
  fetchYoutubeTrailer,
} from "./components/fetchGameData.js";

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
export const youtubeKey = "AIzaSyCsEU3Fe6wNACeFTvZQgKA46QnreQL12NI";

//RAWG API
export const baseUrl = "https://api.rawg.io/api/games";
export const apiKey = "?key=eb297cab936749b380d022a9e1f0c9f1";

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
export async function getPlaylist(gameName) {
  const encodePlaylist = encodeURIComponent(gameName);
  const playlistData = await fetchYoutubePlaylist(encodePlaylist);
  const playListId = playlistData[0].id.playlistId;
  if (playListId) {
    window.open(`//www.youtube.com/playlist?list=${playlistData[0].id.playlistId}`);
  } else {
    alert("No soundtrack found");
  }
}
export async function getTrailer(gameName) {
  let gameRename = "";
  if (!gameName.includes("1")) {
    gameRename = gameName + " 1";
  } else {
    gameRename = gameName;
  }
  const encodeTrailer = encodeURIComponent(gameRename);
  const trailerData = await fetchYoutubeTrailer(encodeTrailer);
  const videoId = trailerData[0].id.videoId;
  window.open(`https://www.youtube.com/watch?v=${videoId}`);
}
