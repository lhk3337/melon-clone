const $listenBtn = document.querySelectorAll(".listenBtn");
const $player = document.querySelector(".player");
const $pauseBtn = document.querySelector(".pausebtn");
const $playBtn = document.querySelector(".playbtn");
const $currentTime = document.querySelector(".currentTime");
const $musicTime = document.querySelector(".musicTime");

const $playTitle = document.querySelector(".playTitle");
const $playartist = document.querySelector(".playartist");
const $playImg = document.querySelector(".playImg");

const $volcontrol = document.getElementById("volcontrol");
const $volmuteBtn = document.querySelector(".volmute");
const $volunmuteBtn = document.querySelector(".volunmute");

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;
let volumeValue;
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
    player.setVolume(50);
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
const valPer = ($volcontrol.value / $volcontrol.max) * 100;
$volcontrol.style.background = `linear-gradient(to right, #ffff ${valPer}%, #C79FDF ${valPer}%)`;

$volcontrol.addEventListener("input", function () {
  console.log($volcontrol.value);
  const valPer = ($volcontrol.value / $volcontrol.max) * 100;
  $volcontrol.style.background = `linear-gradient(to right, #ffff ${valPer}%, #C79FDF ${valPer}%)`;
  volumeValue = $volcontrol.value;
  if (volumeValue === "0") {
    $volunmuteBtn.style.display = "flex";
    $volmuteBtn.style.display = "none";
  } else {
    $volunmuteBtn.style.display = "none";
    $volmuteBtn.style.display = "flex";
  }
  player.unMute();
  player.setVolume($volcontrol.value);
});

$volunmuteBtn.addEventListener("click", () => {
  if (player.isMuted()) {
    $volcontrol.value = volumeValue;
    const valPer = ($volcontrol.value / $volcontrol.max) * 100;
    $volcontrol.style.background = `linear-gradient(to right, #ffff ${valPer}%, #C79FDF ${valPer}%)`;
  }
  if (volumeValue === "0") {
    player.mute();
  } else {
    player.unMute();
  }

  $volunmuteBtn.style.display = "none";
  $volmuteBtn.style.display = "flex";
});

$volmuteBtn.addEventListener("click", () => {
  if (!player.isMuted()) {
    $volcontrol.value = 0;
    $volcontrol.style.background = `linear-gradient(to right, #ffff 0%, #C79FDF 0%)`;
  }
  $volunmuteBtn.style.display = "flex";
  $volmuteBtn.style.display = "none";
  if (volumeValue !== "0") {
    player.mute();
  } else {
    player.mute();
  }
});

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
    const fetchData = async () => {
      const { data } = await (await fetch(`/api/music/${mid}`)).json();
      const { title, artist, thumbUrl } = data;
      $playTitle.innerText = title;
      $playartist.innerText = artist;
      $playImg.src = thumbUrl;
    };
    fetchData();

    onYouTubeIframeAPIReady(youtubeId);
    setPlayTime();
  });
});
