import * as iconGenerator from "/components/storeIconGenerator.js"
import { textDecider } from "/components/gameTextButtonCreator.js";

//YOUTUBE API 
const youtubeKey = "AIzaSyCsEU3Fe6wNACeFTvZQgKA46QnreQL12NI"

//RAWG API
const baseUrl = "https://api.rawg.io/api/games/";
const apiKey = "?key=652dc6a240454ec7a98d610a0041a14e";


let searchButt = document.querySelector(".search-button");
searchButt.addEventListener("click", search);
let gameList = document.querySelector(".game-list");

//Stops the form from submitting (refreshing ) each time a search is made
document.getElementById("noRefreshForm").addEventListener("submit", (e) => {
  e.preventDefault();
});


async function fetchYoutube(gameName){
  try{
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${gameName} game trailer&key=AIzaSyCsEU3Fe6wNACeFTvZQgKA46QnreQL12NI`
    );if (!response.ok){
      throw new Error("Failed to fetch youtube data")
    }
    const youtubeData = await response.json();
    const videos= youtubeData.items;
    return videos;
  }catch (error){
    console.error("Error fetching youtube data")
  }
  
  }

//Get the game data
async function fetchGameData(gameName) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=652dc6a240454ec7a98d610a0041a14e&search=${gameName}&ordering=name?parent_platforms=1?search_exact=true`
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
async function getGameDescription(gameId) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=652dc6a240454ec7a98d610a0041a14e`
    );
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
    const response = await fetch(
      `https://api.rawg.io/api/games/${gameId}/stores?key=652dc6a240454ec7a98d610a0041a14e`
    );

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
      const includesStore = game.stores.some(
        (store) =>
          store.store.id === 5 ||
          store.store.id === 1 ||
          store.store.id === 2 ||
          store.store.id === 11
      );
      if (!includesStore) {
        return;
      }

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

      const linkContainer = document.createElement("div")
      linkContainer.className = "link-container"
      gameDesc.appendChild(linkContainer)

      const test = document.createElement("p")
      test.textContent = "Trailer"
      linkContainer.appendChild(test)
     
      const test1 = document.createElement("p")
      test1.textContent = "OST"
      linkContainer.appendChild(test1)

      storeFronts.appendChild(linkContainer)

      textDecider(text, gameDesc,storeFronts);



//////////////////////////////////////////*****************************WORK ON THIS */
      
      const youtubeData = await fetchYoutube(game.slug)
      youtubeData.forEach(async(trailer)=>{
        const trailerUrl = `youtube.ca/watch=${trailer.id}`
        // gameDesc.appendChild(trailerUrl)
console.log(youtubeData[0].id.videoId)
        //TO DO 
        // FINISH TRAILERURL AND USE IT TO CREATE URL 
      })


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
