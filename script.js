const baseUrl = "https://api.rawg.io/api/games/";
const apiKey = "?key=652dc6a240454ec7a98d610a0041a14e";

console.log(baseUrl + 54 + apiKey);

// search.addEventListener("click", duh);

// fetchData(gameName);

//Get the game data
async function fetchGameData(gameName) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=652dc6a240454ec7a98d610a0041a14e&search=${gameName}&parent_platforms=1`
  );
  const data = await response.json();
  const games = data.results;
  return games;
}

async function fetchGameStoreData(gameId) {
  const response = await fetch(
    `https://api.rawg.io/api/games/${gameId}/stores?key=652dc6a240454ec7a98d610a0041a14e`
  );
  const data = await response.json();
  const stores = data.results;

  stores.forEach((store) => {
    console.log(store.game_id, store.url);
  });
}

async function loopData(gameName) {
  const gameData = await fetchGameData(gameName);

  gameData.forEach((game) => {
    const storeData = fetchGameStoreData(game.id);
    console.log(storeData);
  });
}

// fetchGameStoreData(5);
loopData("lt");
// let search = document.querySelector(".search-button");
// function duh() {
//   let search = document.querySelector(".search-bar").value;
//   let list = document.getElementById("intro");
//   let h2 = document.createElement("h1");
//   h2.textContent = search;
//   h2.classList = "game-desc"; // Remove the dot before "game-desc"
//   list.appendChild(h2);
// }
