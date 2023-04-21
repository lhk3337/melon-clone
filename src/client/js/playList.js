const $addBtn = document.querySelectorAll(".addBtn");
const $delBtn = document.querySelectorAll(".delBtn");
const $smMoreBtn = document.querySelectorAll(".smMoreBtn");
const $smContainer = document.querySelectorAll(".smContainer");
$addBtn.forEach((value) => {
  value.addEventListener("click", () => {
    const id = value.getAttribute("data-id");
    fetch(`/api/music/${id}/addplaylist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    alert("노래가 추가 되었습니다. 중복된 곡은 제외 됩니다.");
  });
});

$delBtn.forEach((value) => {
  value.addEventListener("click", () => {
    const id = value.getAttribute("data-mid");
    fetch(`/api/music/${id}/delplaylist`, {
      method: "POST",
    });
    alert("노래가 삭제 되었습니다.");
    window.location.reload();
  });
});
$smMoreBtn.forEach((value) => {
  value.addEventListener("click", () => {
    const conId = value.getAttribute("data-index");

    $smContainer.forEach((value) => {
      const id = value.getAttribute("data-index");
      if (conId === id) {
        if (value.style.display === "flex") {
          value.style.display = "none";
        } else {
          value.style.display = "flex";
        }
      } else {
        value.style = "none";
      }
    });
  });
});
window.addEventListener("resize", function () {
  if ((window, innerWidth > 1024)) {
    $smContainer.forEach((value) => {
      value.style = "none";
    });
  }
});
