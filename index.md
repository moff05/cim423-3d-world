---
layout: default
title: Home
---

## Generate Your Story {#assignment-1}

<p class="chapter-date">Posted September 9, 2026</p>

<div class="ai-disclosure">
  <strong>AI disclosure:</strong> I used Claude to draft and revise the story. Every creative decision (setting, characters, ending, and which room maps to which interaction) was mine.
</div>

The player character has no fixed name — it's entered on the start screen and referred to below as **{PlayerName}**. The ship AI companion is **ECHO**.

The station stays dead silent throughout — just {PlayerName}'s breathing and ECHO's voice — except for the one moment in the Lab where that breaks.

#### Start Screen
*Custom UI Interaction*

A simple UI panel: station logo, a text input field labeled "Enter your call sign," and a **Begin** button.

---

#### Room: Docking Bay
**3D elements:** crates, a half-loaded cargo sled, an airlock door

> **ECHO:** Docking clamps engaged. Life support's still running in there, {PlayerName}. Lights, gravity, air, all of it. Somebody left the lights on for six months.
>
> **{PlayerName}:** Great. More parts for us, then.
>
> **ECHO:** Crew roster says five people, {PlayerName}. The station's activity log — every entry, every day, automatic — stops dead on the same day, for all five. Not staggered. Not partial. Same day. That's not what a normal evacuation looks like.

**Airlock Door** · *Hover / Select / Activate*
The door glows on hover, then opens on select, moving the player into the corridor.

---

#### Room: Corridor
**3D elements:** repeated wall/floor pieces, strip lighting

> **ECHO:** Nothing broken back here. Nothing burned either. It's like the whole place just stopped.

---

#### Room: Control Room
**3D elements:** a console/terminal, a chair, a wall monitor

> **ECHO:** Terminal's still got power. Might be worth a look before you start pulling wiring.

**Terminal** · *Information Panel*
Selecting the terminal opens a UI panel showing a written journal entry left by the crew — distinct from the automated activity log mentioned earlier.

> **JOURNAL — Day 180:** "Resonance from the artifact is climbing again. Director wants to run a full-power test tomorrow. I've logged my objection."

> **{PlayerName}:** Well, that's not ominous at all.

---

#### Room: Lab
**3D elements:** a desk, a handheld recorder prop, the artifact on a pedestal

> **ECHO:** This is the room the journal entry meant.

**Recorder** · *Hover Enter/Exit*
Scales up and lights on hover, returns to normal on exit. Selecting it plays back the last few seconds it ever recorded: static, one ragged breath, then nothing. No one made a Day 181 entry — there was no one left to make it.

**Artifact** · *Select/Activate + Changing Material*
Selecting it shifts its material from dim blue to bright pulsing white. The walls cut out. A screech rises, and five silhouettes stand in the dark that's left behind, arms reaching toward {PlayerName}. A few seconds later the walls snap back, the artifact goes dark, and the lab is silent again.

> **ECHO:** {PlayerName}. Whatever that was — whatever they were — it's done now. Don't touch it again.
>
> **{PlayerName}:** Wasn't planning on it.

---

#### End Screen

*"You sealed the lab and logged the coordinates for recovery. Whatever happened to the crew, it's not your problem to solve today."* Buttons: **Restart** / **Quit**.

### World & Interaction Map {#world-map}

| Room | 3D Elements | Interaction | Type |
|---|---|---|---|
| Start Screen | UI panel | Name entry | Custom UI |
| Docking Bay | Crates, cargo sled, airlock door | Open door | Select/Activate |
| Corridor | Wall/floor pieces, lighting | — | — |
| Control Room | Console/terminal, chair, monitor | View journal entry | Information Panel |
| Lab | Desk, recorder, artifact pedestal | Hover recorder | Hover Enter/Exit |
| Lab | *(same room)* | Activate artifact | Select/Activate + Material |
| End Screen | UI panel | — | — |

## Build the 3D World {#assignment-2}

<p class="chapter-date">September 11, 2026</p>

<div class="ai-disclosure">
  <strong>AI disclosure:</strong> I directed this build over many rounds of review — approving the asset sourcing, deciding how rooms trigger dialogue, choosing to host the walkthrough video directly, and directing a full atmosphere pass (decay decals, real 3D ringed planets outside the windows, space suits, a research chalkboard, bunk beds, more equipment) with fixes at each step based on what I flagged while walking through it myself. Claude Code executed all of it, driving the Unity Editor directly.
</div>

Room-by-room build, following the [World & Interaction Map](#world-map) above:

- **Docking Bay** — primitive-built room shell with a paneled floor/wall/ceiling texture, populated with Kenney Space Kit props: barrels doubling as storage crates, a barrel-laden rail cart as the half-loaded cargo sled, a satellite dish, and a gate frame with a sealed, glowing hazard-striped door as the airlock. Two primitive-built space suit mannequins stand on display platforms, and a window looks out on deep space.
- **Corridor** — primitive shell, two emissive ceiling strip-lights, and a window onto a ringed planet. Kept short — flavor only, no interaction.
- **Control Room** — Kenney Furniture Kit desk + chair, Kenney Space Kit computer console + monitor (facing the corridor entrance so it's visible on arrival), a bunk bed and three wall posters, and a second window looking out on a different ringed planet.
- **Lab** — Kenney Furniture Kit desk + chair, a recorder prop, the artifact on a pedestal (primitive + emissive material — no shader needed), five crew silhouettes built from stretched capsules (unlit black material, inactive by default until the artifact triggers), two wall-mounted bookcases stocked with primitive vials/bottles/gadgets, a wall-mounted chalkboard, and a scattered pile of papers in the corner.

Lighting stays dim and practical-fixture-driven everywhere to match the dead-station mood, with mold and grease decay decals scattered across every room; only the Lab's light needs to be rigged for the flicker, which gets scripted in Assignment 3. The skybox is a procedurally generated starfield (not a stock HDRI) with three real 3D ringed planets — actual sphere + tilted alpha-cutout disc geometry, not a painted texture — positioned so each window looks out on one.

### Screenshots

<img src="/assets/images/a2_docking_bay.png" alt="Docking Bay, showing the space suits, satellite dish, barrels, cargo cart, and the glowing airlock" />

<img src="/assets/images/a2_lab.png" alt="Lab, showing the artifact on its pedestal and the research chalkboard" />

### Video Walkthrough

<video controls style="width:100%;max-width:960px;">
  <source src="/assets/videos/assignment2_walkthrough.mp4" type="video/mp4">
</video>

### Asset List

| Source | Assets | Used For |
|---|---|---|
| [Kenney "Space Kit"](https://kenney.nl/assets/space-kit) | Barrels, barrel rail cart, gate frame, computer console, computer screen/monitor, window frame, satellite dish | Docking Bay, Corridor, Control Room |
| [Kenney "Furniture Kit"](https://kenney.nl/assets/furniture-kit) | Desk, chair, two bookcases, bunk bed | Control Room, Lab |
| Built from primitives | Room shells and paneled surface textures, airlock door panel + glass, artifact (emissive material, no shader), recorder prop, 5 crew silhouettes, strip lights, space suit mannequins, decay decals, wall posters, chalkboard, paper pile, and a procedural starfield skybox with 3 real 3D ringed planets | All rooms |
| [Freesound.org](https://freesound.org) (CC0) | Breathing loop, ECHO beeps/stings, screech/howl one-shot | Ambient audio + artifact trigger (wired up in Assignment 3) |

## Add Interactions {#assignment-3}

<p class="chapter-date">Posted September 21, 2026</p>

<div class="ai-disclosure">
  <strong>AI disclosure:</strong> I directed this build over many rounds of review — deciding which interaction went where, rejecting several art/asset options before approving the cinematic ship and the pink-alien reveal effect, and explicitly requesting the door mechanic be a twist gesture rather than a simple point-and-select for a better VR feel. Claude Code wrote and wired all the scripts, driving the Unity Editor and XR Interaction Toolkit directly, with fixes at each step based on what I flagged testing it myself. The desktop walkthrough video below was also captured by Claude Code at my direction: it scripted a full run through all 5 interactions in the Editor and stitched the recording together, standing in for a manual desktop playthrough while an in-headset recording is still pending.
</div>

Five points of interaction, layered onto the rooms from the [World & Interaction Map](#world-map):

#### 1. Start Screen — Custom UI Interaction
Station logo, a text input field labeled "Enter your call sign," and a **Begin** button. The name you enter becomes **{PlayerName}** in every line of dialogue for the rest of the run.

#### 2. Airlock & Lab Doors — 3 XR Simple Interactables, Hover / Select / Activate
Both vault-style doors glow on hover and, on desktop, open on click — but in VR that's not enough anymore. Each door now has a second, dedicated grab point on its wheel handle: reach out, grab it, and physically twist your hand around the wheel's axis to spin it open, tracked continuously so partial turns and re-grabs still accumulate correctly. Point-and-select alone no longer opens the door in VR — only finishing the twist does. That's 4 `XRSimpleInteractable`s across the two doors (door panel + wheel, ×2), on top of one each on the Terminal console, the Recorder, and the Artifact below — 7 in the scene total, well past the minimum of 3.

<img src="/assets/images/a3_wheel_handle.png" alt="Close-up of the vault door's wheel handle, the new twist-to-open grab point" />

#### 3. Recorder — 3D Object Hover Enter/Exit State
The handheld recorder scales up and lights up on hover, and returns to its resting size and dim state on exit — a pure GameObject-level hover response, no UI involved. Selecting it plays back its last recording: static, one ragged breath, then nothing.

#### 4. Terminal — Information Panel (UI Canvas Element)
Selecting the console in the Control Room opens a UI panel over a single chained click sequence, surfacing the crew's last journal entry before it closes on the final line.

<img src="/assets/images/a3_control.png" alt="Control Room console, source of the Information Panel interaction" />

#### 5. Artifact — Select/Activate + Changing Materials/Background
Selecting the artifact shifts its material from dim blue to pulsing white, then the whole room's presentation changes: the walls and pedestal hide, an alien skybox and an enclosing glitch-panel dome swap in so there's nothing visible in any direction but the reveal, four room lights strobe through a glitch color cycle in sync with distortion stingers, and five crew silhouettes fly erratically through the dark before everything snaps back to the room's normal dim lighting.

<img src="/assets/images/a3_lab.png" alt="Lab at rest, showing the desk, recorder, and artifact on its pedestal before activation" />

Plus the bookend UI screens already in place from Assignment 1: the **Start Screen** (custom UI, name entry) and the **End Screen** (Restart/Quit), both shown once per full run rather than per-interaction.

### Video Walkthrough

<p class="chapter-date" style="margin-top:0;">Desktop playthrough (scripted run-through of all 5 interaction points) — an in-headset recording will replace this once I've done a Quest pass.</p>

<video controls style="width:100%;max-width:960px;">
  <source src="/assets/videos/assignment3_walkthrough.mp4" type="video/mp4">
</video>

### Asset & Package Notes

| Source | Used For |
|---|---|
| XR Interaction Toolkit 3.6.0 (`XRSimpleInteractable`, select/hover events) | All 6 interactables above |
| Custom `TwistHandle.cs` script | Grab-and-twist door wheel mechanic — no built-in XRI knob component existed in this XRI version, so the rotation tracking (hand angle around the wheel's local axis, wraparound-safe) was hand-built |
| [Freesound.org](https://freesound.org) (CC0) + "Voices Sound Effect Library" by Little Robot Sound Factory (CC-BY 3.0) | Ambient loops, ECHO stings, recorder breath, artifact glitch stingers — see `Assets/CREDITS.txt` for full attribution |
| Locally-synthesized audio (ffmpeg) | Bass rumble, glitch stingers |
