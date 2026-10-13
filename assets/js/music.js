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
})();
