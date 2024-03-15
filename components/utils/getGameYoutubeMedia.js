import { fetchYoutubePlaylist, fetchYoutubeTrailer } from "./fetchGameData.js";

export async function getPlaylist(gameName) {
  const encodePlaylist = encodeURIComponent(gameName);

  try {
    const playlistData = await fetchYoutubePlaylist(encodePlaylist);
    if (playlistData) {
      window.open(`//www.youtube.com/playlist?list=${playlistData[0].id.playlistId}`);
    }
  } catch (error) {
    alert("No soundtrack found");
    console.error("Unable to find playlist");
  }
}

export async function getTrailer(gameName) {
  let gameRename = "";
  if (!gameName.includes("1")) {
    gameRename = gameName + " 1";
  } else {
    gameRename = gameName;
  }
  const encodeTrailer = encodeURIComponent(gameRename);
  const trailerData = await fetchYoutubeTrailer(encodeTrailer);
  const videoId = trailerData[0].id.videoId;
  window.open(`https://www.youtube.com/watch?v=${videoId}`);
}
