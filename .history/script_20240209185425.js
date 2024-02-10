//RAWG API
const baseUrl = "https://api.rawg.io/api/games/";
const apiKey = "?key=652dc6a240454ec7a98d610a0041a14e";
//IGDB API

let searchButt = document.querySelector(".search-button");
searchButt.addEventListener("click", search);
let gameList = document.querySelector(".game-list");

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

async function getGameDescription(gameId) {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=652dc6a240454ec7a98d610a0041a14e`);
    if (!response.ok) {
      throw new Error("Failed to fetch game desc data");
    }
    const data = await response.json();
    return data.description_raw;
  } catch (error) {
    console.error("Error fetching game descriptions ERROR: ", error);
  }
}

//Get stores for each game based on game id
async function getGameStores(gameId) {
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${gameId}/stores?key=652dc6a240454ec7a98d610a0041a14e`);

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

    if (game.store_id !== null) {
      const includesStore = game.stores.some(
        (store) => store.store.id === 5 || store.store.id === 1 || store.store.id === 2 || store.store.id === 11
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
      gameCover.className = "game-cover";
      gameInfo.appendChild(gameCover);

      const gameTitleMobile = document.createElement("h2");
      gameTitleMobile.textContent = game.name;
      gameDesc.appendChild(gameTitle);

      const storeFronts = document.createElement("div");
      storeFronts.className = "store-fronts";
      gameInfo.appendChild(storeFronts);

      const ass = document.createElement("h4");
      ass.textContent = "Storefronts";
      storeFronts.appendChild(ass);

      const gameDesc = document.createElement("div");
      gameDesc.className = "game-desc";
      gameInfo.appendChild(gameDesc);
      // createTitle(gameDesc);

      const gameTitle = document.createElement("h2");
      gameTitle.textContent = game.name;
      gameDesc.appendChild(gameTitle);

      const text = await getGameDescription(game.id);
      textDecider(text);

      // num = 250;
      // //replace num with the amount of characters you want
      // console.log(`PART 1: ${part1}`);
      // const part2 = text.slice(num);
      // console.log(`PART 2: ${part2}`);
      // document.getElementById("part1").InnerHTML = part1;
      // document.getElementById("part2").innerHTML = part2;
      function textDecider(text) {
        const num = 250;

        if (text.length > num) {
          const part1 = text.slice(0, num);
          const part2 = text.slice(num);

          const part1Para = document.createElement("p");
          part1Para.textContent = part1;
          part1Para.className = "part-1";
          gameDesc.appendChild(part1Para);

          const part2Para = document.createElement("p");
          part2Para.textContent = "";
          part2Para.className = "part-2";
          part1Para.appendChild(part2Para);

          const readMore = document.createElement("button");
          readMore.className = "read-more";
          readMore.textContent = "Read More";
          part1Para.appendChild(readMore);

          readMore.addEventListener("click", () => {
            part2Para.textContent = part2;
            readMore.style.display = "none"; // Hide the "Read More" button
            const readLess = document.createElement("button");
            readLess.textContent = "Read Less";
            readLess.className = "read-less"; // Add class name for styling
            gameDesc.appendChild(readLess);

            // Add event listener for "Read Less" button
            readLess.addEventListener("click", () => {
              part2Para.textContent = "";
              readMore.style.display = ""; // Show the "Read More" button
              readLess.remove(); // Remove the "Read Less" button
            });
          });
        } else if (text.length < num) {
          const defaultDesc = document.createElement("h3");
          defaultDesc.className = "defaultDesc";
          defaultDesc.textContent = "No game description found";
          gameInfo.appendChild(defaultDesc);
        }
        {
        }
      }

      //-----------------STOREFRONT LOGO CODE-----------------//

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

//-----------------STORE FRONT LINKS + LOGO GENERATOR FUNCTIONS-----------------//
function createSteam(store, storeFronts) {
  const storeLink = document.createElement("a");
  const image = document.createElement("img");
  image.src = "assets/Steam_icon_logo.svg.png";
  storeLink.appendChild(image);
  storeLink.href = store.url;
  storeFronts.appendChild(storeLink);
}

function createStoreLabel(game) {
  console.log(game.id);
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

function getSearchValue() {
  const value = document.querySelector(".search-bar").value;
  return value;
}

function createTitle(parent) {
  const title = document.createElement("h3");
  title.textContent = "Description";
  parent.appendChild(title);
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
