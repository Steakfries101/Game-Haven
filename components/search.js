import { gameList, getSearchValue, loopData } from "../script.js";

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
