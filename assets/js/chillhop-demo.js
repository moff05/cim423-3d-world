/* Night Shift Vinyl, playable in the browser.
   Same five steps as the VR sim, same audio files, driven by mouse or touch instead of hands.
   Exposes window.ChillhopAudio.analyser so the page header can dance to it. */
(function () {
  'use strict';
  var mount = document.getElementById('demo-mount');
  if (!mount) return;

  var BASE = '/assets/code/chillhop/audio/';
  var FILES = ['drums_loop', 'keys_loop', 'vinyl_crackle_loop', 'platter_hum_loop', 'step_chime', 'complete_chime', 'pad_hit', 'button_click'];
  var LOOP_SECONDS = 12;      // drums and keys are both exactly 12 s at 80 BPM
  var BAR_SECONDS = 3;        // 4 beats at 80 BPM
  var MIN_CUT = 800, MAX_CUT = 20000, MIN_VOL = 0.3, MAX_VOL = 1;

  // ---- geometry (SVG units) ----
  var C = { x: 240, y: 335 };                 // platter centre
  var P = { x: 480, y: 115 };                 // tonearm pivot
  var ARM_L = 250, ARM_REST = 96, ARM_MIN = 88, ARM_MAX = 150;
  var CRATE = { x: 808, y: 122 };
  // The mixer mirrors the board in the headset (seen from above, player at the bottom): level meter at the back,
  // one big pad and the dial in the middle row, a flat master fader along the front edge.
  var KNOB = { x: 892, y: 376 };
  var FADER = { y: 538, xL: 708, xR: 906 };
  var PAD_ORIGIN = { x: 690, y: 330 }, PAD_SIZE = 92;
  var VU_N = 8;
  var HINTS = [
    'Press START SESSION to begin.',
    'Drag the record from the crate onto the platter.',
    'Grab the amber tonearm handle and swing the needle over the record. Hold it there.',
    'Tap the orange pad.',
    'Turn the dial up: twist it clockwise, or just drag it right or up.',
    'Slide the master fader all the way to the right.',
    'Session mastered. Hit restart to run it again.'
  ];
  var STEP_NAMES = ['Load Vinyl Platter', 'Drop the Stylus Needle', 'Trigger Beat Sample Pad', 'Open Low-Pass Filter', 'Push Master Output Fader'];

  // ---- markup ----
  var padSvg = '<g class="pad" data-i="0" transform="translate(' + PAD_ORIGIN.x + ',' + PAD_ORIGIN.y + ')"><rect class="pad-base" width="' + PAD_SIZE + '" height="' + PAD_SIZE + '" rx="12"/><rect class="pad-cap" x="7" y="7" width="' + (PAD_SIZE - 14) + '" height="' + (PAD_SIZE - 14) + '" rx="8"/></g>';
  var tickSvg = '';
  for (var k = 0; k <= 6; k++) {
    var ta = (-45 + k * 15) * Math.PI / 180;
    tickSvg += '<line class="tick" x1="' + (KNOB.x + Math.sin(ta) * 52) + '" y1="' + (KNOB.y - Math.cos(ta) * 52) + '" x2="' + (KNOB.x + Math.sin(ta) * 60) + '" y2="' + (KNOB.y - Math.cos(ta) * 60) + '"/>';
  }
  var faderTicks = '';
  for (var f = 0; f <= 8; f++) {
    var fx = FADER.xL + f * (FADER.xR - FADER.xL) / 8;
    faderTicks += '<line class="tick" x1="' + fx + '" x2="' + fx + '" y1="518" y2="' + (f % 2 ? 524 : 529) + '"/>';
  }
  var vuSvg = '<rect x="668" y="246" width="280" height="46" rx="9" fill="#050302" stroke="#000" stroke-opacity=".6" stroke-width="2"/>';
  for (var v = 0; v < VU_N; v++) vuSvg += '<rect class="vu" data-i="' + v + '" x="' + (676 + v * 34) + '" y="255" width="26" height="28" rx="4"/>';
  var grooves = '';
  for (var r = 52; r <= 120; r += 7) grooves += '<circle r="' + r + '" class="groove"/>';

  mount.innerHTML =
    '<div class="demo" id="demo" data-step="0">' +
    '<div class="demo-stage">' +
    '<div class="demo-lamp" aria-hidden="true"></div>' +
    '<div class="demo-neon n1" aria-hidden="true"></div><div class="demo-neon n2" aria-hidden="true"></div>' +
    '<svg class="demo-svg" viewBox="0 0 1000 600" role="application" aria-label="Interactive vinyl desk. Drag the record, tonearm, dial and fader with a mouse or finger.">' +
    '<defs>' +
    '<linearGradient id="dWood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a3019"/><stop offset="1" stop-color="#2c1b0e"/></linearGradient>' +
    '<linearGradient id="dPlinth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2019"/><stop offset="1" stop-color="#17110d"/></linearGradient>' +
    '<radialGradient id="dPlatter" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#5b5f66"/><stop offset="1" stop-color="#25282c"/></radialGradient>' +
    '<linearGradient id="dSheen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
    '<filter id="dGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
    '</defs>' +
    '<rect width="1000" height="600" fill="url(#dWood)"/>' +
    '<g class="wood-lines" aria-hidden="true">' + (function () { var s = ''; for (var y = 24; y < 600; y += 38) s += '<line x1="0" x2="1000" y1="' + y + '" y2="' + (y + 6) + '"/>'; return s; })() + '</g>' +
    // plinth + platter
    '<rect x="20" y="52" width="522" height="528" rx="26" fill="url(#dPlinth)" stroke="#000" stroke-opacity=".5" stroke-width="3"/>' +
    '<circle cx="' + C.x + '" cy="' + C.y + '" r="178" fill="#0c0907"/>' +
    '<g id="platter" transform="translate(' + C.x + ',' + C.y + ')"><circle r="172" fill="url(#dPlatter)"/>' +
    (function () { var s = ''; for (var d = 0; d < 36; d++) s += '<circle class="strobe" cx="' + (Math.cos(d / 36 * 6.2832) * 164) + '" cy="' + (Math.sin(d / 36 * 6.2832) * 164) + '" r="2"/>'; return s; })() +
    '</g>' +
    // crate
    '<g class="crate" aria-hidden="true"><rect x="' + (CRATE.x - 100) + '" y="40" width="200" height="132" rx="10" fill="#5a3a1e" stroke="#2b1a0c" stroke-width="3"/><rect x="' + (CRATE.x - 90) + '" y="48" width="180" height="40" rx="6" fill="#2b1a0c"/></g>' +
    // record
    '<g id="record" class="record" transform="translate(' + CRATE.x + ',' + CRATE.y + ')"><g class="rec-inner">' +
    '<circle r="125" fill="#0d0907"/>' + grooves + '<path d="M0 0 L125 0 A125 125 0 0 0 62.5 -108 Z" fill="url(#dSheen)"/><path d="M0 0 L-125 0 A125 125 0 0 0 -62.5 108 Z" fill="url(#dSheen)"/>' +
    '<circle r="40" fill="#ec7461"/><circle r="40" fill="none" stroke="#17100b" stroke-width="3"/><text class="rec-text" y="-12" text-anchor="middle" style="font-size:8.5px;letter-spacing:.06em">NIGHT SHIFT</text><text class="rec-text s" y="22" text-anchor="middle">SIDE A</text><circle r="3.5" fill="#150e09"/><circle cx="26" cy="0" r="3" fill="#fff" opacity=".7"/>' +
    '</g><circle class="hit" r="130" fill="transparent"/></g>' +
    // tonearm
    '<g id="arm" transform="translate(' + P.x + ',' + P.y + ')"><circle r="30" fill="#2a2d31" stroke="#0d0f10" stroke-width="3"/>' +
    '<g id="armRot" transform="rotate(' + ARM_REST + ')"><rect x="-56" y="-12" width="34" height="24" rx="5" fill="#74777c"/><line x1="-22" x2="' + ARM_L + '" y1="0" y2="0" stroke="#aeb2b8" stroke-width="7" stroke-linecap="round"/>' +
    '<rect x="' + (ARM_L - 8) + '" y="-9" width="34" height="18" rx="4" fill="#1a1b1d"/><circle id="needle" cx="' + (ARM_L + 14) + '" cy="0" r="3.5" fill="#e8e8e8"/>' +
    '<circle class="arm-handle" cx="' + (ARM_L * 0.78) + '" cy="0" r="15" fill="#ffb347" filter="url(#dGlow)"/><circle class="hit" cx="' + (ARM_L * 0.78) + '" cy="0" r="34" fill="transparent"/></g>' +
    '<circle r="12" fill="#6b6e73"/></g>' +
    // mixer (same layout as the headset board)
    '<rect x="640" y="228" width="336" height="352" rx="22" fill="url(#dPlinth)" stroke="#000" stroke-opacity=".5" stroke-width="3"/>' +
    vuSvg + padSvg +
    '<text class="lbl" x="' + (PAD_ORIGIN.x + PAD_SIZE / 2) + '" y="446" text-anchor="middle">SAMPLE PAD</text>' +
    '<text class="lbl" x="' + KNOB.x + '" y="446" text-anchor="middle">LOW-PASS</text>' + tickSvg +
    '<g id="knob" transform="translate(' + KNOB.x + ',' + KNOB.y + ')"><circle r="44" fill="#1b1613" stroke="#0a0705" stroke-width="3"/><g id="knobRot" transform="rotate(-45)"><circle r="40" fill="#2a221c"/><rect x="-3" y="-38" width="6" height="22" rx="3" fill="#f7ecda"/></g><circle class="hit" r="80" fill="transparent"/></g>' +
    '<text class="read" id="readCut" x="668" y="478">FILTER 800 Hz</text><text class="read" id="readVol" x="948" y="478" text-anchor="end">VOLUME 30%</text>' +
    '<text class="lbl" x="668" y="504">MASTER</text>' +
    '<rect x="664" y="508" width="288" height="58" rx="10" fill="#0d0907" stroke="#000" stroke-opacity=".5" stroke-width="2"/>' +
    '<rect x="' + (FADER.xL - 8) + '" y="' + (FADER.y - 5) + '" width="' + (FADER.xR - FADER.xL + 16) + '" height="10" rx="5" fill="#050302"/>' + faderTicks +
    '<g id="fader" transform="translate(' + FADER.xL + ',' + FADER.y + ')"><rect x="-17" y="-22" width="34" height="44" rx="7" fill="#e8c28a" stroke="#6b4a2b" stroke-width="3"/><rect x="-2" y="-16" width="4" height="32" rx="2" fill="#6b4a2b"/><rect class="hit" x="-44" y="-34" width="88" height="68" fill="transparent"/></g>' +
    '</svg>' +
    // overlays
    '<div class="demo-ov ov-intro"><div class="slate"><small>Lo-Fi Vinyl Lounge</small><h3>Build a track with your hands</h3><p>Five gestures. Every one changes what you hear. Use your mouse or finger here; in the headset it is bare hands.</p><button type="button" class="demo-btn go">START SESSION</button></div></div>' +
    '<div class="demo-ov ov-done" hidden><div class="slate"><small>Final step cleared</small><h3>SESSION MASTERED - 100% GROOVE</h3><p class="time">Session time <b id="demoTime">00:00.0</b></p><button type="button" class="demo-btn again">RESTART SESSION</button></div></div>' +
    '</div>' +
    '<div class="demo-hud"><ol class="demo-steps">' + STEP_NAMES.map(function (n, i) { return '<li data-s="' + (i + 1) + '"><span class="chk">' + (i + 1) + '</span>' + n + '</li>'; }).join('') + '</ol>' +
    '<div class="demo-side"><p class="demo-hint" id="demoHint" role="status" aria-live="polite">' + HINTS[0] + '</p><button type="button" class="demo-mute" id="demoMute" aria-pressed="false">Sound: on</button></div></div>' +
    '</div>';

  var $ = function (s) { return mount.querySelector(s); };
  var demo = $('#demo'), svg = $('.demo-svg');
  var elRecord = $('#record'), elPlatter = $('#platter'), elArmRot = $('#armRot'), elKnobRot = $('#knobRot'), elFader = $('#fader');
  var elHint = $('#demoHint'), pads = mount.querySelectorAll('.pad');
  var elCut = $('#readCut'), elVol = $('#readVol'), ovIntro = $('.ov-intro'), ovDone = $('.ov-done'), elTime = $('#demoTime');

  // ---- state ----
  var S = {
    step: 0, seated: false, dragRec: false, recPos: { x: CRATE.x, y: CRATE.y }, recScale: 0.46, recTarget: null,
    spin: 0, omega: 0, omegaTarget: 0, armA: ARM_REST, armTarget: ARM_REST, armDrag: false, armLocked: false, dwell: 0,
    knobV: 0, faderV: 0, startedAt: 0, doneAt: 0
  };

  // ---- audio ----
  var A = { ctx: null, buf: null, loading: null, muted: false, loops: {}, drumT0: 0 };
  window.ChillhopAudio = { analyser: null };

  function loadAudio() {
    if (A.loading) return A.loading;
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return (A.loading = Promise.resolve(false));
    var ctx = A.ctx = new Ctx();
    A.mix = ctx.createGain();
    A.lp = ctx.createBiquadFilter(); A.lp.type = 'lowpass'; A.lp.frequency.value = MIN_CUT; A.lp.Q.value = 0.7;
    A.master = ctx.createGain(); A.master.gain.value = MIN_VOL;
    A.mute = ctx.createGain();
    A.ui = ctx.createGain(); A.ui.gain.value = 0.8;
    A.an = ctx.createAnalyser(); A.an.fftSize = 256; A.an.smoothingTimeConstant = 0.78;
    A.mix.connect(A.lp); A.lp.connect(A.master); A.master.connect(A.an); A.an.connect(A.mute); A.ui.connect(A.mute); A.mute.connect(ctx.destination);
    window.ChillhopAudio.analyser = A.an;
    A.buf = {};
    var decode = function (ab) { return new Promise(function (res, rej) { ctx.decodeAudioData(ab, res, rej); }); };
    A.loading = Promise.all(FILES.map(function (n) {
      return fetch(BASE + n + '.wav').then(function (r) { if (!r.ok) throw new Error(n); return r.arrayBuffer(); }).then(decode).then(function (b) { A.buf[n] = b; });
    })).then(function () { return true; }, function () { return false; });
    return A.loading;
  }

  function oneShot(name, vol, rate, toMix) {
    if (!A.ctx || !A.buf || !A.buf[name]) return;
    var s = A.ctx.createBufferSource(), g = A.ctx.createGain();
    s.buffer = A.buf[name]; s.playbackRate.value = rate || 1; g.gain.value = vol == null ? 1 : vol;
    s.connect(g); g.connect(toMix ? A.mix : A.ui); s.start();
  }

  function startLoop(key, name, level, fade, when, offset) {
    if (!A.ctx || !A.buf || !A.buf[name]) return;
    stopLoop(key, 0);
    var s = A.ctx.createBufferSource(), g = A.ctx.createGain(), t = when || A.ctx.currentTime;
    s.buffer = A.buf[name]; s.loop = true; g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(level, t + fade);
    s.connect(g); g.connect(A.mix); s.start(t, offset || 0);
    A.loops[key] = { s: s, g: g };
  }
  function stopLoop(key, fade) {
    var l = A.loops[key]; if (!l) return;
    var t = A.ctx.currentTime;
    l.g.gain.cancelScheduledValues(t); l.g.gain.setValueAtTime(l.g.gain.value, t);
    l.g.gain.linearRampToValueAtTime(0, t + (fade || 0.02));
    try { l.s.stop(t + (fade || 0.02) + 0.02); } catch (e) { /* already stopped */ }
    delete A.loops[key];
  }
  function setCut(v) {
    var hz = MIN_CUT * Math.pow(MAX_CUT / MIN_CUT, v);
    if (A.lp) A.lp.frequency.setTargetAtTime(hz, A.ctx.currentTime, 0.04);
    elCut.textContent = 'FILTER ' + (hz >= 1000 ? (hz / 1000).toFixed(1) + ' kHz' : Math.round(hz) + ' Hz');
  }
  function setVol(v) {
    var g = MIN_VOL + (MAX_VOL - MIN_VOL) * v;
    if (A.master) A.master.gain.setTargetAtTime(g, A.ctx.currentTime, 0.04);
    elVol.textContent = 'VOLUME ' + Math.round(g * 100) + '%';
  }

  // ---- flow ----
  function setHint(t, nudge) {
    elHint.textContent = t;
    elHint.classList.remove('nudge'); void elHint.offsetWidth;
    if (nudge) elHint.classList.add('nudge');
  }
  function fmt(ms) { var t = Math.max(0, ms) / 1000, m = Math.floor(t / 60), s = t - m * 60; return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s.toFixed(1); }
  function paintSteps() {
    demo.setAttribute('data-step', S.step);
    mount.querySelectorAll('.demo-steps li').forEach(function (li) {
      var n = +li.getAttribute('data-s');
      li.classList.toggle('done', S.step > n);
      li.classList.toggle('cur', S.step === n);
    });
    pads[0].classList.toggle('glow', S.step === 3);
  }
  function goStep(n) {
    S.step = n; paintSteps(); setHint(HINTS[n]);
    if (n >= 2) oneShot('step_chime', 0.9);
  }
  function tooSoon() {
    oneShot('button_click', 0.5);
    setHint('Not yet. ' + HINTS[Math.min(S.step, 5)], true);
  }

  function start() {
    var btn = $('.go');
    btn.disabled = true; btn.textContent = 'LOADING SOUND…';
    var p = loadAudio();
    if (A.ctx && A.ctx.resume) A.ctx.resume();
    p.then(function () {
      if (A.ctx && A.ctx.resume) A.ctx.resume();
      oneShot('button_click', 0.8);
      ovIntro.hidden = true; btn.disabled = false; btn.textContent = 'START SESSION';
      S.startedAt = performance.now();
      setCut(0); setVol(0);
      goStep(1);
    });
  }

  function seatRecord() {
    S.seated = true; S.recTarget = { x: C.x, y: C.y, s: 1 };
    goStep(2);
    S.omegaTarget = 200;
    startLoop('hum', 'platter_hum_loop', 0.45, 1.5);
  }

  function dropNeedle() {
    S.armLocked = true; S.armDrag = false;
    goStep(3);
    $('#needle').classList.add('down');
    if (!A.ctx) return;
    startLoop('crackle', 'vinyl_crackle_loop', 0.5, 0.9);
    var when = A.ctx.currentTime + 1.2;
    A.drumT0 = when;
    startLoop('drums', 'drums_loop', 0.85, 1.2, when, 0);
  }

  function padHit(i) {
    var rate = [1, 1.12, 0.9, 1.26][i];
    oneShot('pad_hit', 0.9, rate, true);
    pads[i].classList.add('hit-on');
    setTimeout(function () { pads[i].classList.remove('hit-on'); }, 160);
    if (i === 0 && S.step === 3) {
      goStep(4);
      if (A.ctx) {
        // enter on the next bar, phase-locked to the drums
        var now = A.ctx.currentTime, since = Math.max(0, now - A.drumT0);
        var nextBar = A.drumT0 + Math.ceil((since + 0.05) / BAR_SECONDS) * BAR_SECONDS;
        var offset = (nextBar - A.drumT0) % LOOP_SECONDS;
        startLoop('keys', 'keys_loop', 0.7, 1.0, nextBar, offset);
      }
    } else if (i === 0 && S.step < 3) {
      setHint('Not yet. ' + HINTS[S.step], true);
    }
  }

  function finish() {
    S.doneAt = performance.now();
    S.step = 6; paintSteps(); setHint(HINTS[6]);
    oneShot('complete_chime', 1);
    elTime.textContent = fmt(S.doneAt - S.startedAt);
    demo.classList.add('finale');
    setTimeout(function () { ovDone.hidden = false; }, 700);
  }

  function restart() {
    ['hum', 'crackle', 'drums', 'keys'].forEach(function (k) { stopLoop(k, 0.4); });
    S.step = 0; S.seated = false; S.recPos = { x: CRATE.x, y: CRATE.y }; S.recScale = 0.46; S.recTarget = null;
    S.omegaTarget = 0; S.armA = S.armTarget = ARM_REST; S.armLocked = false; S.dwell = 0;
    S.knobV = 0; S.faderV = 0;
    $('#needle').classList.remove('down');
    demo.classList.remove('finale');
    ovDone.hidden = true; ovIntro.hidden = false;
    setCut(0); setVol(0); elCut.textContent = 'FILTER 800 Hz'; elVol.textContent = 'VOLUME 30%';
    paintSteps(); setHint(HINTS[0]);
  }

  // ---- pointer plumbing ----
  function svgPt(e) {
    var p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
    var m = svg.getScreenCTM();
    return m ? p.matrixTransform(m.inverse()) : { x: 0, y: 0 };
  }
  function drag(el, onStart, onMove, onEnd) {
    el.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      if (onStart(svgPt(e)) === false) return;
      try { el.setPointerCapture(e.pointerId); } catch (x) { /* ignore */ }
      var move = function (ev) { onMove(svgPt(ev)); };
      var up = function (ev) {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        if (onEnd) onEnd(svgPt(ev));
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  }
  function ang(a, b) { return Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI; }
  function wrap(d) { while (d > 180) d -= 360; while (d < -180) d += 360; return d; }

  // record
  var recOff = { x: 0, y: 0 };
  drag(elRecord, function (pt) {
    if (S.seated) { setHint(S.step < 6 ? 'The record is locked on. Keep going.' : HINTS[6], true); return false; }
    if (S.step < 1) { tooSoon(); return false; }
    S.dragRec = true; S.recTarget = null; recOff = { x: S.recPos.x - pt.x, y: S.recPos.y - pt.y };
  }, function (pt) {
    S.recPos = { x: pt.x + recOff.x, y: pt.y + recOff.y };
  }, function () {
    S.dragRec = false;
    var d = Math.hypot(S.recPos.x - C.x, S.recPos.y - C.y);
    if (d < 90) seatRecord(); else S.recTarget = { x: CRATE.x, y: CRATE.y, s: 0.46 };
  });

  // tonearm
  drag(mount.querySelector('#arm .hit'), function () {
    if (S.armLocked) { setHint('Needle is down. Nice. On to the pad.', true); return false; }
    if (S.step < 2) { tooSoon(); return false; }
    S.armDrag = true; S.dwell = 0;
  }, function (pt) {
    S.armA = S.armTarget = Math.max(ARM_MIN, Math.min(ARM_MAX, ang(P, pt)));
  }, function () {
    S.armDrag = false; S.dwell = 0;
    if (!S.armLocked) S.armTarget = ARM_REST;
  });

  // knob
  var knobPrev = 0, knobLast = { x: 0, y: 0 };
  drag(mount.querySelector('#knob .hit'), function (pt) {
    if (S.step < 4) { tooSoon(); return false; }
    knobPrev = ang(KNOB, pt); knobLast = pt;
  }, function (pt) {
    // Accept a circular twist OR a straight drag (right / up opens it): fingers rarely trace a clean arc.
    var a = ang(KNOB, pt), d = wrap(a - knobPrev); knobPrev = a;
    var lin = ((pt.x - knobLast.x) - (pt.y - knobLast.y)) * 0.45; knobLast = pt;
    if (Math.abs(lin) > Math.abs(d)) d = lin;
    S.knobV = Math.max(0, Math.min(1, S.knobV + d / 60));
    setCut(S.knobV);
    if (S.step === 4 && S.knobV >= 0.98) { S.knobV = 1; setCut(1); goStep(5); }
  });

  // fader (flat, slides left to right)
  var fOff = 0;
  drag(mount.querySelector('#fader .hit'), function (pt) {
    if (S.step < 5) { tooSoon(); return false; }
    fOff = (FADER.xL + S.faderV * (FADER.xR - FADER.xL)) - pt.x;
  }, function (pt) {
    var x = Math.max(FADER.xL, Math.min(FADER.xR, pt.x + fOff));
    S.faderV = (x - FADER.xL) / (FADER.xR - FADER.xL);
    setVol(S.faderV);
    if (S.step === 5 && S.faderV >= 0.97) { S.faderV = 1; setVol(1); finish(); }
  });

  // pads
  pads.forEach(function (p, i) {
    p.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      if (!A.ctx || S.step < 1) { tooSoon(); return; }
      padHit(i);
    });
  });

  $('.go').addEventListener('click', start);
  $('.again').addEventListener('click', restart);
  var muteBtn = $('#demoMute');
  muteBtn.addEventListener('click', function () {
    A.muted = !A.muted;
    if (A.mute) A.mute.gain.setTargetAtTime(A.muted ? 0 : 1, A.ctx.currentTime, 0.03);
    muteBtn.textContent = 'Sound: ' + (A.muted ? 'off' : 'on'); muteBtn.setAttribute('aria-pressed', A.muted);
  });

  // ---- level meter: lights up with the music, like the VU bars on the headset board ----
  var vuEls = mount.querySelectorAll('.vu'), vuBuf = null, vuLevel = 0;
  var VU_ON = ['#37e08a', '#37e08a', '#37e08a', '#37e08a', '#37e08a', '#ffb347', '#ffb347', '#ff5a4a'];
  var VU_OFF = ['#14241b', '#14241b', '#14241b', '#14241b', '#14241b', '#2b2210', '#2b2210', '#2b1412'];
  function paintVu(dt) {
    var target = 0;
    if (A.an && S.step >= 3 && S.step < 7 && !A.muted) {
      if (!vuBuf) vuBuf = new Uint8Array(A.an.frequencyBinCount);
      A.an.getByteFrequencyData(vuBuf);
      var sum = 0, n = 24;
      for (var q = 1; q <= n; q++) sum += vuBuf[q];
      target = Math.min(1, sum / n / 190);
    }
    vuLevel += (target - vuLevel) * Math.min(1, dt * 12);
    var lit = Math.round(vuLevel * VU_N);
    for (var b = 0; b < vuEls.length; b++) vuEls[b].setAttribute('fill', b < lit ? VU_ON[b] : VU_OFF[b]);
  }

  // ---- render loop ----
  var last = performance.now(), visible = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(demo);
  function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible) return;
    S.omega += (S.omegaTarget - S.omega) * Math.min(1, dt * 1.6);
    S.spin = (S.spin + S.omega * dt) % 360;
    // record easing
    if (S.recTarget && !S.dragRec) {
      var k = Math.min(1, dt * 9);
      S.recPos.x += (S.recTarget.x - S.recPos.x) * k; S.recPos.y += (S.recTarget.y - S.recPos.y) * k;
      S.recScale += (S.recTarget.s - S.recScale) * k;
    }
    if (S.dragRec) S.recScale += (1 - S.recScale) * Math.min(1, dt * 10);
    elRecord.setAttribute('transform', 'translate(' + S.recPos.x.toFixed(1) + ',' + S.recPos.y.toFixed(1) + ') scale(' + S.recScale.toFixed(3) + ')');
    elRecord.firstChild.setAttribute('transform', 'rotate(' + (S.seated ? S.spin : 0).toFixed(1) + ')');
    elPlatter.setAttribute('transform', 'translate(' + C.x + ',' + C.y + ') rotate(' + S.spin.toFixed(1) + ')');
    // arm
    if (!S.armDrag) S.armA += (S.armTarget - S.armA) * Math.min(1, dt * 7);
    elArmRot.setAttribute('transform', 'rotate(' + S.armA.toFixed(2) + ')');
    // needle over the grooves for long enough?
    if (S.armDrag && S.step === 2 && !S.armLocked) {
      var r = S.armA * Math.PI / 180, tx = P.x + Math.cos(r) * (ARM_L + 14), ty = P.y + Math.sin(r) * (ARM_L + 14);
      var d = Math.hypot(tx - C.x, ty - C.y);
      if (d > 50 && d < 122) { S.dwell += dt; if (S.dwell > 0.35) dropNeedle(); } else S.dwell = 0;
    }
    elKnobRot.setAttribute('transform', 'rotate(' + (-45 + S.knobV * 90).toFixed(1) + ')');
    elFader.setAttribute('transform', 'translate(' + (FADER.xL + S.faderV * (FADER.xR - FADER.xL)).toFixed(1) + ',' + FADER.y + ')');
    paintVu(dt);
  }
  requestAnimationFrame(frame);
  paintSteps();
})();
