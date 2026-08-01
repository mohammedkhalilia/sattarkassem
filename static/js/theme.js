(function () {
  "use strict";

  var btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;
  var icon = btn.querySelector("[data-theme-icon]");
  var root = document.documentElement;

  function currentTheme() {
    var explicit = root.getAttribute("data-theme");
    if (explicit === "dark" || explicit === "light") return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateIcon() {
    icon.innerHTML = currentTheme() === "dark" ? "&#9788;" : "&#9789;";
  }

  updateIcon();

  btn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    updateIcon();
  });
})();
