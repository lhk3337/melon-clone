const $addBtn = document.querySelectorAll(".addBtn");

$addBtn.forEach((value) => {
  value.addEventListener("click", () => {
    const id = value.getAttribute("data-id");
    fetch(`/api/music/${id}/playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  });
});
