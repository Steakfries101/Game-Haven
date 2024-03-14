import * as iconGenerator from "/components/storeIconGenerator.js";
import { textDecider } from "/components/gameTextButtonCreator.js";
import { adjustPadding } from "./components/utils/adjustPadding.js";
import { search } from "./components/search.js";
import { buildGame } from "./components/buildGameItem.js";
// import { backToTopCreate } from "./components/utils/backToTopCreate.js";

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
const youtubeKey = "AIzaSyCsEU3Fe6wNACeFTvZQgKA46QnreQL12NI";

//RAWG API
const baseUrl = "https://api.rawg.io/api/games";
const apiKey = "?key=eb297cab936749b380d022a9e1f0c9f1";

let searchButt = document.querySelector(".search-button");
searchButt.addEventListener("click", search);
export let gameList = document.querySelector(".game-list");

//Stops the form from submitting (refreshing ) each time a search is made
document.getElementById("noRefreshForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

async function fetchYoutubeTrailer(gameName) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&maxResults=1&q=${gameName} game trailer&key=${youtubeKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch youtube data");
    }
    const youtubeData = await response.json();
    const videos = youtubeData.items;
    // console.log(youtubeData);
    return videos;
  } catch (error) {
    console.error("Error fetching youtube data");
  }
}

async function fetchYoutubePlaylist(gameName) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${gameName} intitle:ost|intitle:soundtrack &type=playlist&key=AIzaSyCsEU3Fe6wNACeFTvZQgKA46QnreQL12NI`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch youtube playlist data");
    }
    const youtubeData = await response.json();
    const videos = youtubeData.items;
    return videos;
  } catch (error) {
    console.error("Error fetching youtube playlist data");
  }
}

//Get the game data
async function fetchGameData(gameName) {
  try {
    const response = await fetch(
      `${baseUrl}${apiKey}&search=${gameName}&search_exact=true&ordering=name?parent_platforms=1`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch game data");
    }

    const data = await response.json();
    const games = data.results;
    return games;
  } catch (error) {
    console.error("Error fetching game data", error);
  }
}
//Get the game descriptions
export async function getGameDescription(gameId) {
  try {
    const response = await fetch(`${baseUrl}/${gameId}${apiKey}`);
    if (!response.ok) {
      throw new Error("Failed to fetch game desc data");
    }
    const data = await response.json();
    return data.description;
  } catch (error) {
    console.error("Error fetching game descriptions ERROR: ", error);
  }
}

//Get stores for each game based on game id
export async function getGameStores(gameId) {
  try {
    const response = await fetch(`${baseUrl}/${gameId}/stores${apiKey}`);

    if (!response.ok) {
      throw new Error("Failed to fetch game stores data");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching game stores data ERROR: ", error);
  }
}

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
  const playList = playlistData[0].id.playlistId;
  if (!playList) {
    alert("No soundtrack found");
  } else {
    window.open(`//www.youtube.com/playlist?list=${playlistData[0].id.playlistId}`);
  }
}

async function getTrailer(gameName) {
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
