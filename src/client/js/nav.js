const $navHome = document.querySelector(".navhome");
const $navtop = document.querySelector(".navtop");
const $navplaylist = document.querySelector(".navplaylist");

const urlPath = window.location.pathname;

if (urlPath === "/") {
  $navHome.style.color = "#95deff";
} else if (urlPath === "/music/top") {
  $navtop.style.color = "#95deff";
} else if (urlPath === "/music/playlist") {
  $navplaylist.style.color = "#95deff";
}
