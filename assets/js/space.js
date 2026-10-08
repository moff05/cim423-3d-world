(function () {
  var els = document.querySelectorAll('main h2, main h3, main blockquote, main img, main table, main video');
  els.forEach(function (el) { el.classList.add('rv'); });
  if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(function (el) { io.observe(el); });
})();
