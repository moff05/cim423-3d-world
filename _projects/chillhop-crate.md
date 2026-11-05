---
layout: project
theme: chillhop
order: 3
title: Night Shift Vinyl
slug_label: Project 3
eyebrow: Unity · Meta Quest · CIM 423 · University of Miami
thumb: /assets/images/chillhop/room-front.jpg
tagline: A lo-fi vinyl lounge you run with nothing but your bare hands.
meta: Unity · Hand Tracking
font_url: https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;700&family=Fraunces:ital,wght@1,800&display=swap
links:
  - label: Code on GitHub
    url: https://github.com/moff05/cim423-3d-world/tree/main/assets/code/chillhop
    primary: true
sections:
  - {id: watch, label: Watch}
  - {id: summary, label: Summary}
  - {id: hands, label: Interactions}
  - {id: media, label: Screenshots}
  - {id: code, label: Code}
  - {id: apk, label: APK}
  - {id: credits, label: Credits}
scripts:
  - /assets/js/chillhop-demo.js
  - /assets/js/chillhop.js
---
<h2 id="watch" class="reveal">Watch the session</h2>

<figure class="video-card reveal">
<video controls preload="metadata" playsinline poster="{{ site.baseurl }}/assets/images/chillhop/walkthrough-poster.jpg" aria-label="Night Shift Vinyl walkthrough">
<source src="{{ site.baseurl }}/assets/videos/chillhop-walkthrough.mp4" type="video/mp4">
</video>
<figcaption>Walkthrough: the full session from START SESSION to SESSION MASTERED, recorded in a Quest 3 with hand tracking. That is me playing it, bottom right.</figcaption>
</figure>

<h2 id="summary" class="reveal">Summary</h2>

<p class="lead reveal"><b>Night Shift Vinyl</b> is a VR task simulation for Meta Quest that you control with your bare hands, no controllers. You stand behind a warm, mood-lit vinyl DJ desk and build a lo-fi track one gesture at a time. A floating panel introduces the task and tracks your progress, and a slate at the end shows your session time.</p>

<ol class="tracks reveal">
  <li><h3>Load the record</h3><span class="gesture">Pinch · Place</span><p>Pinch the record out of its crate and set it on the platter. It spins up with a quiet motor hum.</p></li>
  <li><h3>Drop the needle</h3><span class="gesture">Pinch · Swing</span><p>Swing the tonearm over the record. The needle drops, crackle fades in, then a drum beat follows.</p></li>
  <li><h3>Trigger the beat pad</h3><span class="gesture">Poke · Tap</span><p>Tap the orange pad with a fingertip. A piano loop enters on the next bar, locked to the drums.</p></li>
  <li><h3>Open the filter</h3><span class="gesture">Pinch · Twist</span><p>Turn the dial and the muffled mix opens up to full fidelity.</p></li>
  <li><h3>Push the master fader</h3><span class="gesture">Pinch · Slide</span><p>Slide the flat fader along the front of the board from quiet to full volume.</p></li>
</ol>

<p class="reveal"><b>Poke</b> means press with one fingertip; <b>pinch</b> means thumb and index finger together. The next control to use gets a pulsing outline. When the last step lands, the lamp dims, neon pulses to the beat, and a <b>SESSION MASTERED</b> slate offers a <b>RESTART SESSION</b> button. An <b>EXIT GAME</b> button is always available.</p>

<h2 id="hands" class="reveal">Interesting interactions</h2>

<div class="act-grid">
  <div class="act reveal"><span class="ic">Tonearm</span><h3>A real hinge</h3><p>The script measures the angle of your pinch around the pivot every frame, so the arm follows your hand like it is on a bearing. Let go early and it glides back to rest. There is no button: the position of your hand is the control.</p></div>
  <div class="act reveal"><span class="ic">Filter dial</span><h3>Twist it or circle it</h3><p>Roll your wrist or move your hand around the dial, in either direction. It adds up the change in angle, so a dropped tracking frame never makes it jump.</p></div>
  <div class="act reveal"><span class="ic">Drum pad</span><h3>Poke, not pinch</h3><p>The pad cap travels with your fingertip and only fires near the bottom of its travel, so brushing it does nothing. It flashes amber and springs back when you lift your finger.</p></div>
  <div class="act reveal"><span class="ic">The record</span><h3>It cannot get lost</h3><p>It cannot sink through the furniture, it settles flat when you let go, and if you drop it away from the desk it glides back to the crate.</p></div>
</div>

<p class="reveal">Hands cannot rumble, so the feedback is in sound and light: a chime on every step, the pad flash, the platter hum and the pulsing outline. I tuned all of this on a Quest 3, where real hands exposed problems the Editor never showed.</p>

<h2 id="media" class="reveal">Screenshots</h2>

<div class="gallery reveal">
<figure><img src="{{ site.baseurl }}/assets/images/chillhop/01-start.jpg" alt="The welcome panel, checklist and START SESSION button." loading="lazy" width="1600" height="900"><figcaption>The welcome panel, checklist and START SESSION button.</figcaption></figure>
<figure><img src="{{ site.baseurl }}/assets/images/chillhop/02-vinyl.jpg" alt="Step 1: pinching the record out of its crate." loading="lazy" width="1600" height="900"><figcaption>Step 1: pinching the record out of its crate.</figcaption></figure>
<figure><img src="{{ site.baseurl }}/assets/images/chillhop/03-tonearm.jpg" alt="Step 2: swinging the tonearm over the record." loading="lazy" width="1600" height="900"><figcaption>Step 2: swinging the tonearm over the record.</figcaption></figure>
<figure><img src="{{ site.baseurl }}/assets/images/chillhop/04-pad.jpg" alt="Step 3: the orange pad, level meter and dial." loading="lazy" width="1600" height="900"><figcaption>Step 3: the orange pad, level meter and dial.</figcaption></figure>
<figure><img src="{{ site.baseurl }}/assets/images/chillhop/05-filter.jpg" alt="Step 4: twisting the low-pass dial." loading="lazy" width="1600" height="900"><figcaption>Step 4: twisting the low-pass dial.</figcaption></figure>
<figure><img src="{{ site.baseurl }}/assets/images/chillhop/07-fader.jpg" alt="Step 5: sliding the master fader." loading="lazy" width="1600" height="900"><figcaption>Step 5: sliding the master fader.</figcaption></figure>
<figure><img src="{{ site.baseurl }}/assets/images/chillhop/06-complete.jpg" alt="The finale: SESSION MASTERED and a RESTART button." loading="lazy" width="1600" height="900"><figcaption>The finale: SESSION MASTERED and a RESTART button.</figcaption></figure>
<figure><img src="{{ site.baseurl }}/assets/images/chillhop/room-front.jpg" alt="The room from where you stand." loading="lazy" width="1600" height="900"><figcaption>The room from where you stand.</figcaption></figure>
<figure><img src="{{ site.baseurl }}/assets/images/chillhop/room-deck.jpg" alt="The desk from above: turntable, mixer and record crate." loading="lazy" width="1600" height="900"><figcaption>The desk from above: turntable, mixer and record crate.</figcaption></figure>
</div>

<h2 id="code" class="reveal">Code</h2>

<table class="reveal">
<tr><th>Link to code</th><td><a href="https://github.com/moff05/cim423-3d-world/tree/main/assets/code/chillhop" target="_blank" rel="noopener">github.com/moff05/cim423-3d-world / assets / code / chillhop</a></td></tr>
<tr><th>Built with</th><td>Claude Code (Anthropic) wrote the C# scripts, Blender models, textures and audio from my direction. A state machine accepts the five steps only in order, and the room is rebuilt from code by <code>ChillhopBuilder</code>. The <a href="https://github.com/moff05/cim423-3d-world/blob/main/assets/code/chillhop/SETUP.md" target="_blank" rel="noopener">setup guide</a> is in the repo.</td></tr>
<tr><th>Engine</th><td>Unity 6, XR Interaction Toolkit 3.6, OpenXR, XR Hands</td></tr>
</table>

<h2 id="apk" class="reveal">APK</h2>

<table class="reveal">
<tr><th>Download</th><td><a href="{{ site.baseurl }}/assets/downloads/nightshiftvinyl.apk" download>nightshiftvinyl.apk</a> (52 MB)</td></tr>
<tr><th>Device</th><td>Meta Quest 3 (also Quest 2 and Pro), hand tracking turned on</td></tr>
<tr><th>Install</th><td>Turn on Developer Mode, plug the headset into a computer and run <code>adb install -r nightshiftvinyl.apk</code>. Then open it from <b>Library</b>, using the filter at the top right to show <b>Unknown Sources</b>. Put the controllers down and use your hands.</td></tr>
</table>

<h2 id="credits" class="reveal">Credits</h2>

<p class="reveal"><b>No downloaded assets.</b> The 3D models, textures, posters and audio were all made for this project by Claude, using Python scripts in Blender and generated sounds. Third-party tools: Unity with the XR Interaction Toolkit and XR Hands (including the toolkit's hands sample rig), Blender, and the web fonts DM Sans, DM Mono and Fraunces from Google Fonts.</p>

<button type="button" class="demo-fab" id="demo-fab" aria-label="Play the browser demo" data-open-demo><span class="demo-fab-ic"><svg class="ico-play" viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0l10 6-10 6z" fill="currentColor"/></svg></span><span class="demo-fab-tip">Try it in your browser</span></button>

<div class="demo-modal" id="demo-modal" hidden role="dialog" aria-modal="true" aria-label="Play Night Shift Vinyl in your browser">
<div class="demo-modal-card">
<button type="button" class="demo-close" id="demo-close" aria-label="Close the demo">×</button>
<p class="demo-modal-lead"><b>Try it here.</b> The same five steps, the same audio as the Quest build. Drag with a mouse or finger where the headset uses a pinch, and tap the pad where it uses a poke. Headphones help.</p>
<div class="demo-wrap" id="demo-mount"><noscript><p>The playable desk needs JavaScript. The video and screenshots on this page show the same session.</p></noscript></div>
<p class="demo-note">This is a demo of the design. The graded build is the Quest app below.</p>
</div>
</div>
