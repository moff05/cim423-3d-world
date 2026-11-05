(function () {
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // gallery lightbox with arrow keys
  var lb = document.createElement('div'); lb.className = 'lightbox';
  lb.innerHTML = '<img alt=""><p></p>'; document.body.appendChild(lb);
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.gallery img')), cur = -1;
  function show(i) {
    cur = (i + imgs.length) % imgs.length;
    lb.querySelector('img').src = imgs[cur].src; lb.querySelector('p').textContent = imgs[cur].alt; lb.classList.add('open');
  }
  imgs.forEach(function (im, i) { im.addEventListener('click', function () { show(i); }); });
  lb.addEventListener('click', function () { lb.classList.remove('open'); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lb.classList.remove('open');
    if (e.key === 'ArrowRight') show(cur + 1);
    if (e.key === 'ArrowLeft') show(cur - 1);
  });

  // header: audio-reactive equalizer + call to action
  var header = document.querySelector('header.site-header');
  if (header) {
    var cta = document.createElement('div'); cta.className = 'hero-cta';
    cta.innerHTML = '<button type="button" class="play" data-open-demo>▶ Try it in your browser</button><span class="hint">Sound on</span>';
    var repo = header.querySelector('.repo-link');
    if (repo) repo.appendChild(cta); else header.appendChild(cta);
    var cv = document.createElement('canvas'); cv.className = 'eq'; cv.setAttribute('aria-hidden', 'true');
    header.insertBefore(cv, header.firstChild);
    var ctx = cv.getContext('2d'), N = 84, data = null, on = true, W = 0, H = 0, smooth = new Float32Array(N);
    function size() {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size(); window.addEventListener('resize', size);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { on = es[0].isIntersecting; }).observe(header);
    function draw(t) {
      requestAnimationFrame(draw);
      if (!on || !W) return;
      var an = window.ChillhopAudio && window.ChillhopAudio.analyser;
      if (an && (!data || data.length !== an.frequencyBinCount)) data = new Uint8Array(an.frequencyBinCount);
      if (an) an.getByteFrequencyData(data);
      ctx.clearRect(0, 0, W, H);
      var g = ctx.createLinearGradient(0, H, 0, 0);
      g.addColorStop(0, 'rgba(255,179,71,.95)'); g.addColorStop(.6, 'rgba(236,116,97,.7)'); g.addColorStop(1, 'rgba(70,193,181,.35)');
      ctx.fillStyle = g;
      var bw = W / N, sec = t / 1000;
      for (var i = 0; i < N; i++) {
        var idle = 0.07 + 0.05 * Math.sin(i * 0.33 + sec * 1.3) + 0.04 * Math.sin(i * 0.11 - sec * 0.7);
        var v = idle;
        if (an && data) {
          var bin = Math.min(data.length - 1, Math.floor(Math.pow(i / N, 1.7) * data.length * 0.85));
          v = Math.max(idle, data[bin] / 255 * (0.55 + i / N * 0.9));
        }
        smooth[i] += (v - smooth[i]) * (v > smooth[i] ? 0.5 : 0.12);
        var h = Math.max(3, smooth[i] * H * 0.95);
        ctx.fillRect(i * bw + bw * 0.18, H - h, bw * 0.64, h);
      }
    }
    if (reduced) { size(); } else requestAnimationFrame(draw);
  }

  // scroll progress bar in the nav
  var nav = document.querySelector('.chapter-nav');
  if (nav) {
    var bar = document.createElement('div'); bar.className = 'nav-progress'; nav.appendChild(bar);
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var h = document.documentElement.scrollHeight - innerHeight;
        bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%'; tick = false;
      });
    }, { passive: true });
  }

  // soft light that follows the cursor
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    var glow = document.createElement('div'); glow.className = 'cursor-glow'; document.body.appendChild(glow);
    var gx = innerWidth / 2, gy = 200, tx = gx, ty = gy;
    window.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function loop() { gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12; glow.style.transform = 'translate(' + gx + 'px,' + gy + 'px)'; requestAnimationFrame(loop); })();
  }

  // copy buttons on code
  document.querySelectorAll('.snip pre').forEach(function (pre) {
    var b = document.createElement('button'); b.type = 'button'; b.className = 'copy-btn'; b.textContent = 'Copy';
    b.addEventListener('click', function () {
      var text = pre.innerText;
      var done = function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1400); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { });
    });
    pre.parentNode.insertBefore(b, pre);
  });

  // gentle 3D tilt on the interaction cards
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.act').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = 'perspective(700px) rotateY(' + (x * 7) + 'deg) rotateX(' + (-y * 7) + 'deg) translateY(-5px)';
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });
  }

  // browser demo lives in a pop-up: any [data-open-demo] opens it, Esc / backdrop / x closes it
  var modal = document.getElementById('demo-modal');
  if (modal) {
    var fab = document.getElementById('demo-fab'), lastFocus = null;
    document.body.appendChild(modal); if (fab) document.body.appendChild(fab);   // out of <main>'s stacking context, so nothing can draw over it
    function openDemo() {
      lastFocus = document.activeElement; modal.hidden = false;
      document.documentElement.classList.add('modal-open'); if (fab) fab.hidden = true;
      var c = document.getElementById('demo-close'); if (c) c.focus();
    }
    function closeDemo() {
      modal.hidden = true; document.documentElement.classList.remove('modal-open'); if (fab) fab.hidden = false;
      if (window.ChillhopDemo && window.ChillhopDemo.stop) window.ChillhopDemo.stop();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    document.querySelectorAll('[data-open-demo]').forEach(function (b) { b.addEventListener('click', openDemo); });
    document.getElementById('demo-close').addEventListener('click', closeDemo);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeDemo(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden && !lb.classList.contains('open')) closeDemo(); });
  }
})();
