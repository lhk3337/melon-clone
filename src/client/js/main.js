import "../scss/styles.scss";

const $btn = document.querySelectorAll(".btn");
const $player = document.querySelector(".player");
$btn.forEach((value) => {
  const youtubeId = value.getAttribute("data-id");
  value.addEventListener("click", () => {
    $player.innerHTML = `
      <div class="video_container">
        <iframe width="450" height="270" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    `;
  });
});
