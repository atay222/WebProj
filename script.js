(function () {
  "use strict";

  var root = document.documentElement;
  var themeBtn = document.getElementById("themeToggle");
  var burger = document.getElementById("burger");
  var nav = document.getElementById("mainNav");
  var toTop = document.getElementById("backToTop");

  /* ---------- 1. Тёмная / светлая тема ---------- */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeBtn) {
      // показываем иконку той темы, на которую переключим
      themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
      themeBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
  }

  applyTheme(root.getAttribute("data-theme") || "dark");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) { /* localStorage может быть недоступен */ }
    });
  }

  /* ---------- 2. Бургер-меню (телефон) ---------- */
  function setMenu(open) {
    if (!burger || !nav) return;
    nav.classList.toggle("open", open);
    burger.classList.toggle("active", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (burger && nav) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      setMenu(!nav.classList.contains("open"));
    });

    // закрываем меню после клика по ссылке
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });

    // клик мимо меню
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !burger.contains(e.target)) setMenu(false);
    });

    // клавиша Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });

    // если окно стало широким — сбрасываем меню
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) setMenu(false);
    });
  }

  /* ---------- 3. Кнопка «Наверх» ---------- */
  function onScroll() {
    if (!toTop) return;
    toTop.classList.toggle("show", window.scrollY > 300);
  }

  if (toTop) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
