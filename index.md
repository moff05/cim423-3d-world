---
layout: default
title: Home
---

## Assignment 1: Generate Your Story

The player character has no fixed name — it's entered on the start screen and referred to below as **{PlayerName}**. The ship AI companion is **ECHO**.

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
> **ECHO:** Crew roster says fourteen people, {PlayerName}. But the station's activity log — every entry, every day, automatic — only has records for nine of them. The other five just stop showing up. That's not what a normal reassignment looks like.

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
Scales up and lights on hover, returns to normal on exit. Selecting it plays a second journal entry:

> **JOURNAL — Day 181:** "He ran the test. The cradle lit up, and for a few seconds the whole crew just wasn't in the room anymore. I don't know where they went. I'm shutting it down and sealing this lab."

**Artifact** · *Select/Activate + Changing Material*
Selecting it shifts its material from dim blue to bright pulsing white, and the room lights flicker for a few seconds before everything settles back to normal.

> **ECHO:** {PlayerName}. Whatever that was, it's done now. Don't touch it again.
>
> **{PlayerName}:** Wasn't planning on it.

---

#### End Screen

*"You sealed the lab and logged the coordinates for recovery. Whatever happened to the crew, it's not your problem to solve today."* Buttons: **Restart** / **Quit**.

### World & Interaction Map

| Room | 3D Elements | Interaction | Type |
|---|---|---|---|
| Start Screen | UI panel | Name entry | Custom UI |
| Docking Bay | Crates, cargo sled, airlock door | Open door | Select/Activate |
| Corridor | Wall/floor pieces, lighting | — | — |
| Control Room | Console/terminal, chair, monitor | View journal entry | Information Panel |
| Lab | Desk, recorder, artifact pedestal | Hover recorder | Hover Enter/Exit |
| Lab | *(same room)* | Activate artifact | Select/Activate + Material |
| End Screen | UI panel | — | — |

## Assignment 2: Build the 3D World

<em class="placeholder">In progress — scene screenshots and asset list will go here.</em>

## Assignment 3: Add Interactions

<em class="placeholder">Not started yet.</em>
