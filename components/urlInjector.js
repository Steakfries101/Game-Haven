function urlInjector() {
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search");
  if (searchQuery) {
    document.querySelector(".search-bar").value = searchQuery; // corrected
    search();
  }
}
