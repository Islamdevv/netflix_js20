let list = document.querySelector(".list");
let link_play = document.querySelector(".link_play");

readMovies();
function readMovies() {
  let data = JSON.parse(localStorage.getItem("fav_movies")) || [];

  list.innerHTML = "";
  data.forEach((el, index) => {
    let card = document.createElement("div");
    card.classList.add("card");
    let img = document.createElement("img");
    img.classList.add("img");

    let title = document.createElement("p");
    title.classList.add("title");

    let year = document.createElement("p");
    year.classList.add("year");

    let box_btn = document.createElement("div");
    box_btn.classList.add("box_btn");

    let edit_btn = document.createElement("button");
    edit_btn.classList.add("edit_btn");

    let del_btn = document.createElement("button");
    del_btn.classList.add("del_btn");

    let video_btn = document.createElement("button");
    video_btn.classList.add("video_btn");

    let link = document.createElement("a");
    link.classList.add("link_play");
    img.src = el.image;
    title.innerText = el.title;
    year.innerText = el.year;

    del_btn.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
    video_btn.innerHTML = `<ion-icon name="play-circle-outline"></ion-icon>`;
    card.append(img);
    card.append(title);
    card.append(year);
    link.append(video_btn);
    box_btn.append(link);
    box_btn.append(del_btn);

    card.append(box_btn);
    list.append(card);

    // ? ACTION
    del_btn.addEventListener("click", () => {
      deleteMovies(index);
    });

    video_btn.addEventListener("click", () => {
      let newData = JSON.parse(localStorage.getItem("player")) || [];
      let findItem = data.find((el, idx) => index === idx);
      newData.push(findItem);
      localStorage.setItem("player", JSON.stringify(newData));
      link.href = "./player.html";
    });

    // ? ACTION
  });
}

function deleteMovies(id) {
  let data = JSON.parse(localStorage.getItem("fav_movies")) || [];
  data.splice(id, 1);
  localStorage.setItem("fav_movies", JSON.stringify(data));
  readMovies();
}
