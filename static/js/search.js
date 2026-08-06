(function () {
  "use strict";

  var root = document.querySelector("[data-search]");
  if (!root) return;

  var input = root.querySelector("[data-search-input]");
  var panel = root.querySelector("[data-search-results]");
  var panelInner = panel.querySelector(".search-panel-inner");
  var indexUrl = root.getAttribute("data-index-url");
  var noResultsText = root.getAttribute("data-no-results-text") || "No results found.";
  var sectionLabels = {};
  try {
    sectionLabels = JSON.parse(root.getAttribute("data-section-labels") || "{}");
  } catch (e) {}

  var items = null;
  var loading = null;

  function loadIndex() {
    if (loading) return loading;
    loading = fetch(indexUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        items = data;
        return items;
      });
    return loading;
  }

  function matches(item, query) {
    var haystack = (item.title + " " + item.summary).toLowerCase();
    return haystack.indexOf(query) !== -1;
  }

  function render(matched) {
    panelInner.innerHTML = "";

    if (matched.length === 0) {
      var empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = noResultsText;
      panelInner.appendChild(empty);
      panel.hidden = false;
      return;
    }

    var list = document.createElement("ul");
    list.className = "search-panel-list";

    matched.slice(0, 30).forEach(function (item) {
      var li = document.createElement("li");
      li.className = "search-result-item";

      var type = document.createElement("span");
      type.className = "search-result-type";
      type.textContent = sectionLabels[item.section] || item.section;
      li.appendChild(type);

      var title = document.createElement("h3");
      title.className = "search-result-title";
      var a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.title;
      title.appendChild(a);
      li.appendChild(title);

      if (item.summary) {
        var summary = document.createElement("p");
        summary.className = "search-result-summary";
        summary.textContent = item.summary;
        li.appendChild(summary);
      }

      list.appendChild(li);
    });

    panelInner.appendChild(list);
    panel.hidden = false;
  }

  function runSearch() {
    var query = input.value.trim().toLowerCase();
    if (!query) {
      panel.hidden = true;
      panelInner.innerHTML = "";
      return;
    }
    loadIndex().then(function (data) {
      var matched = data.filter(function (item) {
        return matches(item, query);
      });
      render(matched);
    });
  }

  var debounceTimer;
  input.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runSearch, 120);
  });

  input.addEventListener("focus", function () {
    loadIndex();
    if (input.value.trim()) runSearch();
  });

  document.addEventListener("click", function (e) {
    if (!root.contains(e.target)) {
      panel.hidden = true;
    }
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      panel.hidden = true;
      input.blur();
    }
  });
})();