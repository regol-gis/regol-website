(function () {
  "use strict";

  var root = document.documentElement;

  /* 1. Color theme toggle (Auto -> Light -> Dark -> Auto) */
  var themeBtn = document.getElementById("theme-toggle");
  var STORAGE_KEY = "regol-theme";

  function updateThemeButton() {
    if (!themeBtn) return;
    var mode = root.getAttribute("data-theme") || "auto";
    var labels = {
      auto: "Color theme: System (click to switch to Light)",
      light: "Color theme: Light (click to switch to Dark)",
      dark: "Color theme: Dark (click to switch to System)"
    };
    themeBtn.setAttribute("aria-label", labels[mode]);
    themeBtn.setAttribute("title", labels[mode]);
  }

  if (themeBtn) {
    updateThemeButton();
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") || "auto";
      var next = current === "auto" ? "light" : current === "light" ? "dark" : "auto";
      if (next === "auto") {
        root.removeAttribute("data-theme");
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      } else {
        root.setAttribute("data-theme", next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
      }
      updateThemeButton();
    });
  }

  /* 2. Mobile navigation drawer */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    function setNavOpen(open) {
      siteNav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    }

    navToggle.addEventListener("click", function () {
      setNavOpen(!siteNav.classList.contains("is-open"));
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setNavOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
        setNavOpen(false);
        navToggle.focus();
      }
    });
  }

  /* 3. Hero code tabs */
  document.querySelectorAll("[data-code-tabs]").forEach(function (card) {
    var tabs = card.querySelectorAll("[role='tab']");
    var panels = card.querySelectorAll("[role='tabpanel']");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var target = tab.getAttribute("data-tab");
        tabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle("is-active", active);
          t.setAttribute("aria-selected", String(active));
        });
        panels.forEach(function (p) {
          var active = p.getAttribute("data-panel") === target;
          p.classList.toggle("is-active", active);
          p.hidden = !active;
        });
      });
    });
  });

  /* 4. Copy-to-clipboard buttons */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-copy-target");
      var panel = null;

      if (targetId === "active-tab") {
        var card = btn.closest("[data-code-tabs]");
        panel = card ? card.querySelector(".code-panel.is-active") : null;
      } else {
        panel = document.getElementById(targetId);
      }

      if (!panel) return;
      var codeEl = panel.querySelector("code");
      if (!codeEl) return;

      var text = codeEl.textContent
        .split("\n")
        .map(function (line) { return line.replace(/^\$\s+/, ""); })
        .join("\n")
        .trim();

      if (!navigator.clipboard || !navigator.clipboard.writeText) return;
      navigator.clipboard.writeText(text).then(function () {
        var prev = btn.textContent;
        btn.textContent = "Copied";
        btn.classList.add("is-copied");
        window.setTimeout(function () {
          btn.textContent = prev;
          btn.classList.remove("is-copied");
        }, 1600);
      }).catch(function () {});
    });
  });
})();
