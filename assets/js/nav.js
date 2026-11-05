
(function () {
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateScrollTo(targetY, duration) {
    var startY = window.scrollY;
    var diff = targetY - startY;
    var startTime = null;
    if (reduced || Math.abs(diff) < 2) { window.scrollTo(0, targetY); return; }

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      window.scrollTo(0, startY + diff * easeOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var navEl = document.querySelector('.chapter-nav');
  var spy = [];

  // highlight the link for the section you are in, and instantly on click
  function setCurrent(id) {
    links.forEach(function (l) { l.classList.toggle('current', l.getAttribute('href') === '#' + id); });
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var line = (navEl ? navEl.getBoundingClientRect().height : 0) + 90, cur = null;
      spy.forEach(function (h) { if (h.getBoundingClientRect().top <= line) cur = h.id; });
      setCurrent(cur);
    });
  }
  var links = document.querySelectorAll('.chapter-nav a[href^="#"]');

  links.forEach(function (l) {
    var h = document.getElementById(l.getAttribute('href').slice(1));
    if (h && h.id !== 'top') spy.push(h);
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();

      var targetY;
      if (id === 'top') {
        targetY = 0;
      } else {
        var navHeight = navEl ? navEl.getBoundingClientRect().height : 0;
        targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      }
      setCurrent(id);
      animateScrollTo(Math.max(0, targetY), 420);
      history.pushState(null, '', '#' + id);
    });
  });
})();
