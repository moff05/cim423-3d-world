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

  // vote demo with real portraits
  var list = document.querySelector('.demo-list'), frames = document.querySelector('.frames');
  if (list && frames) {
    var artists = [
      { n: 'Nirvana', g: 'Rock', f: 'nirvana', l: 0 }, { n: 'Led Zeppelin', g: 'Rock', f: 'led-zeppelin', l: 0 },
      { n: 'Kendrick Lamar', g: 'Hip-Hop', f: 'kendrick-lamar', l: 0 }, { n: 'Snoop Dogg', g: 'Hip-Hop', f: 'snoop-dogg', l: 0 },
      { n: 'Daft Punk', g: 'Electronic', f: 'daft-punk', l: 0 }, { n: 'Skrillex', g: 'Electronic', f: 'skrillex', l: 0 },
      { n: 'Johnny Cash', g: 'Country', f: 'johnny-cash', l: 0 }, { n: 'Dolly Parton', g: 'Country', f: 'dolly-parton', l: 0 }
    ];
    var liked = {};
    function render() {
      var sorted = artists.slice().sort(function (a, b) { return b.l - a.l; });
      frames.innerHTML = '';
      for (var i = 0; i < 4; i++) {
        var a = sorted[i], d = document.createElement('div');
        if (a && a.l > 0) {
          d.className = 'frame filled';
          d.innerHTML = '<img src="/assets/images/portraits/' + a.f + '.jpg" alt="' + a.n + '"><span class="rank">#' + (i + 1) + '</span><span class="cap">' + a.n + '</span>';
        } else { d.className = 'frame'; d.textContent = 'Vote to fill this spot'; }
        frames.appendChild(d);
      }
      list.innerHTML = '';
      sorted.forEach(function (a) {
        var li = document.createElement('li');
        li.innerHTML = '<img class="th" src="/assets/images/portraits/' + a.f + '.jpg" alt=""><span class="nm">' + a.n + '<small>' + a.g + '</small></span>' +
          '<button class="lk' + (liked[a.n] ? ' on' : '') + '" aria-label="Like ' + a.n + '">' + (liked[a.n] ? 'Liked' : 'Like') + ' <b>' + a.l + '</b></button>';
        li.querySelector('button').addEventListener('click', function () {
          liked[a.n] = !liked[a.n]; a.l += liked[a.n] ? 1 : -1; render();
        });
        list.appendChild(li);
      });
    }
    render();
  }

  // clickable record: synthesized loops, no audio files
  var header = document.querySelector('.site-header');
  if (!header) return;
  var vinyl = document.createElement('button');
  vinyl.className = 'vinyl'; vinyl.setAttribute('aria-label', 'Play a track');
  vinyl.innerHTML = '<span class="label">Click<br>to play</span>';
  var np = document.createElement('div'); np.className = 'np'; np.textContent = 'Click the record';
  header.appendChild(vinyl); header.appendChild(np);

  var order = ['rock', 'hiphop', 'electronic', 'country'];
  var names = { rock: 'Rock', hiphop: 'Hip-Hop', electronic: 'Electronic', country: 'Country' };
  var idx = -1, ctx = null, timer = null, step = 0, nextT = 0, master = null, noiseBuf = null;

  function note(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  function env(g, t, a, d, peak) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); }
  function osc(type, f, t, dur, peak, dest, f2) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    env(g, t, 0.005, dur, peak); o.connect(g); g.connect(dest || master); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(t, dur, peak, hp) {
    var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = 'highpass'; f.frequency.value = hp; env(g, t, 0.002, dur, peak);
    s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.05);
  }
  function kick(t, p) { osc('sine', 140, t, 0.18, p || 0.9, null, 40); }
  function snare(t) { noise(t, 0.16, 0.5, 1500); osc('triangle', 190, t, 0.1, 0.3); }
  function hat(t, v) { noise(t, 0.04, v || 0.18, 7000); }
  function lp(f) { var x = ctx.createBiquadFilter(); x.type = 'lowpass'; x.frequency.value = f; x.connect(master); return x; }

  var songs = {
    rock: { bpm: 124, play: function (s, t) {
      if (s % 8 === 0 || s === 10) kick(t); if (s === 4 || s === 12) snare(t); if (s % 2 === 0) hat(t, 0.14);
      var riff = { 0: 40, 3: 40, 6: 43, 8: 40, 11: 38, 14: 43 };
      if (riff[s] !== undefined) { var m = riff[s]; [0, 7, 12].forEach(function (i) { osc('sawtooth', note(m + i), t, 0.28, 0.12, lp(1400)); }); }
    } },
    hiphop: { bpm: 88, play: function (s, t) {
      if (s === 0 || s === 7 || s === 10) kick(t, 1); if (s === 4 || s === 12) snare(t);
      hat(t + (s % 2 ? 0.03 : 0), s % 2 ? 0.08 : 0.16);
      if (s === 0) osc('sine', note(36), t, 0.55, 0.7, null, note(35)); if (s === 10) osc('sine', note(39), t, 0.4, 0.7, null, note(38));
      if (s === 2 || s === 14) osc('square', note(63), t, 0.12, 0.06, lp(1200));
    } },
    electronic: { bpm: 126, play: function (s, t) {
      if (s % 4 === 0) kick(t, 1); if (s % 4 === 2) noise(t, 0.12, 0.22, 8000); if (s === 4 || s === 12) noise(t, 0.12, 0.3, 2500);
      var arp = [57, 60, 64, 67, 69, 67, 64, 60]; osc('sawtooth', note(arp[s % 8] + (s >= 8 ? 12 : 0)), t, 0.14, 0.1, lp(2600));
      if (s % 4 === 0) osc('sawtooth', note(33), t, 0.3, 0.2, lp(300));
    } },
    country: { bpm: 104, play: function (s, t) {
      if (s === 0 || s === 8) kick(t, 0.7); if (s === 4 || s === 12) noise(t, 0.09, 0.28, 3000);
      var line = { 0: 55, 2: 59, 4: 62, 6: 59, 8: 55, 10: 62, 12: 67, 14: 62 };
      if (line[s] !== undefined) { osc('triangle', note(line[s]), t, 0.35, 0.28); osc('square', note(line[s] + 12), t, 0.12, 0.05, lp(2200)); }
      if (s === 0 || s === 8) osc('sine', note(43), t, 0.4, 0.4);
    } }
  };

  function tick() {
    var song = songs[order[idx]], spb = 60 / song.bpm / 4;
    while (nextT < ctx.currentTime + 0.15) { song.play(step % 16, nextT); nextT += spb; step++; }
  }
  function start() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
      ctx = new AC(); master = ctx.createGain(); master.gain.value = 0.35; master.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      var d = noiseBuf.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
    clearInterval(timer); step = 0; nextT = ctx.currentTime + 0.05; timer = setInterval(tick, 40); return true;
  }
  function stop() { clearInterval(timer); timer = null; }
  function show(r) {
    setAccent(r); vinyl.classList.add('playing');
    vinyl.querySelector('.label').innerHTML = names[r].replace('-', '-<br>');
    np.innerHTML = 'Now playing: <b>' + names[r] + '</b> · click for next';
  }
  vinyl.addEventListener('click', function () {
    idx++;
    if (idx >= order.length) {
      idx = -1; stop(); vinyl.classList.remove('playing');
      vinyl.querySelector('.label').innerHTML = 'Click<br>to play'; np.textContent = 'Click the record';
      return;
    }
    if (start()) show(order[idx]);
  });
})();
