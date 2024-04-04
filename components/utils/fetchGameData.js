export async function fetchYoutubeTrailer(gameName) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&maxResults=1&q=${gameName} game trailer&key=${YOUTUBE_API_KEY}`
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
export async function fetchYoutubePlaylist(gameName) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${gameName} intitle:ost|intitle:soundtrack &type=playlist&key=${YOUTUBE_API_KEY}`
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
export async function fetchGameData(gameName) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${gameName}&search_precise=true&ordering=name?parent_platforms=1`
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
    const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${RAWG_API_KEY}`);
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
    const response = await fetch(`https://api.rawg.io/api/games/${gameId}/stores?key=${RAWG_API_KEY}`);

    if (!response.ok) {
      throw new Error("Failed to fetch game stores data");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching game stores data ERROR: ", error);
  }
}
