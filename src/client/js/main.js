import "../scss/styles.scss";

const $btn = document.querySelectorAll(".btn");
const $player = document.querySelector(".player");

const $pauseBtn = document.querySelector(".pause");
const $playBtn = document.querySelector(".play");

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;

function onYouTubeIframeAPIReady(youtubeId) {
  player = new YT.Player($player, {
    height: "300",
    width: "100%",
    videoId: youtubeId,
    playerVars: {
      controls: 1,
      rel: 0,
      autoplay: 1, // 자동 재생 유무
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    player.stopVideo();
  }
}
if ($pauseBtn && $playBtn) {
  $pauseBtn.addEventListener("click", () => {
    player.pauseVideo();
  });
  $playBtn.addEventListener("click", () => {
    player.playVideo();
  });
}

$btn.forEach((value) => {
  value.addEventListener("click", () => {
    const youtubeId = value.getAttribute("data-id");
    if (player) {
      player.destroy();
    }
    onYouTubeIframeAPIReady(youtubeId);

    // 플레이어가 준비되면 실행됩니다.

    // $player.innerHTML = `
    //   <div class="video_container">
    //     <iframe class="youtube_player" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"></iframe>
    //   </div>
    // `;
  });
});
