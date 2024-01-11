let iframe = document.querySelector("iframe");

playMovies();
function playMovies() {
  let data = JSON.parse(localStorage.getItem("player")) || [];
  data.forEach((el) => {
    iframe.src = el.video;
  });
}
