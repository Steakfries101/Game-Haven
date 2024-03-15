import { getSearchValue } from "../script.js";
import { loopData } from "../script.js";
import { gameList } from "./utils/buildGameItem.js";
export async function search() {
  gameList.innerHTML = "";
  const searchValue = getSearchValue();
  if (!searchValue) {
    alert("Please Enter A Game Name!");
    return;
  } else {
    await loopData(searchValue);
    const params = new URLSearchParams(location.search);
    const url = location.pathname;

    params.set("search", searchValue);

    history.pushState({}, "", `${url}?${params.toString()}`);
    // console.log(window.location.pathname);
  }
}

//Stops the form from submitting (refreshing ) each time a search is made
document.getElementById("noRefreshForm").addEventListener("submit", (e) => {
  e.preventDefault();
});
