const toTop = document.getElementById("to-top");

export function toTopHider() {
  var scroll = window.scrollY;
  if (scroll < 1200) {
    toTop.className = "hide";
  } else {
    toTop.className = "show";
  }
}

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top of the page smoothly
});
