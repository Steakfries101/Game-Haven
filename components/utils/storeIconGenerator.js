//-----------------STORE FRONT LINKS + LOGO GENERATOR FUNCTIONS-----------------//
function createSteam(store, storeFronts) {
    const storeLink = document.createElement("a");
    const image = document.createElement("img");
    image.src = "assets/Steam_icon_logo.svg.png";
    image.alt = "Steam Logo";
    storeLink.appendChild(image);
    storeLink.href = store.url;
    storeFronts.appendChild(storeLink);
  }
  
  function createGOG(store, storeFronts) {
    const storeLink = document.createElement("a");
    const image = document.createElement("img");
    image.src = "assets/gog_icon_135545.png";
    image.alt = "GOG Logo";
    storeLink.appendChild(image);
    storeLink.href = store.url;
    storeFronts.appendChild(storeLink);
  }
  
  
  function createEpicGames(store, storeFronts) {
    const storeLink = document.createElement("a");
    const image = document.createElement("img");
    image.src = "assets/Epic_Games_logo.svg.png";
    image.alt = "Epic Games Logo";
    storeLink.appendChild(image);
    storeLink.href = store.url;
    storeFronts.appendChild(storeLink);
  }
  
  function createXboxStore(store, storeFronts) {
    const storeLink = document.createElement("a");
    const image = document.createElement("img");
    image.src = "assets/xbox.png";
    image.alt = "Xbox Logo";
    storeLink.append(image);
    storeLink.href = store.url;
    storeFronts.appendChild(storeLink);
  }

  export{createSteam,createGOG,createEpicGames,createXboxStore}