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

  games = data.results;
  return games;
}

async function loopData(gameName) {
  const gameData = await fetchData(gameName);

  gameData.forEach((game) => {
    console.log(game);
  });
}

loopData("little big planet");
// let search = document.querySelector(".search-button");
// function duh() {
//   let search = document.querySelector(".search-bar").value;
//   let list = document.getElementById("intro");
//   let h2 = document.createElement("h1");
//   h2.textContent = search;
//   h2.classList = "game-desc"; // Remove the dot before "game-desc"
//   list.appendChild(h2);
// }
