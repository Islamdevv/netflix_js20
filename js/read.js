let list = document.querySelector(".list");
let modal_window = document.querySelector(".modal_window");
let link_play = document.querySelector(".link_play");
readMovies();
function readMovies() {
  let data = JSON.parse(localStorage.getItem("JS-20")) || [];
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

    let fav_btn = document.createElement("button");
    fav_btn.classList.add("fav_btn");

    let link = document.createElement("a");
    link.classList.add("link_play");
    img.src = el.image;
    title.innerText = el.title;
    year.innerText = el.year;

    edit_btn.innerHTML = `<ion-icon name="create-outline"></ion-icon>`;
    del_btn.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
    video_btn.innerHTML = `<ion-icon name="play-circle-outline"></ion-icon>`;
    fav_btn.innerHTML = `<ion-icon name="bookmark-outline"></ion-icon>`;
    card.append(img);
    card.append(title);
    card.append(year);
    link.append(video_btn);
    box_btn.append(fav_btn);
    box_btn.append(link);
    box_btn.append(edit_btn);
    box_btn.append(del_btn);

    card.append(box_btn);
    list.append(card);

    // ? ACTION
    del_btn.addEventListener("click", () => {
      deleteMovies(index);
    });
    edit_btn.addEventListener("click", () => {
      modal_window.style.display = "flex";
      editMovies(index);
    });

    video_btn.addEventListener("click", () => {
      let newData = JSON.parse(localStorage.getItem("player")) || [];
      let findItem = data.find((el, idx) => index === idx);
      newData.push(findItem);
      localStorage.setItem("player", JSON.stringify(newData));
      link.href = "./player.html";
    });

    fav_btn.addEventListener("click", () => {
      let newData = JSON.parse(localStorage.getItem("fav_movies")) || [];
      if (newData.some((item, idx) => index === idx)) {
        alert("такой фильм уже добавлен!!!");
      } else {
        let findFavMovies = data.find((el, idx) => index === idx);
        newData.push(findFavMovies);
        localStorage.setItem("fav_movies", JSON.stringify(newData));
      }
    });
    // ? ACTION
  });
}

function deleteMovies(id) {
  let data = JSON.parse(localStorage.getItem("JS-20")) || [];
  data.splice(id, 1);
  localStorage.setItem("JS-20", JSON.stringify(data));
  readMovies();
}

window.addEventListener("click", (e) => {
  if (e.target === modal_window) {
    modal_window.style.display = "none";
  }
});

let edit_title = document.querySelector(".edit_title");
let edit_year = document.querySelector(".edit_year");
let edit_image = document.querySelector(".edit_image");
let edit_video = document.querySelector(".edit_video");
let btn_save = document.querySelector(".btn_save");

function editMovies(index) {
  let data = JSON.parse(localStorage.getItem("JS-20")) || [];
  edit_title.value = data[index].title;
  edit_year.value = data[index].year;
  edit_image.value = data[index].image;
  edit_video.value = data[index].video;

  edit_title.setAttribute("id", index);
  edit_year.setAttribute("id", index);
  edit_image.setAttribute("id", index);
  edit_video.setAttribute("id", index);
}

btn_save.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("JS-20")) || [];
  let newObj = {
    title: edit_title.value,
    year: edit_year.value,
    image: edit_image.value,
    video: edit_video.value,
  };
  data.splice(edit_title.id, 1, newObj);
  data.splice(edit_year.id, 1, newObj);
  data.splice(edit_image.id, 1, newObj);
  data.splice(edit_video.id, 1, newObj);
  localStorage.setItem("JS-20", JSON.stringify(data));
  readMovies();
  modal_window.style.display = "none";
});
