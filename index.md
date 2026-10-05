---
layout: default
title: Home
---

## Generate Your Story {#assignment-1}

<p class="chapter-date">Posted September 9, 2026</p>

The player is a salvage pilot, and the player character doesn't have a fixed name. You type a call sign on the start screen and it shows up below as **{PlayerName}**. The ship AI is **ECHO**.

It's dead quiet the whole time, just the hum of the station and ECHO talking, until the Lab, where that breaks.

#### Start Screen
*Custom UI Interaction*

Station logo, a text field for your call sign, and a **Begin** button.

---

#### Opening: The Jump
A short cinematic before you step aboard. Your ship makes a jump to the station.

> **ECHO:** Departing, {PlayerName}. Punching the jump drive in three.
>
> **ECHO:** Jump complete. Bringing us in to dock.
>
> **ECHO:** Anything glowing gold is something you can interact with. Point your controller at it and pull the trigger.

---

#### Room: Docking Bay
**3D elements:** crates, a half-loaded cargo sled, two space suit mannequins, an airlock door

**Airlock Door** · *Hover / Select / Activate*
Glows on hover. Selecting it starts ECHO's briefing, and the door opens when it's done.

> **ECHO:** Docking clamps engaged. Life support's still running in there, {PlayerName}. Lights, gravity, air, all of it. Somebody left the lights on for six months.
>
> **{PlayerName}:** Great. More parts for us, then.

---

#### Room: Corridor
**3D elements:** repeated wall/floor pieces, strip lighting

> **ECHO:** Nothing broken back here. Nothing burned either. It's like the whole place just stopped.

---

#### Room: Control Room
**3D elements:** a console/terminal, a chair, a wall monitor, a bunk bed

**Terminal** · *Information Panel*
ECHO's first line is about the power, and its second is about the crew.

> **ECHO:** Terminal's still got power. Might be worth a look before you start pulling wiring.
>
> **ECHO:** Crew roster says five people, {PlayerName}. The station's activity log, every entry, every day, automatic, stops dead on the same day, for all five. Not staggered. Not partial. Same day. That's not what a normal evacuation looks like.

Then a written journal entry the crew left comes up, different from the automated log ECHO mentioned.

> **JOURNAL, Day 180:** "Resonance from the artifact is climbing again. Director wants to run a full-power test tomorrow. I've logged my objection."

> **{PlayerName}:** Well, that's not ominous at all.

---

#### Room: Lab
**3D elements:** a desk, a handheld recorder prop, the artifact on a pedestal

> **ECHO:** This is the room the journal entry meant.

**Recorder** · *Hover Enter/Exit*
Scales up and lights up when you hover it, back to normal when you don't. Select it and it plays the last thing it ever recorded: static, one ragged breath, nothing. No Day 181 entry, because there was nobody left to make one.

**Artifact** · *Select/Activate + Changing Material*
Select it and its material shifts from dim blue to bright white. The room starts to shake and the lights go red as an alarm sounds. Then the room is gone and you're floating in open space among spinning stars. All you can hear is breathing. After a few seconds everything snaps back, the artifact dark and the lab quiet again.

> **ECHO:** {PlayerName}. Whatever that was, it's done now. Don't touch it again.
>
> **{PlayerName}:** Wasn't planning on it.

---

#### End Screen

*"You sealed the lab and logged the coordinates for recovery. Whatever happened to the crew, it's not your problem to solve today."* Button: **Restart**, which reloads the run from the opening.

### World & Interaction Map {#world-map}

| Room | 3D Elements | Interaction | Type |
|---|---|---|---|
| Start Screen | UI panel | Name entry | Custom UI |
| Docking Bay | Crates, cargo sled, suits, airlock door | Open door | Select/Activate |
| Corridor | Wall/floor pieces, lighting | — | — |
| Control Room | Console/terminal, chair, monitor, bunk | View journal entry | Information Panel |
| Lab | Desk, recorder, artifact pedestal | Hover recorder | Hover Enter/Exit |
| Lab | *(same room)* | Activate artifact | Select/Activate + Material |
| End Screen | UI panel | — | — |

## Build the 3D World {#assignment-2}

<p class="chapter-date">September 11, 2026</p>

Room by room, following the [World & Interaction Map](#world-map) above:

- **Docking Bay** — primitive-built room with a paneled floor/wall/ceiling texture, plus Kenney Space Kit props: barrels doubling as crates, a barrel-loaded rail cart as the cargo sled, a satellite dish, and a gate frame as the airlock (sealed, glowing, hazard-striped). Two space suit mannequins on display platforms, window looking out on deep space.
- **Corridor** — short, mostly flavor. Primitive shell, two emissive ceiling strips, a window onto a ringed planet. No interaction here.
- **Control Room** — Kenney desk + chair, a console + monitor facing the corridor entrance so it's the first thing you see walking in, a bunk bed, three wall posters, another window with a different ringed planet.
- **Lab** — desk + chair, the recorder prop, the artifact on a pedestal (just a primitive with an emissive material, no shader needed), two bookcases with random vials/bottles/gadgets, a chalkboard, a pile of papers in the corner.

Lighting's dim everywhere, practical-fixture style, to match the whole dead-station thing, with decay decals scattered around. Only the Lab light actually needs to flicker, which gets scripted in Assignment 3. Skybox is a starfield I generated (not a stock HDRI) with three actual 3D ringed planets — real geometry, not a texture — placed so each window looks out on one.

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
| Built from primitives | Room shells and paneled surface textures, airlock door panel + glass, artifact (emissive material, no shader), recorder prop, strip lights, space suit mannequins, decay decals, wall posters, chalkboard, paper pile, and a procedural starfield skybox with 3 real 3D ringed planets | All rooms |
| [Freesound.org](https://freesound.org) (CC0) | Breathing loop, ECHO beeps/stings, screech/howl one-shot | Ambient audio + artifact trigger (wired up in Assignment 3) |

## Add Interactions {#assignment-3}

<p class="chapter-date">Posted September 21, 2026 · Updated October 5, 2026</p>

The build now runs on a real Meta Quest headset, not just in the Editor. Everything below reflects the current version. Full source and commit history are in the [GitHub repo](https://github.com/moff05/cim423-unity-project).

### The Run

Six interactions have to happen in order, and each one only responds on its turn:

1. **Airlock door**
2. **Corridor door**
3. **Terminal**
4. **Lab door**
5. **Recorder**
6. **Artifact**

A small objective HUD tells you what to do next, and every interactable shows a floating hint ("PULL TRIGGER", "GRAB, THEN MOVE IN A CIRCLE") when you point at it. Out-of-order objects don't react at all, so there's no way to get stuck.

There are also two optional side interactions that aren't needed to finish: a keycard you can plug into a wall socket, and a wall keypad that opens a small supply locker if you enter the right code. Each one gets a one-line reaction from ECHO.

### Five Points of Interaction

Covering the assignment's required interaction types, on top of the rooms from the [World & Interaction Map](#world-map):

#### 1. Start Screen: Custom UI Interaction
Station logo, call sign field, **Begin** button. Whatever you type becomes **{PlayerName}** for the rest of the run. Quest's system keyboard doesn't work inside a fully immersive app, so I built an in-scene QWERTY keyboard (letters, space, delete) out of ordinary UI buttons. You type by pointing a controller ray at keys and pulling the trigger, same as pressing Begin.

#### 2. Airlock, Corridor & Lab Doors: XR Simple Interactables, Hover / Select / Activate
Each vault door glows on hover and opens on select. In VR the real control is the wheel handle: grab it and move your hand in a circle. The custom `TwistHandle.cs` tracks the hand's angle around the wheel's axis, and each wheel is tied to its own step so it only turns when it's that door's turn.

<img src="/assets/images/a3_wheel_handle.png" alt="Close-up of the vault door's wheel handle grab point" />

#### 3. Recorder: 3D Object Hover Enter/Exit State
Scales up and lights up on hover, drops back down when you look away. Straight GameObject-level hover, no UI involved. Select it and it plays back its last recording: static, one ragged breath, nothing.

#### 4. Terminal: Information Panel (UI Canvas Element)
Selecting the console pulls up a panel with the crew's last journal entry, closing itself after the final line.

<img src="/assets/images/a3_control.png" alt="Control Room console, source of the Information Panel interaction" />

#### 5. Artifact: Select/Activate + Changing Materials/Background
Selecting it shifts the material from dim blue to bright white. Then the room shakes and the lights flicker red while an alarm siren builds. The room cuts out and you're floating in open space among spinning stars with only your own breathing to listen to. After about twelve seconds everything snaps back to normal and ECHO closes out the story. I tried crew silhouettes in this moment and cut them. The simple version is creepier.

<img src="/assets/images/a3_lab.png" alt="Lab at rest, showing the desk, recorder, and artifact on its pedestal before activation" />

The Start Screen and End Screen from Assignment 1 bookend the run. The End Screen has a single **Restart** button that takes you back to the opening sequence.

### What Changed After Headset Testing

Testing on a real Quest turned up problems the Editor never showed:

- **Dead controllers on the start screen.** An Editor-only input simulator was shipping in the Android build and fighting the real controllers. It's now tagged `EditorOnly` so Unity strips it from builds.
- **Dialogue that never advanced.** "Click to continue" only listened for a mouse, so on the headset every line hung forever.
- **Dialogue that skipped itself.** My first fix accepted any button on any device, which on a Quest includes touch sensors and tracking flags that fire constantly, so lines vanished before they could be read. Now only the trigger (or a face button) advances a line, each line ignores input for a short read time scaled to its length, and lines queue instead of cutting each other off. Nothing auto-dismisses anymore.
- **UI that didn't render in VR.** All five canvases were screen-space overlays. They're now world-space panels that re-center when you turn away, with controller-ray raycasters on the ones with buttons.
- **A soft-lock.** The corridor door had no wheel handle, so the run couldn't finish. Fixed.
- **Motion-sickness in the opening cinematic.** The cinematic camera wasn't tracking head rotation. Fixed.
- **Stuck in space.** The float coroutine lived on an object that got hidden, so it never resumed. It now runs from a persistent host object.
- **Falling out of the world at the ending.** This one took the longest to find. The station would never reappear and Restart couldn't be clicked, and I spent several rounds fixing symptoms. The headset log finally showed the real cause: the camera was at y = -669 when the station came back. The ending hides the whole station, including the floor, and the XR rig's gravity kept pulling for the entire twelve-second float, about 700 meters of free fall. The fix is to freeze all locomotion (gravity included) while the room is gone, then put the player back exactly where they were standing. I also have to freeze it again at the end screen, because that step turns off the room's colliders to keep them from blocking the controller ray, and the floor is one of them. With that, the station reappears around you and Restart works on the headset.

I also added a desktop point-and-click mode for testing in the Editor. Real Quest builds always use VR.

### Video Walkthrough

A full playthrough of the final build on a Meta Quest 3, start screen to the Restart screen, about two and a half minutes. The picture-in-picture is me playing, cut out of my phone footage.

<video controls preload="metadata" poster="/assets/images/a3_walkthrough_poster.jpg" style="width:100%;max-width:960px;">
  <source src="/assets/videos/assignment3_headset_walkthrough.mp4" type="video/mp4">
</video>

### Asset & Package Notes

| Source | Used For |
|---|---|
| XR Interaction Toolkit 3.6.0 (`XRSimpleInteractable`, select/hover events) | Terminal, recorder, artifact, doors, door wheels |
| Custom scripts (`TwistHandle`, `InteractionSequencer`, `OnScreenKeyboard`, `WorldSpaceUIFollow`, `ObjectiveHUD`) | Wheel grab rotation, step ordering, VR typing, VR-safe UI, objective HUD |
| "Star Sparrow Modular Spaceship" by Ebal Studios | Ship in the opening cinematic |
| [Freesound.org](https://freesound.org) (CC0) + "Voices Sound Effect Library" by Little Robot Sound Factory (CC-BY 3.0) | Ambient loops, ECHO stings, recorder breath |
| Locally-synthesized audio (ffmpeg) | Bass rumble, glitch stingers, alarm siren |

Full attribution is in `Assets/CREDITS.txt` in the repo.
