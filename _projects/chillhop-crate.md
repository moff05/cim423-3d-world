---
layout: project
theme: chillhop
order: 3
title: The Chillhop Crate
slug_label: Project 3
eyebrow: Unity · Meta Quest · CIM 423 · University of Miami
thumb: /assets/images/chillhop/01-start.jpg
tagline: A lo-fi vinyl lounge you run with nothing but your bare hands.
meta: Unity · Hand Tracking
font_url: https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;700&family=Fraunces:ital,wght@1,800&display=swap
links:
  - label: Code on GitHub
    url: https://github.com/moff05/cim423-3d-world/tree/main/assets/code/chillhop
    primary: true
sections:
  - {id: play, label: Play it}
  - {id: summary, label: Summary}
  - {id: session, label: The Session}
  - {id: hands, label: Hand Tracking}
  - {id: media, label: Media}
  - {id: code, label: Code}
  - {id: setup, label: Setup}
  - {id: apk, label: APK}
  - {id: credits, label: Credits}
scripts:
  - /assets/js/chillhop-demo.js
  - /assets/js/chillhop.js
---

<h2 id="play" class="reveal">Play the session</h2>

<p class="lead reveal">This is the real flow from the headset, rebuilt for the browser so you can try it right now. Same five steps, same order, same audio files as the Quest build. Drag with a mouse or finger where the sim uses a pinch, and tap the pads where it uses a poke.</p>

<div class="demo-wrap" id="demo-mount"><noscript><p>The playable desk needs JavaScript. The screenshots and code below show the same session.</p></noscript></div>
<p class="demo-note">Headphones help. On a phone, turn it sideways for a bigger desk. The browser version is a demo of the design; the graded build is the Quest app below.</p>

<h2 id="summary" class="reveal">Summary</h2>

<p class="lead reveal"><b>The Chillhop Crate</b> is a stationary VR task simulation for Meta Quest, controlled entirely with optical hand tracking, no controllers. You stand (or sit) behind a warm, mood-lit vinyl DJ desk and build a lo-fi track one gesture at a time: load a record, drop the needle, tap a drum pad, open a filter, push up the master fader. Every step is a real, tactile hand action, and every step changes what you hear.</p>

<div class="callout reveal"><b>Why it suits hand tracking</b>Nothing moves you through space and nothing needs a fast arm swing. Every interaction is a natural gesture your hands already know: pinch an edge, set something down, poke a soft pad, turn a knob, push a slider.</div>

<table class="reveal">
<tr><th>Project title</th><td>The Chillhop Crate: Lo-Fi Vinyl Lounge</td></tr>
<tr><th>Platform</th><td>Meta Quest 3, optical hand tracking only</td></tr>
<tr><th>Engine</th><td>Unity 6, XR Interaction Toolkit 3.x, OpenXR, XR Hands</td></tr>
<tr><th>Interactions</th><td>5 required, plus a start menu and a conclusion</td></tr>
</table>

<h2 id="session" class="reveal">The Session</h2>

<p class="reveal">A floating wooden panel above the desk welcomes you and lists the five steps. Poke the <b>START SESSION</b> button and the checklist comes alive: the step you are on glows amber, finished steps tick off in green.</p>

<div class="hud reveal"><small>Checklist panel</small>
<b>[X]</b> 1. Load Vinyl Platter<br>
<span class="cur">[ ] 2. Drop the Stylus Needle</span><br>
[ ] 3. Trigger Beat Sample Pad<br>
[ ] 4. Open Low-Pass Filter<br>
[ ] 5. Push Master Output Fader</div>

<ol class="tracks reveal">
  <li><h3>Load Vinyl Platter</h3><span class="gesture">Pinch · Place</span><p>Pinch the record out of its sleeve and set it on the platter. A trigger zone waits for you to let go, then glides the disc onto the spindle. The platter spins up smoothly and a quiet motor hum starts.</p></li>
  <li><h3>Drop the Stylus Needle</h3><span class="gesture">Pinch · Swing</span><p>Pinch the tonearm handle and swing the arm over the spinning record. When the needle is over the groove it drops into contact: surface crackle fades in, then a muted lo-fi drum beat follows.</p></li>
  <li><h3>Trigger Beat Sample Pad</h3><span class="gesture">Poke · Tap</span><p>Tap the glowing silicone pad with your index finger. It depresses under your fingertip, flashes neon amber, and a warm electric piano loop enters on the next bar, locked to the drums.</p></li>
  <li><h3>Open Low-Pass Filter</h3><span class="gesture">Pinch · Twist</span><p>The whole mix starts muffled at 800 Hz. Grab the chunky analog dial and turn it 90 degrees clockwise. The cutoff sweeps from 800 Hz to 20,000 Hz and the mix opens up to full fidelity.</p></li>
  <li><h3>Push Master Output Fader</h3><span class="gesture">Pinch · Push</span><p>Push the vertical fader from the bottom (30 percent volume) to the top (100 percent). The master level swells with your hand.</p></li>
</ol>

<h3 class="reveal">The finale</h3>
<p class="reveal">When the last step lands, the warm golden desk lamp dims and colored neon accents begin to pulse slowly with the beat. A slate drops in from above reading <b>SESSION MASTERED - 100% GROOVE</b>, shows your session time, and offers a <b>RESTART SESSION</b> poke button that puts the whole room back exactly as it was.</p>

<h2 id="hands" class="reveal">Hand Tracking</h2>

<p class="reveal">These are the interactions I am proudest of, and why they feel physical even though there is nothing in your hands.</p>

<div class="act-grid">
  <div class="act reveal"><span class="ic">Tonearm</span><h3>A hinge, not a handle</h3><p>The arm is a real hinge. The script measures the angle of your pinch point around the pivot, frame by frame, so the arm follows your hand like it is on a bearing. Let go early and it glides back to rest. Get the needle over the groove and it settles into the groove and the crackle swells. No button, no trigger: the position of your hand is the whole control.</p></div>
  <div class="act reveal"><span class="ic">Filter dial</span><h3>Turn it by orbiting</h3><p>You do not twist your wrist like with a controller. You pinch the dial and move your hand around it, and the knob follows the angle. Because it tracks the change in angle, a lost tracking frame never makes it jump. The sweep is exponential, so the first turn is as audible as the last.</p></div>
  <div class="act reveal"><span class="ic">Drum pad</span><h3>Depress and flash</h3><p>The pad cap travels with your fingertip and only fires once it passes 80 percent of its travel, so brushing it does nothing. Once it fires it flashes amber, and it springs back when you lift your finger.</p></div>
  <div class="act reveal"><span class="ic">Ordering</span><h3>Forgiving but in order</h3><p>Controls are generous to pinch (big invisible colliders) but only count at the right moment. Touch the filter before the record is playing and it politely does nothing.</p></div>
</div>

<div class="callout reveal"><b>No haptics, so the world answers back</b>Hands cannot rumble, so feedback is built into sound and light: a chime on every step, the pad flash, the platter hum, the crackle fading in. On controllers the same events also send a haptic pulse.</div>

<h2 id="media" class="reveal">Media</h2>

<figure class="video-card reveal">
<div class="todo"><b>Video walkthrough placeholder</b><span>Drop the file at /assets/videos/chillhop-walkthrough.mp4, then replace this box with the video tag in the HTML comment below.</span></div>
<!--
<video controls preload="metadata" poster="/assets/images/chillhop/walkthrough-poster.jpg" aria-label="Chillhop Crate walkthrough">
<source src="/assets/videos/chillhop-walkthrough.mp4" type="video/mp4">
</video>
-->
<figcaption>Walkthrough: the full session from START SESSION to RESTART SESSION, recorded on a Quest 3 with hand tracking.</figcaption>
</figure>

<p class="reveal">Rendered from the actual Unity scene with a scripted test hand. Click an image to enlarge it, and use the arrow keys to flip through.</p>

<div class="gallery reveal">
<figure><img src="/assets/images/chillhop/01-start.jpg" alt="The welcome panel, checklist and START SESSION poke button, seen from where the player stands." loading="lazy" width="1600" height="900"><figcaption>The welcome panel, checklist and START SESSION poke button, seen from where the player stands.</figcaption></figure>
<figure><img src="/assets/images/chillhop/02-vinyl.jpg" alt="Step 1: the record seated on the spinning platter." loading="lazy" width="1600" height="900"><figcaption>Step 1: the record seated on the spinning platter.</figcaption></figure>
<figure><img src="/assets/images/chillhop/03-tonearm.jpg" alt="Step 2: the tonearm swung over the record, needle in the groove." loading="lazy" width="1600" height="900"><figcaption>Step 2: the tonearm swung over the record, needle in the groove.</figcaption></figure>
<figure><img src="/assets/images/chillhop/04-pad.jpg" alt="Step 3: a fingertip pressing the glowing sample pad." loading="lazy" width="1600" height="900"><figcaption>Step 3: a fingertip pressing the glowing sample pad.</figcaption></figure>
<figure><img src="/assets/images/chillhop/05-filter.jpg" alt="Steps 4 and 5: the filter dial and the master fader." loading="lazy" width="1600" height="900"><figcaption>Steps 4 and 5: the filter dial and the master fader.</figcaption></figure>
<figure><img src="/assets/images/chillhop/06-complete.jpg" alt="The finale: dimmed lamp, neon accents, and the SESSION MASTERED slate with a RESTART button." loading="lazy" width="1600" height="900"><figcaption>The finale: dimmed lamp, neon accents, and the SESSION MASTERED slate with a RESTART button.</figcaption></figure>
</div>

<h2 id="code" class="reveal">Code</h2>

<p class="reveal">Ten small C# scripts drive everything. The central one is a state machine that only accepts steps in order, so no interaction can be done early. These three pieces show the hand-tracking ideas. I compiled the scripts against XR Interaction Toolkit 3.6 in Unity 6 and ran them in Play mode with automated checks for the step order, snap zone, poke button, knob, fader and tonearm.</p>

<table class="reveal">
<tr><th>Link to code</th><td><a href="https://github.com/moff05/cim423-3d-world/tree/main/assets/code/chillhop" target="_blank" rel="noopener">github.com/moff05/cim423-3d-world / assets / code / chillhop</a></td></tr>
<tr><th>AI-generated chats</th><td><span class="todo-inline">[PASTE SHARE LINK TO THE CLAUDE CHAT HERE]</span></td></tr>
<tr><th>Unity project repo</th><td><span class="todo-inline">[PASTE LINK TO YOUR CHILLHOP UNITY PROJECT REPO]</span></td></tr>
</table>

<div class="snip reveal"><h3>1. The filter dial follows your hand's angle</h3><p>Each frame it measures how far your pinch point has orbited the dial since the last frame and adds that to the knob. A missed frame costs nothing, because it only ever applies the change.</p><pre><code>void UpdateRotary()
{
    Vector3 axisWorld = AxisWorld;
    if (!VRDragMath.TryPlanarDirection(attach.position, movingPart.position, axisWorld, out Vector3 dir))
    {
        hasPrevDir = false;
        return;
    }
    if (!hasPrevDir)
    {
        prevDir = dir;
        hasPrevDir = true;
        return;
    }

    float sign = invertRotation ? -1f : 1f;
    float delta = Vector3.SignedAngle(prevDir, dir, axisWorld) * sign;
    prevDir = dir;

    float angle = Mathf.Clamp(Value * rotaryRange + delta, 0f, rotaryRange);
    SetValueInternal(rotaryRange &gt; 0f ? angle / rotaryRange : 0f, true);
}</code></pre></div>

<div class="snip reveal"><h3>2. The record lands on the platter</h3><p>The zone waits until you let go, switches off the grab, freezes the physics, then glides the disc onto the snap point and advances the checklist.</p><pre><code>IEnumerator SnapRoutine(Rigidbody rb, XRGrabInteractable grab)
{
    busy = true;
    inside.Remove(rb);

    // Order matters: disable the grab first (XRI restores Rigidbody settings when it lets go),
    // then freeze physics.
    if (grab != null) grab.enabled = false;
    rb.linearVelocity = Vector3.zero;
    rb.angularVelocity = Vector3.zero;
    rb.isKinematic = true;

    Transform t = rb.transform;
    Transform target = snapPoint != null ? snapPoint : transform;
    if (parentToSnapPoint) t.SetParent(target, true);

    Vector3 fromPos = parentToSnapPoint ? t.localPosition : t.position;
    Quaternion fromRot = parentToSnapPoint ? t.localRotation : t.rotation;
    Vector3 toPos = parentToSnapPoint ? Vector3.zero : target.position;
    Quaternion toRot = parentToSnapPoint ? Quaternion.identity : target.rotation;

    float elapsed = 0f;
    while (elapsed &lt; snapSeconds)
    {
        elapsed += Time.deltaTime;
        float k = Mathf.SmoothStep(0f, 1f, Mathf.Clamp01(elapsed / snapSeconds));
        if (parentToSnapPoint)
        {
            t.localPosition = Vector3.Lerp(fromPos, toPos, k);
            t.localRotation = Quaternion.Slerp(fromRot, toRot, k);
        }
        else
        {
            t.SetPositionAndRotation(Vector3.Lerp(fromPos, toPos, k), Quaternion.Slerp(fromRot, toRot, k));
        }
        yield return null;
    }

    if (parentToSnapPoint) t.SetLocalPositionAndRotation(toPos, toRot);
    else t.SetPositionAndRotation(toPos, toRot);

    snapRoutine = null;
    onSnapped.Invoke();
    if (VinylSimulationManager.Instance != null) VinylSimulationManager.Instance.AdvanceStep(expectedStep);
    // busy stays true until reset: the record is locked in.
}</code></pre></div>

<div class="snip reveal"><h3>3. The piano locks to the beat</h3><p>When the pad is tapped, the keys loop is scheduled on the audio clock for the exact moment the drum loop wraps, so the two never drift apart. The filter then maps 0 to 1 onto 800 to 20,000 Hz on a curve.</p><pre><code>IEnumerator StartKeysInSync()
{
    keysSource.volume = 0f;

    if (drumSource != null &amp;&amp; drumSource.isPlaying &amp;&amp; drumSource.clip != null)
    {
        double pitch = Mathf.Max(0.01f, Mathf.Abs(drumSource.pitch));
        double remaining = (drumSource.clip.samples - drumSource.timeSamples) / (double)drumSource.clip.frequency / pitch;
        double startAt = AudioSettings.dspTime + remaining;
        keysSource.PlayScheduled(startAt);
        while (AudioSettings.dspTime &lt; startAt) yield return null;
    }
    else
    {
        keysSource.Play();
    }

    yield return Fade(keysSource, keysLevel, fadeSeconds * 0.5f);
}

void ApplyCutoff()
{
    if (lowPass == null) return;
    lowPass.cutoffFrequency = minCutoff * Mathf.Pow(maxCutoff / minCutoff, cutoffNormalized);
}</code></pre></div>

<h2 id="setup" class="reveal">Setup</h2>

<p class="reveal">The full step-by-step wiring guide is in the repo (<a href="https://github.com/moff05/cim423-3d-world/blob/main/assets/code/chillhop/SETUP.md" target="_blank" rel="noopener">SETUP.md</a>). The short version:</p>

<details class="reveal"><summary>Player rig: hands, poke and direct interaction</summary>
<ul>
<li>Use the XRI sample rig <b>XR Origin Hands (XR Rig)</b>. Delete locomotion and teleport so the scene stays stationary.</li>
<li>Keep each hand's <b>Near-Far Interactor</b> (pinch, near and far) and <b>Poke Interactor</b>. In XRI 2.x the near interactor is the XR Direct Interactor.</li>
<li>Under each Poke Interactor's attach point, add a small child with <code>VRFingertip</code> (trigger sphere, kinematic Rigidbody, radius 8 mm). The drum pad and the START and RESTART buttons feel this.</li>
<li>On the camera, keep the Audio Listener and add an <b>Audio Low Pass Filter</b>.</li>
</ul></details>

<details class="reveal"><summary>Physics so the record survives optical tracking</summary>
<ul>
<li>Vinyl Rigidbody: mass 0.2, damping 1 and 2, <b>Interpolate</b> on, <b>Continuous Dynamic</b> collision.</li>
<li>Collider: a box about 1.2 cm thick, thicker than the visible disc, so it cannot tunnel through the desk. Desk and floor use thick box colliders.</li>
<li>XR Grab Interactable: <b>Kinematic</b> movement with smoothing on, throw off, dynamic attach on. This filters out hand jitter before it reaches physics.</li>
<li>A tiny <code>RespawnIfFallen</code> script returns the record if tracking drops mid-grab.</li>
<li>Tonearm, knob and fader handles: Simple Interactable, kinematic Rigidbody, generous 2 to 3 cm colliders.</li>
</ul></details>

<details class="reveal"><summary>Hierarchy for audio and UI</summary>
<ul>
<li><b>Audio</b>: a <code>VinylAudioController</code> object with four child AudioSources (hum, crackle, drums, keys; all looping, 2D) plus a UI chime source with Bypass Listener Effects on.</li>
<li><b>UI</b>: three World-Space canvases (intro, checklist, completion), scale 0.001, graphic raycaster removed. START and RESTART are 3D poke buttons in front of the panels.</li>
<li><b>SimulationManager</b>: one object with <code>VinylSimulationManager</code> that references the panels, lamp, neon lights and audio controller.</li>
</ul></details>

<h2 id="apk" class="reveal">APK</h2>

<table class="reveal">
<tr><th>Download</th><td><span class="todo-inline">[PASTE APK LINK / FILE NAME]</span></td></tr>
<tr><th>Package name</th><td><code>com.nmoffett.chillhopcrate</code></td></tr>
<tr><th>Device</th><td>Meta Quest 3 (also Quest 2 and Pro). Hand tracking must be on.</td></tr>
</table>

<details class="reveal" open><summary>Build and install on a Quest</summary>
<ol>
<li>Switch the project to Android (File > Build Profiles). Scripting Backend <b>IL2CPP</b>, Target Architecture <b>ARM64</b> only, Minimum API Level <b>32</b>, Texture Compression <b>ASTC</b>.</li>
<li>Project Settings > XR Plug-in Management > Android: tick <b>OpenXR</b>. Features: <b>Meta Quest Support</b>, <b>Hand Tracking Subsystem</b>, <b>Meta Hand Tracking Aim</b>.</li>
<li>Player Settings: set the Package Name to <code>com.nmoffett.chillhopcrate</code>.</li>
<li>On the headset: turn on Developer Mode in the Meta Horizon phone app, plug in over USB and accept "Allow USB debugging". Also turn on <b>Settings > Movement tracking > Hand tracking</b>.</li>
<li>Build the APK, then install it: <code>adb install -r chillhopcrate.apk</code>.</li>
<li>Launch it from the headset under <b>Library > Unknown Sources</b>, or run <code>adb shell monkey -p com.nmoffett.chillhopcrate -c android.intent.category.LAUNCHER 1</code>.</li>
<li>Put the controllers down. The Quest switches to hand tracking when it sees your hands.</li>
</ol></details>

<h2 id="credits" class="reveal">Credits</h2>

<details class="reveal"><summary>Audio, models and tools</summary>

All audio in the repo (drum loop, piano loop, vinyl crackle, platter hum, chimes) is synthesized by a script I wrote, so there are no licensing issues. Swap in your own loops if you like; keep the drum and piano loops the same length. 3D models: <span class="todo-inline">[LIST ANY MODELS YOU DOWNLOADED, WITH LICENSE]</span>. Built with Unity, the XR Interaction Toolkit, TextMeshPro, and Claude for code generation.

</details>
