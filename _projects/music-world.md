---
layout: project
theme: music
order: 2
video: /assets/videos/music-world-walkthrough.mp4
poster: /assets/images/music-world/walkthrough-poster.jpg
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
  - {id: idea, label: The Idea}
  - {id: space, label: The Space}
  - {id: together, label: Together}
  - {id: play, label: Things To Do}
  - {id: return, label: Coming Back}
  - {id: media, label: Media}
  - {id: code, label: Code}
  - {id: credits, label: Credits}
scripts:
  - /assets/js/music.js
---

<div class="eq" aria-hidden="true">{% for i in (1..44) %}<i style="--d:{{ i | times: 37 | modulo: 11 | times: 0.09 }}s;--h:{{ i | times: 53 | modulo: 7 | times: 9 | plus: 35 }}%"></i>{% endfor %}</div>
<div class="ticker" aria-hidden="true"><div class="ticker-track"><span>ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★ ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★ ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★ ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★&nbsp;</span></div></div>

<h2 id="summary" class="reveal">Summary</h2>

<p class="lead reveal"><b>Music World</b> is a shared virtual recording studio in MUD Foundation. Visitors walk through four genre rooms (Rock, Hip-Hop, Electronic, Country), like their favorite artists, and watch the community's top four fill each room's All-Time Four frames. Hit the Encore button for a group light show, or hunt for the hidden Golden Records. <a href="https://verse.mud.foundation/qx7dtAx">Enter the space</a> or <a href="#code">see the code</a>.</p>

<h2 id="idea" class="reveal">The Idea</h2>

<div class="lead reveal">
<p>Music World is a shared virtual recording studio in MUD Foundation where music fans settle the question of who belongs at the top. A central studio hub leads to four genre rooms, each with 20 artists, a lounge, and its own music. Every visitor can like or unlike artists, and the four most-liked in each room are displayed in that room's <b>All-Time Four</b> frames, so the space is shaped by everyone who has visited.</p>
<p>Visitors do more than vote. A shared Encore button sets off confetti and a lighting show for everyone in the room, a hidden Golden Record in each room rewards exploring, and the lounges give people a place to talk over voice chat. The whole space was scripted in JavaScript inside the MUD XR Creator, using its shared store to keep votes between visits.</p>
</div>

<div class="callout reveal"><b>Who it's for</b> Casual music fans and classmates who already have strong opinions. The space is never finished: the frames show whatever the community has picked so far, so the room looks different after every visit.</div>

<h2 id="space" class="reveal">The Space</h2>

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

<p class="reveal">Every room has a lounge and a "Back to the Studio" sign. The empty All-Time Four frames ("Vote to fill this spot") tell you what to do before you read any instructions.</p>

<h2 id="together" class="reveal">Together</h2>

<div class="trio reveal">
  <div><span class="ic">Collection</span><h3>All-Time Four frames</h3><p><b>Community-generated collection.</b> Like artists on the wall of 20 buttons and the top four portraits move into the frames. The room reflects everyone who has visited.</p></div>
  <div><span class="ic">Display</span><h3>Live boards</h3><p><b>Information display.</b> Read the like counts for all 20 artists in a room, or the hub board showing each room's top artist. Great for arguing about rankings.</p></div>
  <div><span class="ic">Social</span><h3>Lounges</h3><p><b>Group interaction area.</b> Sit near the furniture and chat by voice or text. It turns a voting page into a place to hang out.</p></div>
</div>

<h2 id="play" class="reveal">Things To Do</h2>

<div class="act-grid">
  <div class="act reveal"><span class="ic">Vote</span><h3>Like and unlike</h3><p>Click an artist, click again to undo. Frames re-rank.</p></div>
  <div class="act reveal"><span class="ic">Group</span><h3>Encore button</h3><p>Confetti and a light show for everyone in the room.</p></div>
  <div class="act reveal"><span class="ic">Solo</span><h3>Jukebox</h3><p>Cycle the room's music for yourself.</p></div>
  <div class="act reveal"><span class="ic">Ambient</span><h3>Audio zones</h3><p>Music changes as you walk between rooms, mixed low so voice chat stays clear.</p></div>
  <div class="act gold reveal"><span class="ic">Hunt</span><h3>Golden Record hunt</h3><p>One hidden record per room. Find all four to unlock a spinning gold trophy and confetti in the hub.</p></div>
</div>

<h2 id="return" class="reveal">Coming Back</h2>

<p class="reveal lead">Votes are stored permanently, so the All-Time Four can change between visits, and the Golden Record hunt gives a reason to explore all four rooms. The lounges are where visitors meet and trade opinions.</p>

<details class="reveal"><summary>Honest limitations</summary>
<ul>
<li>A visitor can like each artist once per visit. I could not find a per-person identity in the platform, so someone who comes back later can like again.</li>
<li>Five of the 80 portraits are placeholder cards because those images could not be generated.</li>
<li>I verified the build in a live session: all 80 portraits load, the scripts start without errors, and the likes reset cleanly. My automated browser could not register mouse clicks, so the like buttons, encore buttons, jukebox and Golden Records were tested by hand, not by script.</li>
<li>Players cannot get custom avatars from the script, so visitors use MUD's own avatar menu.</li>
</ul>
</details>

<h2 id="media" class="reveal">Media</h2>

<div class="gallery reveal" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr));gap:14px">
<figure style="margin:0"><a href="/assets/images/music-world/hub.jpg" target="_blank" rel="noopener"><img src="/assets/images/music-world/hub.jpg" alt="The studio hub: four corridors, one per genre, and the How To Play sign." loading="lazy" style="width:100%;border-radius:8px;display:block"></a><figcaption style="font-size:1em;opacity:.9;margin-top:6px">The studio hub: four corridors, one per genre, and the How To Play sign.</figcaption></figure>
<figure style="margin:0"><a href="/assets/images/music-world/rock.jpg" target="_blank" rel="noopener"><img src="/assets/images/music-world/rock.jpg" alt="Rock room: the All-Time Four frames above the concert stage." loading="lazy" style="width:100%;border-radius:8px;display:block"></a><figcaption style="font-size:1em;opacity:.9;margin-top:6px">Rock room: the All-Time Four frames above the concert stage.</figcaption></figure>
<figure style="margin:0"><a href="/assets/images/music-world/hiphop.jpg" target="_blank" rel="noopener"><img src="/assets/images/music-world/hiphop.jpg" alt="Hip-Hop room: walkable DJ riser, record shop and the red Encore button." loading="lazy" style="width:100%;border-radius:8px;display:block"></a><figcaption style="font-size:1em;opacity:.9;margin-top:6px">Hip-Hop room: walkable DJ riser, record shop and the red Encore button.</figcaption></figure>
<figure style="margin:0"><a href="/assets/images/music-world/electronic.jpg" target="_blank" rel="noopener"><img src="/assets/images/music-world/electronic.jpg" alt="Electronic room: checkered dance floor, lasers and arcade cabinets." loading="lazy" style="width:100%;border-radius:8px;display:block"></a><figcaption style="font-size:1em;opacity:.9;margin-top:6px">Electronic room: checkered dance floor, lasers and arcade cabinets.</figcaption></figure>
<figure style="margin:0"><a href="/assets/images/music-world/country.jpg" target="_blank" rel="noopener"><img src="/assets/images/music-world/country.jpg" alt="Country room: the saloon, with a bar, longhorn and lounge." loading="lazy" style="width:100%;border-radius:8px;display:block"></a><figcaption style="font-size:1em;opacity:.9;margin-top:6px">Country room: the saloon, with a bar, longhorn and lounge.</figcaption></figure>
<figure style="margin:0"><a href="/assets/images/music-world/country-boards.jpg" target="_blank" rel="noopener"><img src="/assets/images/music-world/country-boards.jpg" alt="The live like boards: every artist in the room, ranked by votes." loading="lazy" style="width:100%;border-radius:8px;display:block"></a><figcaption style="font-size:1em;opacity:.9;margin-top:6px">The live like boards: every artist in the room, ranked by votes.</figcaption></figure>
<figure style="margin:0"><a href="/assets/images/music-world/like.jpg" target="_blank" rel="noopener"><img src="/assets/images/music-world/like.jpg" alt="Click an artist and a toast confirms your like." loading="lazy" style="width:100%;border-radius:8px;display:block"></a><figcaption style="font-size:1em;opacity:.9;margin-top:6px">Click an artist and a toast confirms your like.</figcaption></figure>
<figure style="margin:0"><a href="/assets/images/music-world/encore.jpg" target="_blank" rel="noopener"><img src="/assets/images/music-world/encore.jpg" alt="The Encore button fires confetti for everyone in the room." loading="lazy" style="width:100%;border-radius:8px;display:block"></a><figcaption style="font-size:1em;opacity:.9;margin-top:6px">The Encore button fires confetti for everyone in the room.</figcaption></figure>
</div>

<h2 id="code" class="reveal">Code</h2>

<p class="reveal">The whole world is one JavaScript file running inside the MUD XR Creator. These three pieces are the heart of it (trimmed for readability). The shared MUD <code>store</code> is what makes it multiplayer: every visitor reads and writes the same counters.</p>

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

<p class="reveal snip-full"><a href="/assets/code/music-world-script.js" target="_blank" rel="noopener">Full script (about 2,000 lines, plain text)</a></p>

<h2 id="credits" class="reveal">Credits</h2>

<details class="reveal"><summary>Models, sounds and image sources</summary>

Furniture: Kenney Furniture Kit (CC0). Concert stage model: downloaded by me, original source and license unknown. Guitar: Quaternius (CC0). DJ Booth by Fredi L (CC-BY), via Poly Pizza. Artist portraits were supplied separately and their reuse rights are unverified.

</details>
