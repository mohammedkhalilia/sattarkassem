(function () {
  "use strict";

  var root = document.querySelector("[data-lightbox-root]");
  if (!root) return;

  var imageEl = root.querySelector("[data-lightbox-image]");
  var counterEl = root.querySelector("[data-lightbox-counter]");
  var closeBtn = root.querySelector("[data-lightbox-close]");
  var prevBtn = root.querySelector("[data-lightbox-prev]");
  var nextBtn = root.querySelector("[data-lightbox-next]");

  var items = [];
  var currentIndex = -1;
  var lastFocused = null;
  var touchStartX = null;

  function show(index) {
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    var item = items[currentIndex];
    imageEl.src = item.getAttribute("data-lightbox-src");
    if (counterEl) {
      counterEl.textContent = (currentIndex + 1) + " / " + items.length;
    }
  }

  function open(group, index) {
    items = Array.prototype.slice.call(group.querySelectorAll("[data-lightbox-src]"));
    lastFocused = document.activeElement;
    show(index);
    root.hidden = false;
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function close() {
    root.hidden = true;
    imageEl.src = "";
    document.body.classList.remove("lightbox-open");
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function onKeydown(e) {
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowRight") {
      show(currentIndex + 1);
    } else if (e.key === "ArrowLeft") {
      show(currentIndex - 1);
    }
  }

  document.querySelectorAll("[data-lightbox-group]").forEach(function (group) {
    var buttons = group.querySelectorAll("[data-lightbox-src]");
    buttons.forEach(function (btn, index) {
      btn.addEventListener("click", function () {
        open(group, index);
      });
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () { show(currentIndex - 1); });
  nextBtn.addEventListener("click", function () { show(currentIndex + 1); });

  root.addEventListener("click", function (e) {
    if (e.target === root) close();
  });

  root.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  root.addEventListener("touchend", function (e) {
    if (touchStartX === null) return;
    var delta = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) {
      show(currentIndex + 1);
    } else {
      show(currentIndex - 1);
    }
  }, { passive: true });
})();