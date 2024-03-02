import * as iconGenerator from "/components/storeIconGenerator.js";
import { textDecider } from "/components/gameTextButtonCreator.js";

//YOUTUBE API
const youtubeKey = "AIzaSyCsEU3Fe6wNACeFTvZQgKA46QnreQL12NI";

//RAWG API
const baseUrl = "https://api.rawg.io/api/games";
const apiKey = "?key=eb297cab936749b380d022a9e1f0c9f1";

let searchButt = document.querySelector(".search-button");
searchButt.addEventListener("click", search);
let gameList = document.querySelector(".game-list");

//Stops the form from submitting (refreshing ) each time a search is made
document.getElementById("noRefreshForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

async function fetchYoutubeTrailer(gameName) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&maxResults=1&q=${gameName} trailer&key=AIzaSyCsEU3Fe6wNACeFTvZQgKA46QnreQL12NI`
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
      // https://www.googleapis.com/youtube/v3/search?q=your_search_query&part=snippet&maxResults=10&type=playlist&key=YOUR_API_KEY

      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${gameName} OST &type=playlist&key=AIzaSyCsEU3Fe6wNACeFTvZQgKA46QnreQL12NI`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch youtube playlist data");
    }
    const youtubeData = await response.json();
    const videos = youtubeData.items;
    // console.log(youtubeData);
    return videos;
  } catch (error) {
    console.error("Error fetching youtube playlist data");
  }
}

//Get the game data
async function fetchGameData(gameName) {
  try {
    const response = await fetch(`${baseUrl}${apiKey}&search=${gameName}&search_exact=true&ordering=name?parent_platforms=1`);
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
async function getGameDescription(gameId) {
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
async function getGameStores(gameId) {
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
async function loopData(gameName) {
  const gameData = await fetchGameData(gameName);
  const gameList = document.querySelector(".game-list");

  const error = document.createElement("h2");
  error.className = "search-display";
  error.textContent = searchDisplay(gameData);
  gameList.appendChild(error);

  //Check if data returned from search query

  //If data is there this checks each games storefronts to confirm it has one of the following as a store (5,1,2,11)
  gameData.forEach(async (game) => {
    // console.log(game);

    if (game.stores !== null) {
      await backToTopCreate(gameList);

      const includesStore = game.stores.some(
        (store) => store.store.id === 5 || store.store.id === 1 || store.store.id === 2 || store.store.id === 11
      );
      if (!includesStore) {
        return;
      }
      console.log(game.name);
      const text = await getGameDescription(game.id);

      const gameItem = document.createElement("li");
      gameItem.className = "game-item";
      gameList.appendChild(gameItem);

      const gameInfo = document.createElement("article");
      gameInfo.className = "game-data";
      gameItem.appendChild(gameInfo);

      const gameCover = document.createElement("img");
      gameCover.src = game.background_image;
      gameCover.alt = `Game image of ${game.name}`;
      gameCover.className = "game-cover";
      gameInfo.appendChild(gameCover);

      const gameDesc = document.createElement("div");
      gameDesc.className = "game-desc";
      gameInfo.appendChild(gameDesc);

      const storeFronts = document.createElement("div");
      storeFronts.className = "store-fronts";

      const gameTitle = document.createElement("h2");
      gameTitle.textContent = game.name;
      gameDesc.appendChild(gameTitle);

      const clickables = document.createElement("div");
      clickables.className = "clickables-container";

      gameDesc.appendChild(clickables);
      const linkContainer = document.createElement("div");
      linkContainer.className = "link-container";
      gameDesc.appendChild(linkContainer);

      const trailerLink = document.createElement("p");
      trailerLink.className = "trailer-ost-links";
      trailerLink.textContent = "Trailer";
      trailerLink.addEventListener("click", () => {
        getTrailer();
      });
      linkContainer.appendChild(trailerLink);

      const soundtrackLink = document.createElement("p");
      soundtrackLink.textContent = "Soundtrack";
      soundtrackLink.className = "trailer-ost-links";
      linkContainer.appendChild(soundtrackLink);
      soundtrackLink.addEventListener("click", () => {
        getPlaylist();
      });

      clickables.appendChild(linkContainer);

      textDecider(text, gameDesc, storeFronts, clickables);

      async function getTrailer() {
        let gameRename = "";
        if (!game.name.includes("1")) {
          gameRename = game.name + " 1";
        } else {
          gameRename = game.name;
        }
        const trailerData = await fetchYoutubeTrailer(gameRename);

        const videoId = trailerData[0].id.videoId;
        window.open(`https://www.youtube.com/watch?v=${videoId}`);
      }

      async function getPlaylist() {
        // const playlistData = await fetchYoutubePlaylist(game.name);
        // // console.log(game.name);
        // const playList = playlistData[0].id.playlistId;

        // if (!playList) {
        //   alert("No soundtrack found");
        // } else {
        //   window.open(`//www.youtube.com/playlist?list=${playlistData[0].id.playlistId}`);
        console.log(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${game.name} OST &type=playlist&key=AIzaSyCsEU3Fe6wNACeFTvZQgKA46QnreQL12NI`
        );
      }
      adjustPadding(gameList);
      //-----------------STOREFRONT LOGO CODE-----------------//

      const stores = await getGameStores(game.id);
      stores.forEach((store) => {
        switch (store.store_id) {
          case 1:
            iconGenerator.createSteam(store, storeFronts);
            break;
          case 5:
            iconGenerator.createGOG(store, storeFronts);
            break;
          case 11:
            iconGenerator.createEpicGames(store, storeFronts);
            break;
          case 2:
            iconGenerator.createXboxStore(store, storeFronts);
            break;
        }
      });
    }
  });
}

function getSearchValue() {
  const value = document.querySelector(".search-bar").value;
  return value;
}

function search() {
  gameList.innerHTML = "";
  if (!getSearchValue()) {
    alert("Please Enter A Game Name!");
    return;
  } else {
    loopData(getSearchValue());
  }
}

function searchDisplay(data) {
  if (data == "") {
    return `No game by the name of ${getSearchValue()}`;
  } else {
    return `Showing results for ${getSearchValue()}`;
  }
}

//**********************************************************THIS PUTS STOREFRONT ICONS INBETWEEN TITLE AND TEXT */

function adjustPadding(gameList) {
  if (gameList.children.length > 0) {
    gameList.style.paddingBottom = "200px";
  } else {
    gameList.style.padding = "0";
  }
}

//Create back to top button
async function backToTopCreate(gameList) {
  const toTopElement = document.querySelector(".to-top");
  toTopElement.style.display = "block";

  if (gameList.children.length > 1) {
    toTopElement.style.display = "block";
  } else {
    toTopElement.style.display = "none";
  }
  console.log(gameList.children.length);
}
