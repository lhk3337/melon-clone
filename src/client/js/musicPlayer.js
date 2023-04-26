const $listenBtn = document.querySelectorAll(".listenBtn");
const $player = document.querySelector(".player");
const $pauseBtn = document.querySelector(".pausebtn");
const $playBtn = document.querySelector(".playbtn");
const $currentTime = document.querySelector(".currentTime");
const $musicTime = document.querySelector(".musicTime");

const $playTitle = document.querySelector(".playTitle");
const $playartist = document.querySelector(".playartist");
const $playImg = document.querySelector(".playImg");

const progressBarSlider = document.getElementById("progressiveBar");

const $volcontrol = document.getElementById("volcontrol");
const $volmuteBtn = document.querySelector(".volmute");
const $volunmuteBtn = document.querySelector(".volunmute");

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;
let volumeValue = 50;

// youtube iframe api
function onYouTubeIframeAPIReady(youtubeId) {
  player = new YT.Player($player, {
    // height: "300",
    // width: "100%",
    videoId: youtubeId,
    playerVars: {
      controls: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}
// onReady handler
function onPlayerReady(event) {
  event.target.playVideo();
  progressBarSlider.addEventListener("input", () => {
    const value = progressBarSlider.value;
    const percent = Math.floor((value / 100) * player.getDuration());
    // 비디오 재생 위치 이동
    player.seekTo(percent);
  });
  $musicTime.innerText = handleTime(player.getDuration());
}
// onStateChange handler
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    player.pauseVideo();
    clearInterval(playTimeIntervalID);
    $pauseBtn.style.display = "none";
    $playBtn.style.display = "block";
    if ($playBtn.style.display === "block") {
      player.playVideo();
      setPlayTime();
    }
  }
  if (event.data == YT.PlayerState.PLAYING) {
    player.setVolume($volcontrol.value);
    $pauseBtn.style.display = "block";
    $playBtn.style.display = "none";
  }
  if (event.data == YT.PlayerState.PAUSED) {
    $pauseBtn.style.display = "none";
    $playBtn.style.display = "block";
  }
}

// music play time convert
const handleTime = (value) => {
  const min = Math.floor(value / 60);
  const sec = Math.floor(value % 60);
  return `${min} : ${sec < 10 ? `0${sec}` : sec}`;
};

// real play time passing handler
const setPlayTime = () => {
  playTimeIntervalID = setInterval(() => {
    $currentTime.innerText = handleTime(player.getCurrentTime());
    const percent = Math.floor((player.getCurrentTime() / player.getDuration()) * 100);
    progressBarSlider.style.background = `linear-gradient(to right, #ff458b ${percent}%, #ffff ${percent}%)`;
    progressBarSlider.value = percent;
  }, 1000);
};

// pause button and play button click handler
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

// music play button handler
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

    // Displaying album image, title and artist in the player
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

// volume control handler
const valPer = ($volcontrol.value / $volcontrol.max) * 100;
$volcontrol.style.background = `linear-gradient(to right, #ffff ${valPer}%, #C79FDF ${valPer}%)`;

$volcontrol.addEventListener("input", function () {
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
  if ($volcontrol.value === 0) {
    player.mute();
  } else {
    player.unMute();
    player.setVolume(volumeValue);
  }

  $volunmuteBtn.style.display = "none";
  $volmuteBtn.style.display = "flex";
});

$volmuteBtn.addEventListener("click", () => {
  if (!player.isMuted()) {
    $volcontrol.value = 0;
    $volcontrol.style.background = `linear-gradient(to right, #ffff 0%, #C79FDF 0%)`;
  }

  if ($volcontrol.value !== 0) {
    player.mute();
  } else {
    player.unMute();
  }
  $volunmuteBtn.style.display = "flex";
  $volmuteBtn.style.display = "none";
});
