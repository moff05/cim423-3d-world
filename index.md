---
layout: default
title: Home
---

One 3D world, built across three graded assignments for CIM 423 at the University of Miami: a story, a scene built from it, and interactions added on top. Everything's on this one page — new sections get added as each assignment is finished.

## Assignment 1: Generate Your Story

Assignment 1 for CIM 423's semester-long Unity project: a short story built to become a 3D world with five interactive points, plus the exact map from story beat to room to required interaction type that Assignments 2 and 3 will build against.

### What This Story Is For

This isn't a standalone piece of fiction — every beat was written to map onto one buildable Unity interaction, so nothing here requires assets, VFX, or scripting beyond a first Unity project's reach. The World & Interaction Map below is the load-bearing part: it's the direct bridge from this story to Assignment 2 (the 3D scene) and Assignment 3 (the five interactions).

### How It Was Generated

The story was developed iteratively with Claude, one decision at a time, then revised twice: once to replace an ambiguous ending with a confirmed one, and again to strip anything visually unbuildable for a first Unity project and pin every beat to a specific room and interaction.

Condensed prompt, usable to reproduce a similar result:

> Write a short story for a beginner's Unity project (no prior Unity experience) that will become a 3D world with 5 interactive points. Setting: an abandoned space station research outpost, crew vanished, the cause is a confirmed non-human artifact rather than left ambiguous. Protagonist is the player themselves (name entered at a start screen, not a fixed character name), with a ship AI companion for dialogue. Keep every location to something buildable from a modular free asset pack, in a small number of rooms. Keep dialogue in clearly labeled speaker lines rather than embedded in prose. Every story beat should map to one specific interaction type required by the assignment: a door (select/activate), a hover-triggered object, an information panel, and a material/light change, plus a start screen and end screen.

**Decisions made across revisions**, in order: genre (space station) → premise (crew vanished) → protagonist (a salvager, later changed to the player themself) → station purpose (research outpost) → research subject (artifact) → resolution (confirmed, not ambiguous) → visual approach (no portal/rift VFX — replaced with a light + material change, which is beginner-buildable and doubles as a required interaction type) → naming (fixed character name replaced with a start-screen name entry) → dialogue format (labeled speaker lines) → structure (each scene tagged with the room and interaction it maps to, for direct reuse in Assignments 2 and 3).

### The Story: "Signal Check"

The player character has no fixed name — it's entered on the start screen and referred to below as **{PlayerName}**. The ship AI companion is **ECHO**.

---

#### Start Screen
*Interaction 1 of 5 — Custom UI Interaction*

A simple UI panel: station logo, a text input field labeled "Enter your call sign," and a **Begin** button. Whatever the player types becomes {PlayerName} for the rest of the game.

---

#### Room: Docking Bay
**3D elements:** crates, a half-loaded cargo sled, an airlock door

> **ECHO:** Docking clamps engaged. Life support's still running in there, {PlayerName}. Lights, gravity, air, all of it. Somebody left the lights on for six months.
>
> **{PlayerName}:** Great. More parts for us, then.
>
> **ECHO:** Fourteen-person crew on the manifest. Log cuts off after nine names. That's not usually what "reassigned" looks like.

**Interaction 2 of 5 — Airlock Door** · *Hover / Select / Activate*
The door glows or outlines on hover, then opens on select, moving the player into the corridor. Build this one first — it's the standard "select to open a door" pattern most XR Interaction Toolkit tutorials walk through step by step.

---

#### Room: Corridor
**3D elements:** repeated wall/floor pieces, strip lighting

A short, plain connective hallway — flavor only, no interaction here.

> **ECHO:** Nothing broken back here. Nothing burned either. It's like the whole place just stopped.

---

#### Room: Control Room
**3D elements:** a console/terminal, a chair, a wall monitor

> **ECHO:** Terminal's still got power. Might be worth a look before you start pulling wiring.

**Interaction 3 of 5 — Terminal** · *Information Panel / UI Canvas Element*
Selecting the terminal opens a UI panel with a short logged entry:

> **LOG — Day 180:** "Resonance from the artifact is climbing again. Director wants to run a full-power test tomorrow. I've logged my objection."

> **{PlayerName}:** Well, that's not ominous at all.

---

#### Room: Lab
**3D elements:** a desk, a handheld recorder prop, the artifact on a pedestal

> **ECHO:** This is the room the log meant.

**Interaction 4 of 5 — Recorder** · *3D Object Hover Enter/Exit State*
The recorder scales up slightly or lights up when the player's pointer/hand hovers near it, and returns to normal on hover exit — standard beginner XR hover-state behavior. Selecting it plays a second log entry:

> **LOG — Day 181:** "He ran the test. The cradle lit up, and for a few seconds the whole crew just wasn't in the room anymore. I don't know where they went. I'm shutting it down and sealing this lab."

**Interaction 5 of 5 — Artifact** · *Select/Activate + Changing Material*
The artifact sits dim on its pedestal. Selecting it (against ECHO's advice) triggers: its material shifts from a dim blue to a bright pulsing white, and the room lights flicker or shift color for a few seconds, then everything settles back to normal and the artifact goes dark again. This is a straightforward material-color and light-intensity change over time — no custom shaders or particle rifts required — and it directly satisfies the assignment's "changing materials" interaction example.

> **ECHO:** {PlayerName}. Whatever that was, it's done now. Don't touch it again.
>
> **{PlayerName}:** Wasn't planning on it.

---

#### End Screen

UI panel: *"You sealed the lab and logged the coordinates for recovery. Whatever happened to the crew, it's not your problem to solve today."* Buttons: **Restart** / **Quit**.

---

### World & Interaction Map

Quick reference connecting the story directly to Assignment 2 (3D elements) and Assignment 3 (interactions), so nothing needs re-deriving later.

| # | Room | 3D Elements | Interaction | Type Required | Beginner Build Approach |
|---|------|-------------|--------------|----------------|--------------------------|
| — | Start Screen | UI panel | Name entry | Custom UI Interaction | UI Canvas with an Input Field + Button |
| 1 | Docking Bay | Crates, cargo sled, airlock door | Open door | XR Simple Interactable (Select/Activate) | Standard XRI "select to open" door pattern |
| 2 | Corridor | Wall/floor pieces, lighting | *(none — flavor only)* | — | — |
| 3 | Control Room | Console/terminal, chair, monitor | View log | Information Panel / UI Canvas Element | UI Canvas panel toggled on select |
| 4 | Lab | Desk, recorder, artifact pedestal | Hover recorder | 3D Object Hover Enter/Exit | XRI hover events scale/highlight object |
| 5 | Lab | *(same room)* | Activate artifact | XR Simple Interactable + Changing Material | Script lerps material color + light intensity over a few seconds |
| — | End Screen | UI panel | *(none)* | — | — |

That's **3 XR Simple Interactables** (door, recorder, artifact), **1 information panel**, **1 changing-material interaction**, plus the required start and end screens — matching the assignment's breakdown. *(Worth double-checking against the exact rubric on whether the start/end screens count toward the "5" or sit outside it — the assignment text is a little ambiguous there.)*

### Starter Asset List

Environment base — all free, CC0, Unity-ready:

- **[Kenney "Space Kit"](https://kenney.nl/assets/space-kit)** — modular corridors, docking bay pieces, control room console, crates, airlock door. Covers nearly every 3D element in the story with pre-made, drag-and-drop pieces.
- **Kenney "Furniture Kit"** ([kenney.nl](https://kenney.nl)) — desk, chair, small set dressing for the control room and lab.
- **[Poly Haven](https://polyhaven.com)** — an optional space skybox/HDRI for viewport background.
- **[Sketchfab, CC0 filter](https://sketchfab.com)** — only needed if the artifact should look distinct from a modular kit piece; a simple primitive (icosahedron or cube, scaled and given an emissive material) works fine too, and is easier to script the color change on.

For the artifact and lighting effect specifically, **no external asset or VFX package is needed** — it's a built-in `Material.SetColor` (or emission intensity) change on a coroutine, paired with a `Light.intensity` change on the room light. That's a well-documented beginner pattern, not custom shader work.

This list will grow once the scene is actually built in Assignment 2 — see the verified list below.

---

## Assets Used

Running list of every free asset actually used in the 3D world, for the Assignment 2 text submission.

**Kenney.nl**

| Asset | Link | Used for |
|---|---|---|
| *(none yet)* | | |

**Poly Haven**

| Asset | Link | Used for |
|---|---|---|
| *(none yet)* | | |

**Sketchfab (CC0)**

| Asset | Link | Used for |
|---|---|---|
| *(none yet)* | | |
