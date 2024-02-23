//RAWG API
const baseUrl = "https://api.rawg.io/api/games/";
const apiKey = "?key=652dc6a240454ec7a98d610a0041a14e";
//IGDB API

let searchButt = document.querySelector(".search-button");
searchButt.addEventListener("click", search);
let gameList = document.querySelector(".game-list");

//Stops the form from submitting
document.getElementById("noRefreshForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

//Get the game data
async function fetchGameData(gameName) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=652dc6a240454ec7a98d610a0041a14e&search=${gameName}&parent_platforms=1&search_precise=true`
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
    console.log(game);

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

      const text = await getGameDescription(game.id);

      textDecider(text, gameDesc,storeFronts);
      adjustPadding(gameList);
      //-----------------STOREFRONT LOGO CODE-----------------//

      const stores = await getGameStores(game.id);
      stores.forEach((store) => {
        switch (store.store_id) {
          case 1:
            createSteam(store, storeFronts);
            break;
          case 5:
            createGOG(store, storeFronts);
            break;
          case 11:
            createEpicGames(store, storeFronts);
            break;
          case 2:
            createXboxStore(store, storeFronts);
            break;
        }
      });
    }
  });
}

//-----------------STORE FRONT LINKS + LOGO GENERATOR FUNCTIONS-----------------//
function createSteam(store, storeFronts) {
  const storeLink = document.createElement("a");
  const image = document.createElement("img");
  image.src = "assets/Steam_icon_logo.svg.png";
  image.alt = "Steam Logo";
  storeLink.appendChild(image);
  storeLink.href = store.url;
  storeFronts.appendChild(storeLink);
}

function createGOG(store, storeFronts) {
  const storeLink = document.createElement("a");
  const image = document.createElement("img");
  image.src = "assets/gog_icon_135545.png";
  image.alt = "GOG Logo";
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
  image.alt = "Epic Games Logo";
  storeLink.appendChild(image);
  storeLink.href = store.url;
  storeFronts.appendChild(storeLink);
}

function createXboxStore(store, storeFronts) {
  const storeLink = document.createElement("a");
  const image = document.createElement("img");
  image.src = "assets/xbox.png";
  image.alt = "Xbox Logo";
  storeLink.append(image);
  storeLink.href = store.url;
  storeFronts.appendChild(storeLink);
}

function createStoreLabel(game) {
  console.log(game.id);
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

function textDecider(text, gameDesc,storeFronts) {
  const num = 250;

  if (text.length > num) {
    const part1 = text.slice(0, num);
    const part2 = text.slice(num);
    
        const testDiv = document.createElement("div")
        testDiv.className = "ass"
        

    const part1Para = document.createElement("p");
    part1Para.innerHTML = part1;
    testDiv.appendChild(part1Para);

    const part2Para = document.createElement("p");
    part2Para.innerHTML = `<p>${part1}${part2}</p>`;
    part2Para.style.display = "none";
    testDiv.appendChild(part2Para);
    
    testDiv.appendChild(storeFronts)

    const readMore = document.createElement("button");
    readMore.className = "read-more";
    readMore.textContent = "Read More";
    testDiv.appendChild(readMore);

    const readLess = document.createElement("button");
    readLess.className = "read-less";
    readLess.textContent = "Read Less";
    part2Para.appendChild(readLess);

    readMore.addEventListener("click", () => {
      part2Para.style.display = "block";
      part1Para.style.display = "none";
    });
    readLess.addEventListener("click", () => {
      part2Para.style.display = "none";
      part1Para.style.display = "block";
    });
  } else if (text.length < num) {
    const part1Para = document.createElement("p");
    part1Para.textContent = text;
    gameDesc.appendChild(part1Para);
  } else {
    const defaultDesc = document.createElement("p");
    defaultDesc.className = "defaultDesc";
    defaultDesc.textContent = "No game description found";
    gameInfo.appendChild(defaultDesc);
  }
}

//**********************************************************THIS PUTS STOREFRONT ICONS INBETWEEN TITLE AND TEXT */
// function textDecider(text, gameDesc,storeFronts) {
//   const num = 250;

//   if (text.length > num) {
//     const part1 = text.slice(0, num);
//     const part2 = text.slice(num);

//     const part1Para = document.createElement("p");
//     part1Para.innerHTML = part1;
//     gameDesc.appendChild(part1Para);

//     const part2Para = document.createElement("p");
//     part2Para.innerHTML = `<p>${part1}${part2}</p>`;
//     part2Para.style.display = "none";
//     gameDesc.appendChild(part2Para);

//     const testDiv = document.createElement("div")
//     testDiv.className = "ass"
    
    
//     testDiv.appendChild(part1Para)
//     testDiv.appendChild(storeFronts);
//     testDiv.appendChild(part2Para)
    
//     gameDesc.appendChild(testDiv)
//     const readMore = document.createElement("button");
//     readMore.className = "read-more";
//     readMore.textContent = "Read More";
//     part1Para.appendChild(readMore);

//     const readLess = document.createElement("button");
//     readLess.className = "read-less";
//     readLess.textContent = "Read Less";
//     part2Para.appendChild(readLess);

//     readMore.addEventListener("click", () => {
//       part2Para.style.display = "block";
//       part1Para.style.display = "none";
//     });
//     readLess.addEventListener("click", () => {
//       part2Para.style.display = "none";
//       part1Para.style.display = "block";
//     });
//   } else if (text.length < num) {
//     const part1Para = document.createElement("p");
//     part1Para.textContent = text;
//     gameDesc.appendChild(part1Para);
//   } else {
//     const defaultDesc = document.createElement("p");
//     defaultDesc.className = "defaultDesc";
//     defaultDesc.textContent = "No game description found";
//     gameInfo.appendChild(defaultDesc);
//   }
// }
function adjustPadding(gameList) {
  if (gameList.children.length > 0) {
    gameList.style.paddingBottom = "200px";
  } else {
    gameList.style.padding = "0";
  }
}
