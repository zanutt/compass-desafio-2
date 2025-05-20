document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".desktop-video");
  const playBtn = document.querySelector(".custom-play");

  playBtn.addEventListener("click", () => {
    video.play();
    playBtn.style.display = "none";
  });

  video.addEventListener("pause", () => {
    playBtn.style.display = "";
  });

  video.addEventListener("play", () => {
    playBtn.style.display = "none";
  });
});
