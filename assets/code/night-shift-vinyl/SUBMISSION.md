# Night Shift Vinyl: Lo-Fi Vinyl Lounge (project report text)

## Project Title
Night Shift Vinyl: Lo-Fi Vinyl Lounge

## Brief Description of the Project
Night Shift Vinyl is a stationary VR task simulation for Meta Quest, controlled entirely with optical hand tracking (no controllers). The player stands or sits behind a warm, mood-lit vinyl DJ desk and builds a lo-fi track through five tactile steps: load a record onto the platter, drop the tonearm needle, tap an MPC drum pad, turn an analog low-pass filter dial, and push the master output fader. A floating World-Space panel introduces the task and shows a live checklist, a START SESSION poke button begins the session, and a final "SESSION MASTERED - 100% GROOVE" slate shows the completion time with a RESTART SESSION poke button. Built in Unity 6 with the XR Interaction Toolkit, OpenXR and XR Hands.

## Link to Code and AI-Generated Chats
- Code: https://github.com/moff05/cim423-3d-world/tree/main/assets/code/night-shift-vinyl
- Unity project repo: [PASTE LINK]
- AI chats (Claude): [PASTE SHARE LINK(S)]
- Blog write-up: https://cim423-3d-world.vercel.app/night-shift-vinyl/

## Rubric Checklist
- Introduction and task briefing: welcome panel plus checklist, START SESSION poke button
- At least 5 interactions: platter snap, tonearm swing, drum pad poke, filter dial twist, fader push
- Menus: World-Space UI for start, live checklist, and conclusion
- Object interactions: pinch/grab, snap zone, poke, rotary, slider, all by hand
- Conclusion: lamp dims, neon pulses, completion slate with time, RESTART SESSION

## Highlighted Interesting Interactions
**Tonearm drop.** The tonearm is a true hinge. While the player pinches the handle, the script measures the angle of the pinch point around the pivot every frame and rotates the arm to match, clamped between the rest position and the groove. When the needle is over the groove (within 5 degrees) it settles into contact, vinyl crackle fades in and the drum loop follows. Let go early and the arm glides back to rest. With no controller there is no trigger to pull: the position of the hand is the whole control, which is what makes it feel physical.

**Filter dial.** The player pinches the dial and either rolls the wrist or circles the hand around it, in either direction. The script adds the change in angle each frame (not the absolute hand angle), using whichever of the two moved more, so a lost tracking frame never makes the knob jump. 0 to 90 degrees maps to 800 Hz to 20,000 Hz on an exponential curve so the whole sweep is audible, and the AudioLowPassFilter on the listener opens the full mix.

**Poke pad.** A kinematic fingertip trigger on each index finger pushes the pad cap down in proportion to how far the fingertip has travelled. The press only fires past 80 percent of travel, so brushing it does nothing. It flashes amber, and the piano loop is scheduled on the audio clock to enter exactly when the drum loop wraps.

**Forgiving but ordered.** Handles have oversized colliders for noisy optical tracking, and a state machine only accepts the current step, so no control works early. The held record cannot sink through the desk, deck, mixer or crate, settles flat when released, and glides back to the crate if released away from the desk, so it can never be lost. The next control to use gets a pulsing outline.

## Screenshots
Real headset stills are in the gallery on the blog page: intro panel, record pinch, tonearm, pad, dial, fader and the SESSION MASTERED slate.

## Video Walkthrough
https://cim423-3d-world.vercel.app/assets/videos/chillhop-walkthrough.mp4 (also embedded on the blog page)

## APK Build Instructions for Meta Quest
1. File > Build Profiles: switch to Android. Scripting Backend IL2CPP, Target Architecture ARM64, Minimum API Level 32, Texture Compression ASTC.
2. Project Settings > XR Plug-in Management > Android: enable OpenXR. Features: Meta Quest Support, Hand Tracking Subsystem, Meta Hand Tracking Aim.
3. Player Settings: Package Name com.nmoffett.nightshiftvinyl.
4. Quest: enable Developer Mode (Meta Horizon phone app), connect via USB, accept "Allow USB debugging". Turn on Settings > Movement tracking > Hand tracking.
5. Build the APK, then: `adb install -r nightshiftvinyl.apk`
6. Launch from Library > Unknown Sources, or `adb shell monkey -p com.nmoffett.nightshiftvinyl -c android.intent.category.LAUNCHER 1`.
7. Put the controllers down; the Quest switches to hand tracking.
APK file: https://cim423-3d-world.vercel.app/assets/downloads/nightshiftvinyl.apk
