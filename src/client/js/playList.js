const $addBtn = document.querySelectorAll(".addBtn");

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
