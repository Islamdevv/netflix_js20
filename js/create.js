let title = document.querySelector(".title");
let year = document.querySelector(".year");
let image = document.querySelector(".image");
let video = document.querySelector(".video");
let btn_create = document.querySelector(".btn_create");

btn_create.addEventListener("click", () => {
  if (!title.value || !year.value || !image.value || !video.value) {
    alert("заполните поле!!!");
    return;
  }
  let newObj = {
    title: title.value,
    year: year.value,
    image: image.value,
    video: video.value,
  };
  let data = JSON.parse(localStorage.getItem("JS-20")) || [];
  data.push(newObj);
  localStorage.setItem("JS-20", JSON.stringify(data));
});
