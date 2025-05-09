document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("themeToggle");
  const body = document.body;

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
  });
});
