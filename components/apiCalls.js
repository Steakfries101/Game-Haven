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



  export{fetchGameData,getGameDescription,getGameStores}