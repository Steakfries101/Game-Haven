import { gameList } from "./utils/buildGameItem.js";
//**********************************************************THIS PUTS STOREFRONT ICONS INBETWEEN TITLE AND TEXT */
export function adjustPadding(gameData) {
  if (gameData.length > 0) {
    gameList.style.paddingBottom = "200px";
    console.log(gameData.length);
  } else {
    gameList.style.padding = "0";
  }
}
