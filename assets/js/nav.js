
(function () {
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateScrollTo(targetY, duration) {
    var startY = window.scrollY;
    var diff = targetY - startY;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      window.scrollTo(0, startY + diff * easeOutExpo(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var navEl = document.querySelector('.chapter-nav');
  var links = document.querySelectorAll('.chapter-nav a[href^="#"]');

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
      animateScrollTo(Math.max(0, targetY), 700);
      history.pushState(null, '', '#' + id);
    });
  });
})();
