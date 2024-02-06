//RAWG API
const baseUrl = "https://api.rawg.io/api/games/";
const apiKey = "?key=652dc6a240454ec7a98d610a0041a14e";
//IGDB API

console.log(baseUrl + 54 + apiKey);

// fetchData(gameName);

//Get the game data
async function fetchGameData(gameName) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=652dc6a240454ec7a98d610a0041a14e&search=${gameName}&parent_platforms=1&search_precise=true`
  );

  const data = await response.json();
  const games = data.results;
  return games;
}

// async function fetchGameStoreData(gameId) {
//   const response = await fetch(
//     `https://api.rawg.io/api/games/${gameId}stores?key=652dc6a240454ec7a98d610a0041a14e`
//   );
//   const data = await response.json();
//   const stores = data.results;
//   console.log(stores.stores);
// }

// loopData("little big planet");

let search = document.querySelector(".search-button");
search.addEventListener("click", duh);
let gameList = document.querySelector(".game-list");

async function getGameDescription(gameId) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${gameId}?key=652dc6a240454ec7a98d610a0041a14e`
  );
  const data = await response.json();
  return data.description_raw;
}

async function getGameStores(gameId) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${gameId}/stores?key=652dc6a240454ec7a98d610a0041a14e`
  );
  const data = await response.json();

  return data.results;
}

async function loopData(gameName) {
  const gameData = await fetchGameData(gameName);
  const gameList = document.querySelector(".game-list");

  gameData.forEach(async (game) => {
    if (game.store_id !== null) {
      const includesStore = game.stores.some(
        (store) =>
          store.store.id === 5 ||
          store.store.id === 1 ||
          store.store.id === 2 ||
          // store.store.id === 9 ||
          store.store.id === 11
      );
      if (!includesStore) {
        return;
      }
      // getGameDescription(game.id);
      console.log(game.name);
      console.log(game);
      const gameItem = document.createElement("li");
      gameItem.className = "game-item";
      gameList.appendChild(gameItem);

      const gameInfo = document.createElement("article");
      gameInfo.className = "game-data";
      gameItem.appendChild(gameInfo);

      const gameCover = document.createElement("img");
      gameCover.src = game.background_image;
      gameCover.className = "game-cover";
      gameInfo.appendChild(gameCover);

      const storeFronts = document.createElement("div");
      storeFronts.className = "store-fronts";
      gameInfo.appendChild(storeFronts);

      const gameTitle = document.createElement("h2");
      gameTitle.textContent = game.name;
      storeFronts.appendChild(gameTitle);

      const gameDesc = document.createElement("div");
      gameDesc.className = "game-desc";
      gameInfo.appendChild(gameDesc);

      const description = document.createElement("p");
      const content = await getGameDescription(game.id);
      description.textContent = content;
      gameDesc.appendChild(description);

      //-----------------STORE FRONT LOGO CODE-----------------//

      const stores = await getGameStores(game.id);
      stores.forEach((store) => {
        if (store.store_id === 1) {
          createSteam(store, storeFronts);
        } else if (store.store_id === 5) {
          createGOG(store, storeFronts);
          // } else if (store.store_id === 9) {
          //   createItch(store, storeFronts);
        } else if (store.store_id === 11) {
          createEpicGames(store, storeFronts);
        } else if (store.store_id === 2) {
          createXboxStore(store, storeFronts);
        }
      });
      // console.log(description);
      // const description = document.createElement("p");
      // description.textContent = getGameDescription(game.id);
      // // console.log(game.name);
    }
  });
}

function duh() {
  gameList.innerHTML = "";
  let search = document.querySelector(".search-bar").value;
  loopData(search);
}

//-----------------STORE FRONT LINKS + LOGO GENERATOR FUNCTIONS-----------------//
function createSteam(store, storeFronts) {
  const storeLink = document.createElement("a");
  const image = document.createElement("img");
  image.src = "assets/Steam_icon_logo.svg.png";
  storeLink.appendChild(image);
  storeLink.href = store.url;
  storeFronts.appendChild(storeLink);
}

function createGOG(store, storeFronts) {
  const storeLink = document.createElement("a");
  const image = document.createElement("img");
  image.src = "assets/gog_icon_135545.png";
  storeLink.appendChild(image);
  storeLink.href = store.url;
  storeFronts.appendChild(storeLink);
}

function createItch(store, storeFronts) {
  const storeLink = document.createElement("a");
  const image = document.createElement("img");
  image.src = "assets/itch-io-icon-512x512-wwio9bi8.png";
  storeLink.appendChild(image);
  storeLink.href = store.url;
  storeFronts.appendChild(storeLink);
}

function createEpicGames(store, storeFronts) {
  const storeLink = document.createElement("a");
  const image = document.createElement("img");
  image.src = "assets/Epic_Games_logo.svg.png";
  storeLink.appendChild(image);
  storeLink.href = store.url;
  storeFronts.appendChild(storeLink);
}

function createXboxStore(store, storeFronts) {
  const storeLink = document.createElement("a");
  const image = document.createElement("img");
  image.src = "assets/xbox.png";
  storeLink.append(image);
  storeLink.href = store.url;
  storeFronts.appendChild(storeLink);
}
