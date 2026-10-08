(function () {
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

  // room tabs recolor the page accent
  var colors = { rock: '#ff4d4d', hiphop: '#ffc83d', electronic: '#22e1ff', country: '#ff9a3d' };
  document.querySelectorAll('.rt').forEach(function (b) {
    b.addEventListener('click', function () {
      var r = b.getAttribute('data-room');
      document.querySelectorAll('.rt').forEach(function (x) { x.classList.toggle('active', x === b); });
      document.querySelectorAll('.room-panel').forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-room') === r); });
      document.body.style.setProperty('--accent', colors[r]);
    });
  });

  // like demo
  var list = document.querySelector('.demo-list');
  if (list) {
    var artists = [
      { n: 'Queen', g: 'Rock', l: 0 }, { n: 'Tupac', g: 'Hip-Hop', l: 0 },
      { n: 'Daft Punk', g: 'Electronic', l: 0 }, { n: 'Alan Jackson', g: 'Country', l: 0 },
      { n: 'Drake', g: 'Hip-Hop', l: 0 }, { n: 'Miranda Lambert', g: 'Country', l: 0 }
    ];
    var liked = {};
    function render() {
      var sorted = artists.slice().sort(function (a, b) { return b.l - a.l; });
      list.innerHTML = '';
      sorted.forEach(function (a, i) {
        var li = document.createElement('li');
        if (i < 4 && a.l > 0) li.className = 'top';
        li.innerHTML = '<span class="rk">' + (i < 4 && a.l > 0 ? '★' : i + 1) + '</span><span class="nm">' + a.n + '<small>' + a.g + '</small></span>' +
          '<button class="lk' + (liked[a.n] ? ' on' : '') + '" aria-label="Like ' + a.n + '">♥ <b>' + a.l + '</b></button>';
        li.querySelector('button').addEventListener('click', function () {
          liked[a.n] = !liked[a.n]; a.l += liked[a.n] ? 1 : -1; render();
        });
        list.appendChild(li);
      });
    }
    render();
  }
})();
