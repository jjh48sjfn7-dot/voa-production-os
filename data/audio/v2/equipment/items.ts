import type { EquipmentDefinition } from "@/data/audio/v2/equipment/types";

export const yamahaTf5: EquipmentDefinition = {
  id: "yamaha-tf5",
  slug: "yamaha-tf5",
  name: "Yamaha TF5",
  categoryId: "console",
  icon: "🎚️",
  purpose:
    "The Yamaha TF5 is the heart of our entire audio system. Every microphone, instrument, playback source, monitor mix and FOH speaker routes through this console. No audio should be connected directly to speakers without first routing through the TF5.",
  quickStart: [
    "Roll TF5 into FOH position",
    "Connect power",
    "Connect network cable (if used)",
    "Connect Stage Snake A",
    "Connect Stage Snake B",
    "Power on console",
    "Load Sunday Scene",
    "Verify Inputs",
    "Verify Outputs",
    "Confirm Media Computer input",
    "Keep Main L/R muted during setup",
    "Unmute after Soundcheck",
  ],
  specifications: [
    { label: "Model", value: "Yamaha TF5" },
    { label: "Mixer Type", value: "Digital Mixing Console" },
    { label: "Input Capacity", value: "40 Input Channels" },
    { label: "Output Mixes", value: "20 Mix Outputs" },
    { label: "Motorized Faders", value: "33" },
    { label: "Touchscreen", value: "Yes" },
    { label: "Scene Memory", value: "Yes" },
  ],
  primaryConnections: [
    "Stage Snake A",
    "Stage Snake B",
    "Media Computer",
    "FOH Left Speaker",
    "FOH Right Speaker",
    "Stage Monitors",
    "Wireless Receivers",
  ],
  setupLinks: [
    {
      href: "/audio/setup",
      label: "Open Sunday Setup",
    },
    {
      href: "/audio/documentation/channel-list",
      label: "Open Channel List",
    },
    {
      href: "/audio/documentation/signal-flow",
      label: "Open Signal Flow",
    },
    {
      href: "/audio/documentation/stage-plot",
      label: "Open Stage Plot",
    },
  ],
  bestPractices: [
    "Always power speakers LAST.",
    "Always mute Main L/R before connecting equipment.",
    "Load the approved Sunday Scene before patching.",
    "Verify all stage snake connections before soundcheck.",
    "Save scene changes only with Audio Lead approval.",
    "Never overwrite the master Sunday Scene.",
  ],
  commonProblems: [
    {
      id: "tf5-no-power",
      title: "Console Will Not Power On",
      basicChecks: [
        "Verify AC power.",
        "Check power cable.",
        "Verify outlet.",
        "Hold power button.",
        "Notify Audio Lead.",
      ],
    },
    {
      id: "tf5-no-main-output",
      title: "No Main Output",
      basicChecks: [
        "Verify Main L/R is unmuted.",
        "Check Output Routing.",
        "Check FOH speakers.",
        "Verify Stage Snake outputs.",
      ],
    },
    {
      id: "tf5-no-monitor-mix",
      title: "No Monitor Mix",
      basicChecks: [
        "Verify Mix assignment.",
        "Confirm output routing.",
        "Check Stage Snake output.",
        "Verify monitor power.",
      ],
    },
    {
      id: "tf5-no-playback",
      title: "Playback Has No Audio",
      basicChecks: [
        "Confirm Media Computer cable.",
        "Verify playback input.",
        "Check channel mute.",
        "Verify playback volume.",
      ],
    },
    {
      id: "tf5-no-mic-signal",
      title: "Microphone Has No Signal",
      basicChecks: [
        "Check XLR cable.",
        "Verify channel patch.",
        "Confirm phantom power if required.",
        "Check wireless receiver.",
      ],
    },
    {
      id: "tf5-wrong-scene",
      title: "Wrong Scene Loaded",
      basicChecks: [
        "Load approved Sunday Scene.",
        "Verify routing.",
        "Verify gain settings.",
        "Notify Audio Lead if unsure.",
      ],
    },
  ],
  downloads: [
    { label: "Sunday Scene", href: "#" },
    { label: "Channel List", href: "#" },
    { label: "Signal Flow", href: "#" },
    { label: "TF5 Quick Reference", href: "#" },
  ],
  relatedEquipment: [
    { slug: "stage-snake-a", name: "Stage Snake A" },
    { slug: "stage-snake-b", name: "Stage Snake B" },
    { slug: "media-computer", name: "Media Computer" },
    { name: "Wireless Receivers", href: "/audio/equipment/wireless" },
    { name: "FOH Speakers", href: "/audio/equipment/foh-speakers" },
    { name: "Stage Monitors", href: "/audio/equipment/monitors" },
    { name: "Microphones", href: "/audio/equipment/microphones" },
  ],
};

export const stageSnakeA: EquipmentDefinition = {
  id: "stage-snake-a",
  slug: "stage-snake-a",
  name: "Stage Snake A",
  categoryId: "stage-boxes",
  icon: "🔌",
  purpose:
    "Stage Snake A carries the drum inputs and stage-side outputs between Stage Left and the Yamaha TF5. It is used every Sunday for drum microphones, the drummer in-ear feed, and the Stage Left speaker and monitor connections.",
  quickStart: [
    "Position Stage Snake A at Stage Left",
    "Run the snake cable along the approved route",
    "Connect the snake fan-out to the Yamaha TF5",
    "Patch all approved Stage Left inputs",
    "Patch all approved Stage Left outputs",
    "Verify every connection before soundcheck",
  ],
  inputs: [
    "Input 1 — Kick",
    "Input 2 — Snare",
    "Input 3 — Toms",
    "Input 4 — Floor Tom",
    "Input 5 — Overhead Microphone 1",
    "Input 6 — Overhead Microphone 2",
  ],
  outputs: [
    "Output 1 — Right FOH Speaker",
    "Output 2 — Right Monitor",
    "Output 3 — Drummer In-Ear System",
    "Output 4 — Open",
  ],
  sundaySetup: {
    href: "/audio/setup",
    label: "Open Sunday Setup",
    description: "Stage Left section",
  },
  connectionNotes: [
    "Match every cable label before patching.",
    "Keep the snake cable tight to the approved wall route.",
    "Keep connectors clear of walkways.",
    "Do not power equipment until all signal connections are complete.",
    "Output 4 must remain open unless Daniel approves a change.",
  ],
  commonProblems: [
    {
      id: "snake-a-no-kick",
      title: "No Kick Signal",
      problem: "Kick drum input is not passing signal to the TF5.",
      basicChecks: [
        "Confirm Kick is connected to Input 1",
        "Check XLR seating",
        "Check TF5 channel routing",
        "Swap the XLR if needed",
      ],
      possibleCauses: ["Input 1 connection or routing issue"],
    },
    {
      id: "snake-a-no-drums",
      title: "No Drum Signals",
      problem: "One or more drum inputs are not passing signal.",
      basicChecks: [
        "Confirm Stage Snake A is connected at both ends",
        "Check all input labels",
        "Verify TF5 input routing",
        "Confirm channels are not muted",
      ],
      possibleCauses: ["Snake connection or labeling issue at Stage Left"],
    },
    {
      id: "snake-a-no-foh",
      title: "No FOH Speaker Output",
      problem: "FOH speaker output from Stage Snake A is not working.",
      basicChecks: [
        "Confirm Output 1 connection",
        "Verify speaker power",
        "Verify TF5 Main L/R routing",
        "Check output cable",
      ],
      possibleCauses: ["Output 1 patch or speaker power issue"],
    },
    {
      id: "snake-a-no-monitor",
      title: "No Monitor Output",
      problem: "Stage monitor output from Stage Snake A is not working.",
      basicChecks: [
        "Confirm Output 2 connection",
        "Verify monitor power",
        "Check the assigned TF5 mix",
        "Confirm mix output is not muted",
      ],
      possibleCauses: ["Output 2 patch or monitor mix issue"],
    },
    {
      id: "snake-a-no-ie",
      title: "No Drummer In-Ear",
      problem: "Drummer in-ear feed from Stage Snake A is not working.",
      basicChecks: [
        "Confirm Output 3 connection",
        "Verify the drummer in-ear system is powered",
        "Check the assigned TF5 mix",
        "Confirm output level is safe",
      ],
      possibleCauses: ["Output 3 patch or in-ear system power issue"],
    },
    {
      id: "snake-a-hum",
      title: "Hum or Noise",
      problem: "Hum or noise is present on Stage Snake A signals.",
      basicChecks: [
        "Reseat XLR connections",
        "Separate signal cables from power cables",
        "Check for damaged cables",
        "Test one connection at a time",
      ],
      possibleCauses: ["Ground loop or cable interference"],
    },
  ],
  downloads: [
    { label: "Stage Snake A Patch Map", href: "#" },
    { label: "Stage Left Wiring Guide", href: "#" },
    { label: "Sunday Setup Guide", href: "#" },
  ],
  relatedEquipment: [
    { slug: "yamaha-tf5", name: "Yamaha TF5" },
    { slug: "stage-snake-b", name: "Stage Snake B" },
    { slug: "drummer-in-ear-system", name: "Drummer In-Ear System" },
    { slug: "qsc-kw153-right", name: "Right FOH Speaker" },
    { slug: "stage-monitor-right", name: "Right Monitor" },
    { slug: "kick-microphone", name: "Kick Microphone" },
    { slug: "snare-microphone", name: "Snare Microphone" },
    { slug: "overhead-microphone-1", name: "Overhead Microphones" },
  ],
};

export const stageSnakeB: EquipmentDefinition = {
  id: "stage-snake-b",
  slug: "stage-snake-b",
  name: "Stage Snake B",
  categoryId: "stage-boxes",
  icon: "🔌",
  purpose:
    "Stage Snake B carries the keyboard input and Stage Right outputs between the stage and the Yamaha TF5. It is used every Sunday for the keyboard, Right FOH speaker, Right stage monitor, and the reserved subwoofer output.",
  quickStart: [
    "Position Stage Snake B at Stage Right",
    "Run the snake cable along the approved route",
    "Connect the snake fan-out to the Yamaha TF5",
    "Patch the approved Stage Right input",
    "Patch the approved Stage Right outputs",
    "Verify every connection before soundcheck",
  ],
  inputs: ["Input 1 — Keyboard"],
  outputs: [
    "Output 1 — Right FOH Speaker",
    "Output 2 — Right Stage Monitor",
    "Output 3 — Subwoofer Output Reserved",
    "Output 4 — Open",
  ],
  sundaySetup: {
    href: "/audio/setup",
    label: "Open Sunday Setup",
    description: "Stage Right section",
  },
  connectionNotes: [
    "Match every cable label before patching.",
    "Keep the snake cable tight to the approved wall route.",
    "Keep connectors clear of walkways.",
    "Do not power connected speakers until signal connections are complete.",
    "Output 3 is reserved for a subwoofer.",
    "Output 4 must remain open unless Daniel approves a change.",
  ],
  commonProblems: [
    {
      id: "snake-b-no-keyboard",
      title: "No Keyboard Signal",
      problem: "Keyboard input is not passing signal to the TF5.",
      basicChecks: [
        "Confirm Keyboard is connected to Input 1",
        "Check keyboard power and output level",
        "Reseat the XLR or DI connection",
        "Verify TF5 input routing",
        "Swap the signal cable if needed",
      ],
      possibleCauses: ["Input 1 connection or keyboard output issue"],
    },
    {
      id: "snake-b-no-foh",
      title: "No Right FOH Speaker Output",
      problem: "Right FOH speaker output from Stage Snake B is not working.",
      basicChecks: [
        "Confirm Output 1 connection",
        "Verify speaker power",
        "Verify TF5 Main L/R routing",
        "Check the output cable",
      ],
      possibleCauses: ["Output 1 patch or speaker power issue"],
    },
    {
      id: "snake-b-no-monitor",
      title: "No Right Monitor Output",
      problem: "Right stage monitor output from Stage Snake B is not working.",
      basicChecks: [
        "Confirm Output 2 connection",
        "Verify monitor power",
        "Check the assigned TF5 mix",
        "Confirm the mix output is not muted",
      ],
      possibleCauses: ["Output 2 patch or monitor mix issue"],
    },
    {
      id: "snake-b-no-sub",
      title: "No Subwoofer Output",
      problem: "Subwoofer output from Stage Snake B is not working.",
      basicChecks: [
        "Confirm whether a subwoofer is currently installed",
        "Confirm Output 3 connection",
        "Verify the assigned TF5 output routing",
        "Check the output cable",
        "Do not repurpose Output 3 without approval",
      ],
      possibleCauses: ["Output 3 reserved routing or subwoofer not installed"],
    },
    {
      id: "snake-b-hum",
      title: "Hum or Noise",
      problem: "Hum or noise is present on Stage Snake B signals.",
      basicChecks: [
        "Reseat all signal connections",
        "Separate signal cables from power cables",
        "Check the keyboard or DI connection",
        "Test one cable at a time",
        "Replace damaged cables",
      ],
      possibleCauses: ["Ground loop or cable interference"],
    },
    {
      id: "snake-b-damaged",
      title: "Damaged or Loose Connection",
      problem: "A Stage Snake B connection is damaged or not seated properly.",
      basicChecks: [
        "Inspect both ends of the snake",
        "Check for bent pins or damaged connectors",
        "Reseat the connection firmly",
        "Label and remove damaged cables from service",
        "Notify the Audio Lead",
      ],
      possibleCauses: ["Physical connector or cable damage"],
    },
  ],
  downloads: [
    { label: "Stage Snake B Patch Map", href: "#" },
    { label: "Stage Right Wiring Guide", href: "#" },
    { label: "Sunday Setup Guide", href: "#" },
  ],
  relatedEquipment: [
    { slug: "yamaha-tf5", name: "Yamaha TF5" },
    { slug: "stage-snake-a", name: "Stage Snake A" },
    { slug: "keyboard", name: "Keyboard" },
    { slug: "qsc-kw153-right", name: "Right FOH Speaker" },
    { slug: "stage-monitor-right", name: "Right Stage Monitor" },
    { slug: "subwoofer-output", name: "Subwoofer Output" },
    { slug: "di-boxes", name: "DI Box" },
  ],
};

export const shureBlxReceiver: EquipmentDefinition = {
  id: "shure-blx-receiver",
  slug: "shure-blx-receiver",
  name: "Shure BLX288 Dual Wireless Receiver",
  categoryId: "wireless",
  icon: "🎤",
  purpose:
    "The Shure BLX288 provides wireless audio for handheld microphones used during Sunday services. The receivers feed directly into the Yamaha TF5.",
  channelAssignments: [
    { label: "Purple", value: "TF5 Channel 17" },
    { label: "Yellow", value: "TF5 Channel 18" },
    { label: "Green", value: "TF5 Channel 19" },
    { label: "Blue", value: "TF5 Channel 20" },
  ],
  quickStart: [
    "Power on receivers",
    "Verify antennas",
    "Confirm microphones pair correctly",
    "Verify RF signal",
    "Verify Audio signal",
    "Check battery level",
    "Confirm all four channels pass audio",
  ],
  primaryConnections: ["Power", "TF5 Inputs 17–20", "Wireless Microphones"],
  bestPractices: [
    "Replace weak batteries before service.",
    "Never mix microphone colors.",
    "Keep antennas unobstructed.",
    "Mute microphones when not in use.",
  ],
  commonProblems: [
    {
      id: "blx-no-rf",
      title: "No RF Signal",
      problem: "The receiver shows no RF signal for a wireless microphone.",
      basicChecks: [
        "Confirm the receiver is powered on.",
        "Verify antennas are connected and upright.",
        "Confirm the microphone is powered on.",
        "Check that the microphone is within range.",
        "Reseat the matching color XLR at the receiver.",
      ],
      possibleCauses: [
        "Microphone is powered off or out of range",
        "Antenna is loose or obstructed",
        "Microphone is not paired to the receiver",
      ],
    },
    {
      id: "blx-no-audio",
      title: "No Audio",
      problem: "RF signal is present but no audio passes to the TF5.",
      basicChecks: [
        "Verify the matching color XLR is patched to the correct TF5 input.",
        "Confirm the receiver output volume is up.",
        "Check the TF5 channel is not muted.",
        "Confirm gain is set on the assigned TF5 channel.",
        "Swap the XLR cable if needed.",
      ],
      possibleCauses: [
        "Wrong color cable patched to TF5",
        "Receiver output level too low",
        "TF5 channel muted or not routed",
      ],
    },
    {
      id: "blx-battery-dead",
      title: "Battery Dead",
      problem: "The wireless microphone has no power or drops out immediately.",
      basicChecks: [
        "Replace the microphone batteries.",
        "Confirm battery orientation is correct.",
        "Check for corrosion in the battery compartment.",
        "Verify the power LED on the microphone.",
        "Keep spare batteries at FOH.",
      ],
      possibleCauses: [
        "Weak or dead batteries",
        "Incorrect battery installation",
        "Battery contacts need cleaning",
      ],
    },
    {
      id: "blx-wrong-mic",
      title: "Wrong Microphone",
      problem: "The wrong microphone color or channel is active on the console.",
      basicChecks: [
        "Confirm the microphone color matches the assigned TF5 channel.",
        "Verify Purple → 17, Yellow → 18, Green → 19, Blue → 20.",
        "Check that the correct performer has the matching microphone.",
        "Confirm the Sunday Scene channel labels.",
      ],
      possibleCauses: [
        "Microphone color mixed with wrong cable",
        "Wrong microphone handed to performer",
        "TF5 channel patch does not match color code",
      ],
    },
    {
      id: "blx-dropout",
      title: "Intermittent Dropout",
      problem: "Wireless audio cuts in and out during service.",
      basicChecks: [
        "Replace weak batteries.",
        "Reposition antennas for clear line of sight.",
        "Move the microphone away from metal surfaces and obstructions.",
        "Check for interference from other wireless devices.",
        "Confirm the performer is within approved range.",
      ],
      possibleCauses: [
        "Low battery voltage",
        "RF interference or blocked signal path",
        "Microphone moving out of receiver range",
      ],
    },
  ],
  downloads: [
    { label: "Wireless Guide", href: "#" },
    { label: "Frequency Sheet", href: "#" },
    { label: "Battery Checklist", href: "#" },
  ],
  relatedEquipment: [
    { slug: "yamaha-tf5", name: "Yamaha TF5" },
    { name: "Wireless Microphones", href: "/audio/equipment/microphones" },
    { name: "Sunday Setup", href: "/audio/setup" },
    { name: "Signal Flow", href: "/audio/documentation/signal-flow" },
    { name: "TF5 Channel List", href: "/audio/documentation/tf5-channel-list" },
  ],
};

export const wirelessMicrophones: EquipmentDefinition = {
  id: "wireless-microphones",
  slug: "wireless-microphones",
  name: "Wireless Microphones",
  categoryId: "wireless",
  icon: "🎤",
  relatedEquipment: [
    { slug: "shure-blx-receiver", name: "Shure BLX288 Dual Wireless Receiver" },
    { slug: "yamaha-tf5", name: "Yamaha TF5" },
  ],
};

export const qscKw153: EquipmentDefinition = {
  id: "qsc-kw153",
  slug: "qsc-kw153",
  name: "QSC KW153",
  categoryId: "foh-speakers",
  icon: "🔊",
  purpose:
    "QSC KW153 powered speakers deliver front-of-house audio for the sanctuary.",
  relatedEquipment: [{ slug: "yamaha-tf5", name: "Yamaha TF5" }],
};

export const stageMonitor: EquipmentDefinition = {
  id: "stage-monitor",
  slug: "stage-monitor",
  name: "Stage Monitor",
  categoryId: "monitors",
  icon: "📣",
  purpose:
    "Stage monitors provide on-stage audio for musicians and vocalists during service.",
  relatedEquipment: [{ slug: "yamaha-tf5", name: "Yamaha TF5" }],
};

export const mediaComputer: EquipmentDefinition = {
  id: "media-computer",
  slug: "media-computer",
  name: "Media Computer",
  categoryId: "playback",
  icon: "💻",
  purpose:
    "The media computer sends playback and presentation audio to the Yamaha TF5.",
  relatedEquipment: [{ slug: "yamaha-tf5", name: "Yamaha TF5" }],
};

export const equipmentItems: EquipmentDefinition[] = [
  yamahaTf5,
  stageSnakeA,
  stageSnakeB,
  shureBlxReceiver,
  wirelessMicrophones,
  qscKw153,
  stageMonitor,
  mediaComputer,
];
