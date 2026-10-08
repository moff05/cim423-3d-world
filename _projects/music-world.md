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
  - {id: idea, label: The Idea}
  - {id: space, label: The Space}
  - {id: together, label: Together}
  - {id: play, label: Things To Do}
  - {id: return, label: Coming Back}
  - {id: credits, label: Credits}
scripts:
  - /assets/js/music.js
---

<div class="eq" aria-hidden="true">{% for i in (1..44) %}<i style="--d:{{ i | times: 37 | modulo: 11 | times: 0.09 }}s;--h:{{ i | times: 53 | modulo: 7 | times: 9 | plus: 35 }}%"></i>{% endfor %}</div>
<div class="ticker" aria-hidden="true"><div class="ticker-track"><span>ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★ ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★ ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★ ROCK ★ HIP-HOP ★ ELECTRONIC ★ COUNTRY ★&nbsp;</span></div></div>

<h2 id="idea" class="reveal">The Idea</h2>

<div class="lead reveal">

Music World is a shared virtual recording studio in MUD Foundation where music fans settle the question of who belongs at the top. A central studio hub leads to four genre rooms, each with 20 artists, a lounge, and its own music. Every visitor can like or unlike artists, and the four most-liked in each room are displayed in that room's **All-Time Four** frames, so the space is shaped by everyone who has visited.

Visitors do more than vote. A shared Encore button sets off confetti and a lighting show for everyone in the room, a hidden Golden Record in each room rewards exploring, and the lounges give people a place to talk over voice chat. The whole space was scripted in JavaScript inside the MUD XR Creator, using its shared store to keep votes between visits.

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
  <div><span class="ic">🖼️</span><h3>All-Time Four frames</h3><p><b>Community-generated collection.</b> Like artists on the wall of 20 buttons and the top four portraits move into the frames. The room reflects everyone who has visited.</p></div>
  <div><span class="ic">📊</span><h3>Live boards</h3><p><b>Information display.</b> Read the like counts for all 20 artists in a room, or the hub board showing each room's top artist. Great for arguing about rankings.</p></div>
  <div><span class="ic">🛋️</span><h3>Lounges</h3><p><b>Group interaction area.</b> Sit near the furniture and chat by voice or text. It turns a voting page into a place to hang out.</p></div>
</div>

<h3 class="reveal">Try it: vote like a visitor</h3>

<div class="demo reveal" id="likeDemo">
  <p class="demo-note">A tiny demo of the All-Time Four (resets when you refresh). Like artists and watch the top four change.</p>
  <ol class="demo-list"></ol>
</div>

<h2 id="play" class="reveal">Things To Do</h2>

<div class="act-grid">
  <div class="act reveal"><span class="ic">❤️</span><h3>Like and unlike</h3><p>Click an artist, click again to undo. Frames re-rank.</p></div>
  <div class="act reveal"><span class="ic">🔴</span><h3>Encore button</h3><p>Confetti and a light show for everyone in the room.</p></div>
  <div class="act reveal"><span class="ic">📻</span><h3>Jukebox</h3><p>Cycle the room's music for yourself.</p></div>
  <div class="act reveal"><span class="ic">🎧</span><h3>Audio zones</h3><p>Music changes as you walk between rooms, mixed low so voice chat stays clear.</p></div>
  <div class="act gold reveal"><span class="ic">📀</span><h3>Golden Record hunt</h3><p>One hidden record per room. Find all four to unlock a spinning gold trophy and confetti in the hub.</p></div>
</div>

<h2 id="return" class="reveal">Coming Back</h2>

<p class="reveal lead">Votes are stored permanently, so the All-Time Four can change between visits, and the Golden Record hunt gives a reason to explore all four rooms. The lounges are where visitors meet and trade opinions.</p>

<details class="reveal"><summary>Honest limitations</summary>

- A visitor can like each artist once per visit. I could not find a per-person identity in the platform, so someone who comes back later can like again.
- Five of the 80 portraits are placeholder cards because those images could not be generated.
- I verified the build in a live session: all 80 portraits load, the scripts start without errors, and the likes reset cleanly. My automated browser could not register mouse clicks, so the like buttons, encore buttons, jukebox and Golden Records were tested by hand, not by script.
- Players cannot get custom avatars from the script, so visitors use MUD's own avatar menu.

</details>

<h2 id="credits" class="reveal">Credits</h2>

<details class="reveal"><summary>Models, sounds and image sources</summary>

Furniture: Kenney Furniture Kit (CC0). Concert stage model: downloaded by me, original source and license unknown. Guitar: Quaternius (CC0). DJ Booth by Fredi L (CC-BY), via Poly Pizza. Artist portraits were supplied separately and their reuse rights are unverified.

</details>
