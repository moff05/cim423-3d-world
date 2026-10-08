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
---

<div class="stat-row">
  <div><b>4</b><span>genre rooms</span></div>
  <div><b>80</b><span>artists</span></div>
  <div><b>4</b><span>golden records</span></div>
  <div><b>1</b><span>shared crowd</span></div>
</div>

<h2 id="idea">The Idea</h2>

Music World is a shared virtual recording studio in MUD Foundation where music fans settle the question of who belongs at the top. A central studio hub leads to four genre rooms (Rock, Hip-Hop, Electronic, Country), each with 20 artists, a lounge, and its own music. Every visitor can like or unlike artists, and the four most-liked in each room are displayed in that room's **All-Time Four** frames, so the space is shaped by everyone who has visited.

Visitors do more than vote. A shared Encore button sets off confetti and a lighting show for everyone in the room, a hidden Golden Record in each room rewards exploring, and the lounges give people a place to talk over voice chat. The whole space was scripted in JavaScript inside the MUD XR Creator, using its shared store to keep votes between visits.

### Who it's for

Casual music fans and classmates: people who already have strong opinions and want a quick, low-friction way to show them. The reason to visit is that the space is never finished. The frames show whatever the community has picked so far, so the room looks different after every visit.

<h2 id="space">The Space</h2>

**The studio hub.** Every sign sits on a wall in its own spot: the title, a how-to-play board, a welcome panel, a Golden Records tracker and a live "Community Right Now" board showing each room's top artist and the total likes. Four colored corridors lead out to the rooms, and each corridor's color matches the room it goes to. That is the wayfinding.

<div class="room-grid">
  <div class="room rock"><h3>Rock</h3><p>Amps, a drum kit and a big concert stage. "Sold Out Tonight."</p></div>
  <div class="room hiphop"><h3>Hip-Hop</h3><p>A block-party stage, a DJ riser you can walk onto, and a record shop.</p></div>
  <div class="room electronic"><h3>Electronic</h3><p>A checkered dance floor, lasers and arcades.</p></div>
  <div class="room country"><h3>Country</h3><p>Hay bales, string lights, a saloon bar and a corner stage.</p></div>
</div>

Every room has its own look, a lounge with sofas, tables and a rug, and a "Back to the Studio" sign above its door. The empty All-Time Four frames ("Vote to fill this spot") tell you what to do before you read any instructions.

<h2 id="together">Together</h2>

Three collaborative features carry the space:

| Feature | Purpose | How visitors use it | How it shapes the space |
|---|---|---|---|
| **All-Time Four frames** (community-generated content collection) | Show the community's taste | Like artists on the wall of 20 buttons; the top four portraits appear in the frames | The frames change as votes come in, so the room reflects everyone who has visited |
| **Artist boards and community board** (information and media display) | Make the current standings visible | Read the live like counts for all 20 artists in a room, or the hub board with each room's top artist and total likes | Visitors can compare and argue over the rankings |
| **Lounges** (area for discussion and group interaction) | Give people a reason to stay and talk | Sit near the furniture and chat by voice or text with whoever else is in the room | Turns a voting page into a place to hang out |

<h2 id="play">Things To Do</h2>

<ul class="feature-list">
  <li><b>Like and unlike.</b> Click an artist to like them and click again to unlike. A message confirms it, the count persists between visits, and the All-Time Four frames re-rank.</li>
  <li><b>Encore button.</b> A big red button in each room triggers a confetti shower and a lighting show for everyone in that room, within a couple of seconds, so a group can celebrate together.</li>
  <li><b>Jukebox.</b> Click it in the Rock or Country room to cycle that room's music for yourself.</li>
  <li><b>Audio zones.</b> The hub and each room have their own music. It switches as you walk between them, and it is mixed quietly so voice chat stays clear.</li>
  <li><b>Golden Record hunt.</b> One hidden record per room. Each find shows a message, and the hub counter tracks your total. Finding all four unlocks a spinning gold trophy and a confetti shower in the hub.</li>
</ul>

<h2 id="return">Coming Back</h2>

Votes are stored permanently, so the All-Time Four can change between visits, and the Golden Record hunt gives a reason to explore all four rooms. The lounges are where visitors meet and trade opinions.

### Honest limitations

- A visitor can like each artist once per visit. I could not find a per-person identity in the platform, so someone who comes back later can like again.
- Five of the 80 portraits are placeholder cards because those images could not be generated.
- I verified the build in a live session: all 80 portraits load, the scripts start without errors, and the likes reset cleanly. My automated browser could not register mouse clicks, so the like buttons, encore buttons, jukebox and Golden Records were tested by hand, not by script.
- Players cannot get custom avatars from the script, so visitors use MUD's own avatar menu.

<h2 id="credits">Credits</h2>

Furniture: Kenney Furniture Kit (CC0). Concert stage model: downloaded by me, original source and license unknown. Guitar: Quaternius (CC0). DJ Booth by Fredi L (CC-BY), via Poly Pizza. Artist portraits were supplied separately and their reuse rights are unverified.
