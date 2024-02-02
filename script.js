const baseUrl = "https://api.rawg.io/api/games/";
const apiKey = "?key=652dc6a240454ec7a98d610a0041a14e";

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

async function loopData(gameName) {
  const gameData = await fetchGameData(gameName);
  const gameList = document.querySelector(".game-list");

  gameData.forEach((game) => {
    if (game.stores !== null) {
      const gameItem = document.createElement("li");
      gameItem.className = "game-item";

      const gameInfo = document.createElement("article");
      gameInfo.className = "game-data";
      gameItem.appendChild(gameInfo);

      const gameCover = document.createElement("img");
      gameCover.src = game.background_image;
      gameCover.className = "game-cover";
      gameInfo.appendChild(gameCover);

      // ADD CONDITIONAL TO CHECK WHAT STORES EXIST.
      // AND ADD ICONS AND LINKS AS NECCESSARY ACCORDING TO RESULTS
      const storeFronts = document.createElement("div");
      gameInfo.appendChild(storeFronts);

      const gameTitle = document.createElement("h2");
      gameTitle.className = "game-title";
      gameTitle.textContent = game.name;
      storeFronts.appendChild(gameTitle);

      const description = document.createElement("p");
      description.textContent = game.gameList.appendChild(gameItem);
      // // console.log(game.name);
    }
  });
}

function duh() {
  gameList.innerHTML = "";
  let search = document.querySelector(".search-bar").value;
  loopData(search);
}
