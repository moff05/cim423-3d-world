---
layout: project
theme: music
order: 2
title: Music World
slug_label: Project 2
eyebrow: MUD Foundation · CIM 423 · University of Miami
tagline: A shared recording studio where the crowd decides who belongs at the top.
meta: MUD Foundation · JavaScript
font_url: https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;700&display=swap
links:
  - label: Enter the space
    url: https://verse.mud.foundation/qx7dtAx
    primary: true
sections:
  - {id: summary, label: Summary}
  - {id: space, label: The Rooms}
  - {id: play, label: Features}
  - {id: design, label: Design}
  - {id: media, label: Media}
  - {id: code, label: Code}
  - {id: credits, label: Credits}
scripts:
  - /assets/js/music.js
---

<div class="eq" aria-hidden="true">{% for i in (1..44) %}<i style="--d:{{ i | times: 37 | modulo: 11 | times: 0.09 }}s;--h:{{ i | times: 53 | modulo: 7 | times: 9 | plus: 35 }}%"></i>{% endfor %}</div>
<div class="ticker" aria-hidden="true"><div class="ticker-track"><span>ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★ ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★ ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★ ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★&nbsp;</span></div></div>

<h2 id="summary" class="reveal">Summary</h2>

<p class="lead reveal"><b>Music World</b> is a shared virtual recording studio in MUD Foundation. Visitors walk through four genre rooms (Rock, Hip-Hop, Electronic, Country), like their favorite artists, and watch the community's top four fill each room's All-Time Four frames. The space is never finished: it looks different after every visit, because the visitors decide who is on the wall. <a href="https://verse.mud.foundation/qx7dtAx" target="_blank" rel="noopener">Enter the space</a>.</p>

<figure class="video-card reveal">
<video controls preload="metadata" poster="/assets/images/music-world/walkthrough-poster.jpg" aria-label="Music World walkthrough, 2 minutes 43 seconds">
<source src="/assets/videos/music-world-walkthrough.mp4" type="video/mp4">
<track kind="captions" src="/assets/videos/music-world-walkthrough.vtt" srclang="en" label="English" default>
</video>
<figcaption>Walkthrough (2:43, sped up 1.5x): the hub, all four rooms, liking artists and the Encore button.</figcaption>
</figure>

<h2 id="space" class="reveal">The Rooms</h2>

<p class="reveal">A studio hub with four colored corridors. Each corridor matches the color of the room it leads to, and that is the wayfinding. Tap a room:</p>

<div class="rooms reveal">
  <div class="room-tabs" role="tablist">
    <button class="rt rock active" data-room="rock">Rock</button>
    <button class="rt hiphop" data-room="hiphop">Hip-Hop</button>
    <button class="rt electronic" data-room="electronic">Electronic</button>
    <button class="rt country" data-room="country">Country</button>
  </div>
  <div class="room-panel active" data-room="rock"><h3>Rock</h3><ul><li>Concert stage at the back with amps and a drum kit</li><li>Bar and a lounge up front, plus a clickable jukebox</li><li>"Sold Out Tonight" signs set the scene</li></ul></div>
  <div class="room-panel" data-room="hiphop"><h3>Hip-Hop</h3><ul><li>A walkable DJ riser in the middle of the room</li><li>Record shop along one wall</li><li>Block-party signs and graffiti</li></ul></div>
  <div class="room-panel" data-room="electronic"><h3>Electronic</h3><ul><li>Checkered dance floor with lasers</li><li>A walkable riser stage, a bar and a lounge</li><li>Arcade cabinets in the corners</li></ul></div>
  <div class="room-panel" data-room="country"><h3>Country</h3><ul><li>Corner stage you can walk onto</li><li>Saloon bar with a mirror and longhorn</li><li>Hay bales, string lights and a jukebox</li></ul></div>
</div>


<h2 id="play" class="reveal">Features</h2>

<div class="act-grid">
  <div class="act reveal"><span class="ic">Vote</span><h3>Like and unlike</h3><p>Click an artist, click again to undo. The top four per room move into the All-Time Four frames, and votes are stored permanently so the wall changes between visits.</p></div>
  <div class="act reveal"><span class="ic">Display</span><h3>Live boards</h3><p>Each room lists all 20 artists with live like counts, and the hub board shows each room's current leader.</p></div>
  <div class="act reveal"><span class="ic">Group</span><h3>Encore button</h3><p>Confetti and a light show for everyone in the room at once.</p></div>
  <div class="act reveal"><span class="ic">Social</span><h3>Lounges</h3><p>Sofas and bars in every room. Visitors talk over voice or text chat while they argue about rankings.</p></div>
  <div class="act reveal"><span class="ic">Ambient</span><h3>Audio zones</h3><p>Music changes as you walk between rooms, mixed low so voice chat stays clear.</p></div>
  <div class="act gold reveal"><span class="ic">Hunt</span><h3>Golden Record hunt</h3><p>One hidden record per room. Find all four to unlock a spinning gold trophy and confetti in the hub.</p></div>
</div>

<h2 id="design" class="reveal">Design Choices</h2>

<div class="design-grid reveal">
  <div><h3>Spatial design</h3><ul>
    <li>Hub-and-spoke layout: one hub, four corridors, four rooms, so nobody gets lost.</li>
    <li>Each room has its own palette, layout and set pieces (rock stage, hip-hop DJ riser, electronic dance floor, country saloon).</li>
    <li>Walls are solid and the stages are walkable, so the rooms feel like places.</li>
  </ul></div>
  <div><h3>Interaction</h3><ul>
    <li>One click to like, one click to undo, with a pop-up that confirms what you did.</li>
    <li>Empty frames say "Vote to fill this spot," so the goal is clear before you read anything.</li>
    <li>Encore and the like boards are shared, so what you do changes the room for everyone in it.</li>
  </ul></div>
  <div><h3>User experience</h3><ul>
    <li>A How To Play sign in the hub covers walking, looking, liking and the Encore button.</li>
    <li>Large, high-contrast signs, plus a "Back to the Studio" sign in every room.</li>
    <li>Music is mixed quiet so voice chat is never drowned out.</li>
  </ul></div>
  <div><h3>Limits</h3><ul>
    <li>Likes are once per artist per visit, since the platform has no per-person identity.</li>
    <li>Five of the 80 portraits are placeholder cards.</li>
    <li>Visitors use MUD's own avatar menu; custom avatars are not possible from the script.</li>
  </ul></div>
</div>

<h2 id="media" class="reveal">Media</h2>

<p class="reveal">Click any image to enlarge it.</p>

<div class="gallery reveal">
<figure><img src="/assets/images/music-world/hub.jpg" alt="The studio hub: four corridors, one per genre, and the How To Play sign." loading="lazy"><figcaption>The studio hub: four corridors, one per genre, and the How To Play sign.</figcaption></figure>
<figure><img src="/assets/images/music-world/rock.jpg" alt="Rock room: the All-Time Four frames above the concert stage." loading="lazy"><figcaption>Rock room: the All-Time Four frames above the concert stage.</figcaption></figure>
<figure><img src="/assets/images/music-world/hiphop.jpg" alt="Hip-Hop room: walkable DJ riser, record shop and the red Encore button." loading="lazy"><figcaption>Hip-Hop room: walkable DJ riser, record shop and the red Encore button.</figcaption></figure>
<figure><img src="/assets/images/music-world/electronic.jpg" alt="Electronic room: checkered dance floor, lasers and arcade cabinets." loading="lazy"><figcaption>Electronic room: checkered dance floor, lasers and arcade cabinets.</figcaption></figure>
<figure><img src="/assets/images/music-world/country.jpg" alt="Country room: the saloon, with a bar, longhorn and lounge." loading="lazy"><figcaption>Country room: the saloon, with a bar, longhorn and lounge.</figcaption></figure>
<figure><img src="/assets/images/music-world/country-boards.jpg" alt="The live like boards: every artist in the room, ranked by votes." loading="lazy"><figcaption>The live like boards: every artist in the room, ranked by votes.</figcaption></figure>
<figure><img src="/assets/images/music-world/like.jpg" alt="Click an artist and a toast confirms your like." loading="lazy"><figcaption>Click an artist and a toast confirms your like.</figcaption></figure>
<figure><img src="/assets/images/music-world/encore.jpg" alt="The Encore button fires confetti for everyone in the room." loading="lazy"><figcaption>The Encore button fires confetti for everyone in the room.</figcaption></figure>
</div>

<h2 id="code" class="reveal">Code</h2>

<p class="reveal">The whole world is one JavaScript file running inside the MUD XR Creator. These three pieces are the heart of it (trimmed for readability). The shared MUD <code>store</code> is what makes it multiplayer: every visitor reads and writes the same counters. <a href="https://github.com/moff05/cim423-3d-world/blob/main/assets/code/music-world-script.js" target="_blank" rel="noopener">View the full script on GitHub</a>.</p>

<div class="snip reveal"><h3>1. Like and unlike</h3><p>Every like is one shared counter in the MUD store. Clicking again undoes it, and the Liked time is saved so ties are broken fairly.</p><pre><code>async function like(b) {
  const a = b.a;
  if (pend[a.key]) return;            // ignore double-clicks while saving
  pend[a.key] = true;

  if (LIKED[a.key]) {                 // already liked -&gt; unlike
    LIKED[a.key] = 0;
    await store.inc(a.key, -1);
    showToast(&quot;UNLIKED: &quot; + a.name, 2);
  } else {                            // like
    LIKED[a.key] = 1;
    await store.inc(a.key, 1);
    await store.set(&quot;t:&quot; + a.key, Date.now());   // timestamp for tie-breaks
    showToast(&quot;LIKED: &quot; + a.name, 2);
  }

  pend[a.key] = false;
  await refresh();                    // re-read the store and re-rank the room
}</code></pre></div>

<div class="snip reveal"><h3>2. The All-Time Four</h3><p>Reads everyone's likes from the store, sorts each room's 20 artists, and puts the top four into the portrait frames.</p><pre><code>function rank(r, d) {               // d = the whole shared store
  ART[r.k].forEach((a) =&gt; {
    a.n = d[a.key] || 0;              // like count
    a.t = d[&quot;t:&quot; + a.key] || 0;       // time of latest like
  });

  const top = ART[r.k]
    .filter((a) =&gt; a.n &gt; 0)
    .sort((a, b) =&gt; b.n - a.n || a.t - b.t || (a.name &lt; b.name ? -1 : 1))
    .slice(0, 4);                     // most likes first, earliest like wins ties

  slots[r.k].forEach((slot, i) =&gt; show(r, slot, top[i], i));  // fill the 4 frames
}</code></pre></div>

<div class="snip reveal"><h3>3. Shared Encore button</h3><p>Pressing the pad bumps a counter in the store. Everyone in the room checks that counter every 1.5 seconds, and when it goes up they all see the confetti.</p><pre><code>async function encore(pad) {
  playEncore(pad);                              // my own confetti right away
  encSeen[pad.r.k] = await store.inc(&quot;enc:&quot; + pad.r.k, 1);
}

// in the update loop, every 1.5 seconds:
const room = zoneAt(cpos.x, cpos.z);            // which room am I standing in?
const count = await store.get(&quot;enc:&quot; + room, 0);
if (count &gt; encSeen[room]) playEncore(pad);     // someone else pressed it
encSeen[room] = count;</code></pre></div>

<h2 id="credits" class="reveal">Credits</h2>

<details class="reveal"><summary>Models, sounds and image sources</summary>

Furniture: Kenney Furniture Kit (CC0). Concert stage model: downloaded by me, original source and license unknown. Guitar: Quaternius (CC0). DJ Booth by Fredi L (CC-BY), via Poly Pizza. Artist portraits were supplied separately and their reuse rights are unverified.

</details>
