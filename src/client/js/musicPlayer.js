const $listenBtn = document.querySelectorAll(".listenBtn");
const $player = document.querySelector(".player");

const $pauseBtn = document.querySelector(".pause");
const $playBtn = document.querySelector(".play");
const $currentTime = document.querySelector(".currentTime");
const $musicTime = document.querySelector(".musicTime");
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
  $musicTime.innerText = handleTime(player.getDuration());
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    player.pauseVideo();
    clearInterval(playTimeIntervalID);
  }
  if (event.data == YT.PlayerState.PLAYING) {
    $pauseBtn.style.display = "block";
    $playBtn.style.display = "none";
  }
  if (event.data == YT.PlayerState.PAUSED) {
    $pauseBtn.style.display = "none";
    $playBtn.style.display = "block";
  }
}
const handleTime = (value) => {
  const min = Math.floor(value / 60);
  const sec = Math.floor(value % 60);
  return `${min} : ${sec < 10 ? `0${sec}` : sec}`;
};

const setPlayTime = () => {
  playTimeIntervalID = setInterval(() => {
    $currentTime.innerText = handleTime(player.getCurrentTime());
  }, 1000);
};

if ($pauseBtn && $playBtn) {
  $pauseBtn.addEventListener("click", () => {
    player.pauseVideo();
    clearInterval(playTimeIntervalID);
  });
  $playBtn.addEventListener("click", () => {
    player.playVideo();
    setPlayTime();
  });
}

$listenBtn.forEach((value) => {
  value.addEventListener("click", () => {
    const youtubeId = value.getAttribute("data-id");
    const mid = value.getAttribute("data-mid");
    fetch(`/api/music/${mid}/views`, {
      method: "POST",
    });
    if (player) {
      player.destroy();
    }
    // fetch(`/api/music/${mid}`, {
    //   method: "GET",
    // });
    onYouTubeIframeAPIReady(youtubeId);
    setPlayTime();
    // 플레이어가 준비되면 실행됩니다.

    // $player.innerHTML = `
    //   <div class="video_container">
    //     <iframe class="youtube_player" src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"></iframe>
    //   </div>
    // `;
  });
});
