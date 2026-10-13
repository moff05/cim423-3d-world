(function () {
  var colors = { rock: '#ff4d4d', hiphop: '#ffc83d', electronic: '#22e1ff', country: '#ff9a3d' };
  function setAccent(r) { document.body.style.setProperty('--accent', colors[r]); }

  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // spotlight follows cursor
  document.addEventListener('pointermove', function (e) {
    document.body.style.setProperty('--mx', e.clientX + 'px');
    document.body.style.setProperty('--my', e.clientY + 'px');
  });

  // room tabs
  document.querySelectorAll('.rt').forEach(function (b) {
    b.addEventListener('click', function () {
      var r = b.getAttribute('data-room');
      document.querySelectorAll('.rt').forEach(function (x) { x.classList.toggle('active', x === b); });
      document.querySelectorAll('.room-panel').forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-room') === r); });
      setAccent(r);
    });
  });

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
