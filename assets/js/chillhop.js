(function () {
  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // click a gallery image to enlarge
  var lb = document.createElement('div'); lb.className = 'lightbox';
  lb.innerHTML = '<img alt=""><p></p>'; document.body.appendChild(lb);
  document.querySelectorAll('.gallery img').forEach(function (im) {
    im.addEventListener('click', function () {
      lb.querySelector('img').src = im.src; lb.querySelector('p').textContent = im.alt; lb.classList.add('open');
    });
  });
  lb.addEventListener('click', function () { lb.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
})();
