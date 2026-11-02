# The Chillhop Crate: Inspector Setup Guide

Tested target: Unity 6 (6000.5), XR Interaction Toolkit 3.6, OpenXR, Meta Quest 3 with hand tracking.
The scripts compile against that stack. Everything in this guide is wiring, no code changes.

Scripts: `VinylSimulationManager`, `VRSnapZone`, `VRPokeButton`, `VRFingertip`, `VinylAudioController`,
`VRFaderKnob`, `VRTonearm`, `PlatterSpinner`, `RespawnIfFallen`, `VRDragMath` (helper, no wiring).
Placeholder audio (synthesized, no licensing): `audio/`.

> **One deviation from the original brief:** the tonearm uses its own `VRTonearm` script (a hinge you swing),
> not `VRSnapZone`. A snap zone would pull the whole arm off its pivot; a hinge looks and feels right.
> `VRSnapZone` is used for the vinyl record. If the rubric needs a snap zone on the needle rest, see
> "Optional: needle rest snap zone" at the bottom.

---

## 0. Project prerequisites

1. **Package Manager**: install *XR Interaction Toolkit* (3.x), *XR Hands*, *OpenXR Plugin*, *Unity OpenXR: Meta*, *Input System*.
   In the XRI package, import the samples **Starter Assets** and **Hands Interaction Demo**.
2. **Project Settings > XR Plug-in Management > Android tab**: tick **OpenXR**.
3. **OpenXR > Features (Android)**: enable **Meta Quest Support**, **Hand Tracking Subsystem** and **Meta Hand Tracking Aim**.
   (Feature names shift slightly between package versions. If hands do not appear on the headset, this is the first place to look.)
4. **Project Settings > Tags and Layers**: add the tag `Vinyl`.
5. **Project Settings > Time > Fixed Timestep**: `0.0139` (72 Hz, matches Quest refresh, keeps physics in step with rendering).
6. **Project Settings > Physics**: Default Contact Offset `0.01`, Bounce Threshold `0.5`.

## 1. Player rig (XR Origin with hands)

1. Delete the default `Main Camera`.
2. Drag the hands rig prefab from the XRI samples into the scene. It is called **XR Origin Hands (XR Rig)** in the
   Starter Assets / Hands Interaction Demo samples (name may differ slightly by version).
3. Select the rig root: **XR Origin > Tracking Origin Mode** = `Floor` (standing) or `Device` (seated; then set Camera Y Offset to about `1.1`).
4. **Stationary scene: remove locomotion.** Delete the rig's *Locomotion* child and both *Teleport Interactor* children.
5. Under each hand (`Left Hand` / `Right Hand`) you should have:
   - **Near-Far Interactor** (XRI 3.x). This is the "direct interactor": pinch an object within arm's reach (near) or at a distance (far).
     In XRI 2.x this is the **XR Direct Interactor** instead.
   - **Poke Interactor**.
   Leave both enabled.
6. **Fingertips for the poke buttons.** For each hand:
   1. Under the hand's **Poke Interactor > Poke Attach Transform** (the index fingertip), create an empty child `Fingertip`.
   2. Add `VRFingertip` (it adds a `SphereCollider` and `Rigidbody` and configures them: trigger, kinematic, no gravity).
   3. Set the sphere **Radius** to `0.008`.
   4. Layer: `Default` (or a `Hands` layer that only collides with `Default` triggers).
7. **Audio on the camera.** On `XR Origin > Camera Offset > Main Camera`:
   - Keep the **Audio Listener**.
   - Add **Audio Low Pass Filter** (set Cutoff Frequency to `800`, `VinylAudioController` takes over at runtime).
8. Remove any `XR Device Simulator` from the scene, or tag it `EditorOnly`, so it never ships to the headset.

## 2. Scene hierarchy

```
Chillhop Scene
├─ XR Origin Hands (XR Rig)            (section 1)
├─ Environment
│  ├─ Room (floor BoxCollider 0.2 m thick, walls)
│  ├─ Desk                             (BoxCollider 0.1 m thick top surface)
│  ├─ DeskLamp (Light: Point/Spot, warm 2700K, Intensity 2)
│  └─ NeonAccents (2-3 Point Lights, Intensity 0.2, magenta/cyan)
├─ Deck
│  ├─ Turntable
│  │  ├─ PlatterBase
│  │  ├─ Platter                       (PlatterSpinner)
│  │  │  └─ SnapPoint                  (empty, centered on spindle, slightly above platter surface)
│  │  └─ PlatterSnapZone               (BoxCollider Is Trigger, VRSnapZone)
│  ├─ Tonearm
│  │  └─ ArmPivot                      (empty on the hinge, origin = pivot point)
│  │     ├─ ArmMesh
│  │     └─ Handle                     (VRTonearm + XRSimpleInteractable + Rigidbody)
│  ├─ Mixer
│  │  ├─ PadButton                     (VRPokeButton, BoxCollider Is Trigger)
│  │  │  └─ PadCap                     (mesh, emissive material)
│  │  ├─ FilterKnob                    (VRFaderKnob Rotary + XRSimpleInteractable + Rigidbody)
│  │  └─ FaderTrack
│  │     └─ FaderHandle                (VRFaderKnob Slider + XRSimpleInteractable + Rigidbody)
│  └─ RecordSleeve
│     └─ VinylRecord                   (tag Vinyl, see section 3)
├─ Audio
│  ├─ VinylAudioController             (script)
│  ├─ PlatterHum                       (AudioSource)
│  ├─ NeedleCrackle                    (AudioSource)
│  ├─ DrumLoop                         (AudioSource)
│  ├─ KeysLoop                         (AudioSource)
│  └─ UIChime                          (AudioSource)
├─ UI (World-Space)
│  ├─ IntroPanel                       (Canvas + TMP welcome text)
│  │  └─ StartButton                   (VRPokeButton)
│  ├─ ChecklistPanel                   (Canvas + TMP checklist)
│  └─ CompletePanel                    (Canvas + TMP title + TMP time)
│     └─ RestartButton                 (VRPokeButton)
└─ SimulationManager                   (VinylSimulationManager)
```

## 3. Vinyl record: physics that survive optical tracking

Optical hand tracking is noisy (a few millimetres of jitter per frame, occasional lost frames).
The setup below makes the disc forgiving and keeps it from falling through the desk.

**`VinylRecord`** components:

| Component | Setting |
|---|---|
| Tag | `Vinyl` |
| Rigidbody | Mass `0.2`; Linear Damping `1`; Angular Damping `2`; Use Gravity on; **Interpolate = Interpolate**; **Collision Detection = Continuous Dynamic** |
| Collider | A **BoxCollider** about `0.30 x 0.012 x 0.30` m, thicker than the visible disc. A 2 mm disc collider tunnels through the desk at hand speed. (Or a convex MeshCollider of a 1 cm tall cylinder.) |
| Physics Material | Dynamic/Static Friction `0.6`, Bounciness `0`, Combine = Minimum for bounce |
| XR Grab Interactable | **Movement Type = Kinematic**; **Smooth Position** on, amount `5`; **Smooth Rotation** on, amount `5`; **Throw On Detach = off**; **Force Gravity On Detach = on**; **Use Dynamic Attach = on**; Attach Ease In Time `0.15`; Select Mode `Single`; Track Scale off |
| RespawnIfFallen | Min Y = floor height minus `0.5` |

Why these: Kinematic + smoothing filters hand jitter before it reaches physics (Velocity Tracking amplifies it and
can fling the disc). Continuous Dynamic plus a thick collider stops tunneling. Dynamic Attach keeps the disc where you
pinched it instead of snapping to the fingers. `RespawnIfFallen` is the last line of defence if tracking drops mid-grab.

**`Desk` and floor**: use thick BoxColliders (at least `0.1` m). Never a plane or a one-sided mesh collider.

**`PlatterSnapZone`**: BoxCollider *Is Trigger* roughly `0.40 x 0.15 x 0.40` m centered just above the platter. Add `VRSnapZone`:
- Target Tag = `Vinyl`; Target Object = the VinylRecord (optional, wins over tag)
- Snap Point = `Platter/SnapPoint`
- Snap Seconds = `0.35`; Parent To Snap Point = on (so the disc spins with the platter)
- Expected Step = `Step1_PlaceVinyl`
- On Snapped: `PlatterSpinner.StartSpin()` and `VinylAudioController.PlayPlatterHum()`

The zone waits until the hand lets go before snapping, so the record is dropped on, not dragged through.

## 4. Tonearm

`Handle` (child of `ArmPivot`):
- **XRSimpleInteractable** (Select Mode Single)
- **Rigidbody**: Is Kinematic on, Use Gravity off (so the moving collider is cheap and stable)
- **SphereCollider** radius `0.025` (generous pinch target for optical tracking)
- **VRTonearm**: Arm = `ArmPivot`; Axis = `(0,1,0)`; Rest Angle `0`; Play Angle `32` (flip the sign if it swings away from the record);
  Snap Tolerance `5`; Expected Step = `Step2_DropNeedle`
- On Needle Dropped: `VinylAudioController.PlayNeedleDrop()`

`ArmPivot`'s origin must sit exactly on the hinge. Rotation is clockwise looking down the axis for positive angles.

## 5. Mixer controls

**`PadButton`** (the MPC pad):
- BoxCollider **Is Trigger**, covering the cap plus about `3 cm` above and `2 cm` below
- `VRPokeButton`: Cap = `PadCap`; Press Direction `(0,-1,0)`; Travel `0.012`; Surface Height = half the cap's thickness
- Gate By Step = on, Required Step = `Step3_TriggerSamplePad`
- Flash Renderer = the cap's renderer (material must have Emission; the script turns the keyword on)
- Click Source / Press Clip optional
- On Pressed: `VinylAudioController.TriggerSynthPad()` and `VinylSimulationManager.OnSamplePadPressed()`

**`FilterKnob`**:
- XRSimpleInteractable + kinematic Rigidbody + chunky CapsuleCollider
- `VRFaderKnob`: Mode `Rotary`; Axis `(0,1,0)`; Rotary Range `90`; Audio Controller = `VinylAudioController`; Output = `FilterCutoff`;
  Gate By Step on, Required Step = `Step4_FilterKnob`; Complete Threshold `0.97`

**`FaderHandle`**:
- XRSimpleInteractable + kinematic Rigidbody + BoxCollider
- `VRFaderKnob`: Mode `Slider`; Axis = the track's up direction in the parent's local space (usually `(0,1,0)`); Slider Travel = track length in metres;
  Output = `MasterVolume`; Volume At Min `0.3`; Volume At Max `1`; Required Step = `Step5_MasterFader`
- Place the handle at the **bottom** of the track at scene start (Start Value `0`).

## 6. Audio hierarchy

On `VinylAudioController`: assign the four AudioSources and the `AudioLowPassFilter` from the Main Camera.
Defaults are tuned: Min Cutoff `800`, Max Cutoff `20000`, Start Volume `0.3`.

Every music AudioSource (`PlatterHum`, `NeedleCrackle`, `DrumLoop`, `KeysLoop`): **Loop on, Play On Awake off, Spatial Blend `0`** (hum may be `1`).
Clips from `audio/`:

| Source | Clip |
|---|---|
| PlatterHum | `platter_hum_loop.wav` |
| NeedleCrackle | `vinyl_crackle_loop.wav` |
| DrumLoop | `drums_loop.wav` (12.000 s, 80 BPM, 4 bars) |
| KeysLoop | `keys_loop.wav` (12.000 s, same length so it locks to the drums) |
| UIChime | `step_chime.wav` (Manager: Step Chime); `complete_chime.wav` (Complete Chime) |

`UIChime`: tick **Bypass Listener Effects** so the low-pass never muffles the chime.
Import settings for loops: Load Type *Decompress On Load*, Compression Format *Vorbis* (or PCM for exact loop points), Force To Mono off.

## 7. World-Space UI

For each of `IntroPanel`, `ChecklistPanel`, `CompletePanel`:
1. Create a UI > Canvas. **Render Mode = World Space**. Rect Transform width/height `800 x 450`, Scale `0.001`. Position about `0.8 m` in front of and slightly above the desk, facing the player.
2. Remove the `GraphicRaycaster` (the buttons are 3D, not UGUI).
3. Add a panel `Image` (wood/acrylic look) and TextMeshPro text children.
4. `IntroPanel` text: *Welcome to Chillhop Lounge. Step behind the deck and complete your audio session.*
5. `StartButton` and `RestartButton` are **3D objects** (a flat box with a `VRPokeButton`, a trigger collider and a cap) sitting in front of the panel.
   `RestartButton`: Required Step = `Complete`, On Pressed = `VinylSimulationManager.ResetSimulation()`.
   `StartButton`: Required Step = `MenuStart`, On Pressed = `VinylSimulationManager.StartSession()`.
6. `CompletePanel` ships **inactive**. Text: **SESSION MASTERED - 100% GROOVE** plus a second TMP for the time.

## 8. SimulationManager wiring

On `SimulationManager` > `VinylSimulationManager`:
- Intro Root = `IntroPanel`; Checklist Root = `ChecklistPanel`; Checklist Text = the checklist TMP
- Complete Root = `CompletePanel`; Completion Time Text = the time TMP
- Chime Source = `UIChime`; Step Chime / Complete Chime = clips
- Audio Controller = `VinylAudioController`
- Desk Lamp = `DeskLamp`; Neon Lights = the neon lights; Beats Per Minute = `80`

## 9. Smoke test in the Editor before building

1. Press Play. Checklist shows five `[ ]` lines. Press START (or drag a fingertip sphere into it).
2. Drop the record on the platter: step 1 turns green, platter spins, hum starts.
3. Swing the tonearm to the groove: crackle fades in, then drums.
4. Press the pad: keys join on the next bar.
5. Turn the knob 90 degrees: sound opens up (800 Hz to 20 kHz).
6. Push the fader to the top: volume 0.3 to 1.0. Lights shift, slate drops in. RESTART returns to step 1.

## Optional: needle rest snap zone

To use `VRSnapZone` on the needle rest (per the original brief) you would make the tonearm head a free grabbable
instead of a hinge: tag it `Needle`, place a second `VRSnapZone` over the groove with Expected Step = `Step2_DropNeedle`,
Parent To Snap Point off, and hook On Snapped to `VinylAudioController.PlayNeedleDrop()`. I do not recommend it: the
arm detaches from its pivot while you carry it.
