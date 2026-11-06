(function () {
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // reveal on scroll
  var els = document.querySelectorAll('main h2, main h3, main blockquote, main table, main .rv, main .buglog li');
  els.forEach(function (el) { el.classList.add('rv'); });
  if (!('IntersectionObserver' in window)) els.forEach(function (el) { el.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }

  // starfield with scroll + cursor parallax
  var cv = document.createElement('canvas'); cv.id = 'stars'; document.body.insertBefore(cv, document.body.firstChild);
  var cx = cv.getContext('2d'), stars = [], W = 0, H = 0, sy = 0, px = 0, tx = 0;
  function size() {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    stars = []; var n = Math.round(W * H / 5500);
    for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * 0.9 + 0.1, p: Math.random() * 6.28 });
  }
  size(); addEventListener('resize', size);
  addEventListener('scroll', function () { sy = scrollY; }, { passive: true });
  addEventListener('pointermove', function (e) {
    tx = (e.clientX / innerWidth - 0.5) * 30;
    document.body.style.setProperty('--mx', e.clientX + 'px'); document.body.style.setProperty('--my', e.clientY + 'px');
  });
  function draw(t) {
    px += (tx - px) * 0.05; cx.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i], x = (s.x + px * s.z + W * 2) % W, y = ((s.y - sy * 0.25 * s.z) % H + H) % H;
      var a = 0.35 + 0.65 * s.z * (reduced ? 1 : (0.6 + 0.4 * Math.sin(t / 700 + s.p)));
      cx.fillStyle = 'rgba(' + (s.z > 0.8 ? '190,235,255' : '255,255,255') + ',' + a.toFixed(2) + ')';
      cx.fillRect(x, y, s.z * 2 + 0.4, s.z * 2 + 0.4);
    }
    if (!reduced) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  // stop tabs (story rooms)
  document.querySelectorAll('.st').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-stop');
      document.querySelectorAll('.st').forEach(function (x) { x.classList.toggle('active', x === b); });
      document.querySelectorAll('.stop-panel').forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-stop') === k); });
    });
  });

  // gallery lightbox
  var lb = document.createElement('div'); lb.className = 'lightbox'; lb.innerHTML = '<img alt=""><p></p>'; document.body.appendChild(lb);
  document.querySelectorAll('.gallery img').forEach(function (im) {
    im.addEventListener('click', function () { lb.querySelector('img').src = im.src; lb.querySelector('p').textContent = im.alt; lb.classList.add('open'); });
  });
  lb.addEventListener('click', function () { lb.classList.remove('open'); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
})();
