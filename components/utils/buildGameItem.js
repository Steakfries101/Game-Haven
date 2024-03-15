import * as iconGenerator from "./storeIconGenerator.js";
import { textDecider } from "./gameTextButtonCreator.js";
import { getPlaylist, getTrailer } from "./getGameYoutubeMedia.js";
import { getGameDescription, getGameStores } from "./fetchGameData.js";

export const gameList = document.querySelector(".game-list");

export async function buildGame(game) {
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
    // console.log(game.name);
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

    const clickables = document.createElement("div");
    clickables.className = "clickables-container";

    gameDesc.appendChild(clickables);
    const linkContainer = document.createElement("div");
    linkContainer.className = "link-container";
    gameDesc.appendChild(linkContainer);

    const trailerLink = document.createElement("p");
    trailerLink.className = "trailer-ost-links";
    trailerLink.textContent = "Trailer";
    trailerLink.addEventListener("click", () => {
      getTrailer(game.name);
      onclick = "javascript:window.location='http://www.google.com/'";
    });
    linkContainer.appendChild(trailerLink);

    const soundtrackLink = document.createElement("p");
    soundtrackLink.textContent = "Soundtrack";
    soundtrackLink.className = "trailer-ost-links";
    linkContainer.appendChild(soundtrackLink);
    soundtrackLink.addEventListener("click", () => {
      getPlaylist(game.name);
    });

    clickables.appendChild(linkContainer);

    textDecider(text, gameDesc, storeFronts, clickables);

    // adjustPadding(gameList);
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
}
