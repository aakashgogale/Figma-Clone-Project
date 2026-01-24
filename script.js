
const createBtn = document.querySelector(".create-design-btn");


if (createBtn) {
  createBtn.addEventListener("click", () => {
    window.location.href = "editor.html";
  });
}

document.querySelectorAll(".open-editor").forEach(card => {
  card.addEventListener("click", () => {
    window.location.href = "editor.html";
  });
});

