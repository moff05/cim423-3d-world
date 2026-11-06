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

  // run stepper
  var steps = [
    ['Airlock door', 'Hover glows the door, select starts ECHO\'s briefing. In VR you grab the wheel handle and move your hand in a circle (TwistHandle.cs) to open it.'],
    ['Corridor door', 'Same vault-door pattern, tied to its own step so the wheel only turns on its turn. This one used to have no wheel at all, which soft-locked the run.'],
    ['Terminal', 'Selecting the console opens an information panel with the crew\'s last journal entry, Day 180. It closes itself after the final line.'],
    ['Lab door', 'Last door. The Lab light flickers here, the only room that needs to.'],
    ['Recorder', 'Hover scales it up and lights it up. Select it and it plays the last thing it ever recorded: static, one ragged breath, nothing.'],
    ['Artifact', 'Material shifts from dim blue to bright white, the room shakes, the lights go red, then you are floating in open space for about twelve seconds before everything snaps back.']
  ];
  var btns = document.querySelectorAll('.rs'), detail = document.getElementById('runDetail'), fill = document.getElementById('runFill'), play = document.getElementById('runPlay'), timer = null;
  function go(i) {
    btns.forEach(function (b, n) { b.classList.toggle('active', n === i); b.classList.toggle('done', n < i); });
    if (detail) detail.innerHTML = '<b>Step ' + (i + 1) + ' of 6: ' + steps[i][0] + '</b>' + steps[i][1];
    if (fill) fill.style.width = (i / 5 * 100) + '%';
  }
  btns.forEach(function (b) { b.addEventListener('click', function () { stop(); go(+b.getAttribute('data-step')); }); });
  function stop() { if (timer) { clearInterval(timer); timer = null; if (play) play.textContent = '▶ Play the run'; } }
  if (play) play.addEventListener('click', function () {
    if (timer) { stop(); return; }
    var i = 0; go(0); play.textContent = '❚❚ Pause';
    timer = setInterval(function () { i++; if (i > 5) { stop(); return; } go(i); }, 2600);
  });
  if (detail) go(0);

  // count-up on stats
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var end = +el.getAttribute('data-count'); if (reduced) return;
    var seen = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; seen.disconnect();
      var t0 = performance.now();
      (function tick(t) { var p = Math.min((t - t0) / 900, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); })(t0);
    }); seen.observe(el);
  });

  // gallery lightbox
  var lb = document.createElement('div'); lb.className = 'lightbox'; lb.innerHTML = '<img alt=""><p></p>'; document.body.appendChild(lb);
  document.querySelectorAll('.gallery img').forEach(function (im) {
    im.addEventListener('click', function () { lb.querySelector('img').src = im.src; lb.querySelector('p').textContent = im.alt; lb.classList.add('open'); });
  });
  lb.addEventListener('click', function () { lb.classList.remove('open'); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('open'); });
})();
