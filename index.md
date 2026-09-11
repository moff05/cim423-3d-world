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

<p class="chapter-date">Not started yet</p>

<div class="ai-disclosure">
  <strong>AI disclosure:</strong> Not written yet — will describe any AI use in scripting the interactions once this assignment is underway.
</div>
