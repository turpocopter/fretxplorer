import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: "5em",
      color: theme.palette.gray.main,
      fontSize: "2em",
      textAlign: "center",
    },
  };
});

const scales = [
  {
    category: "Main heptatonic scales",
    subtitle: "with modes available",
    scales: [
      {
        name: "Major scale",
        intervals: [2, 2, 1, 2, 2, 2, 1],
        modes: [
          {
            name: "Ionian mode",
            aliases: ["major scale"],
          },
          {
            name: "Dorian mode",
          },
          {
            name: "Phrygian mode",
          },
          {
            name: "Lydian mode",
          },
          {
            name: "Mixolydian mode",
          },
          {
            name: "Aeolian mode",
            aliases: ["Natural minor scale"],
          },
          {
            name: "Locrian mode",
          },
        ],
      },
      {
        name: "Natural minor scale",
        relatedTo: { name: "Major scale", mode: 5 },
      },
      {
        name: "Ascending melodic minor scale",
        aliases: ["jazz minor scale"],
        steps: [2, 1, 2, 2, 2, 2, 1],
        modes: [
          {
            name: "Ascending melodic minor scale",
            aliases: ["jazz minor scale"],
          },
          {
            name: "Dorian ♭2",
            aliases: ["Phrygian ♮6", "Assyrian", "Phrygidorian"],
          },
          {
            name: "Lydian augmented",
            aliases: ["Lydian #5"],
          },
          {
            name: "Lydian dominant",
            aliases: [
              "Lydian ♭7",
              "Acoustic scale",
              "Overtone scale",
              "Bartok scale",
            ],
          },
          {
            name: "Mixolydian ♭6",
            aliases: [
              "Mixolydian ♭13",
              "Aeolian dominant scale",
              "Aeolian major",
              "melodic major scale",
              "Hindu scale",
            ],
          },
          {
            name: "Locrian ♮2",
            aliases: ["half-diminished scale", "Aeolocrian"],
          },
          {
            name: "Altered scale",
            aliases: ["altered dominant scale", "Super Locrian"],
          },
        ],
      },
      {
        name: "Harmonic minor scale",
        steps: [2, 1, 2, 2, 1, 3, 1],
        modes: [
          { name: "Harmonic minor scale" },
          { name: "Locrian ♮6", aliases: ["Locrian ♮13"] },
          { name: "Ionian #5" },
          {
            name: "Altered Dorian scale",
            aliases: ["Ukrainian Dorian scale", "Romanian minor scale"],
          },
          {
            name: "Phrygian dominant scale",
            aliases: [
              "Altered Phrygian scale",
              "dominant ♭2 ♭6",
              "Freygish scale",
            ],
          },
          { name: "Lydian 2" },
          { name: "Altered Diminished scale" },
        ],
      },
      {
        name: "Double harmonic scale",
        steps: [1, 3, 1, 2, 1, 3, 1],
        modes: [
          {
            name: "Double harmonic major scale",
            aliases: ["Byzantine scale", "Gypsy major scale", "Arabic scale"],
          },
          { name: "	Lydian ♯2 ♯6" },
          { name: "Ultraphrygian" },
          {
            name: "Hungarian minor scale",
            aliases: ["Double harmonic minor scale", "Gypsy minor scale"],
          },
          { name: "Oriental scale" },
          { name: "Ionian ♯2 ♯5" },
          { name: "Locrian 𝄫3 𝄫7" },
        ],
      },
    ],
  },
  {
    category: "Pentatonic scales and derived",
    scales: [
      {
        name: "Pentatonic major scale",
        steps: [2, 2, 3, 2, 3],
        degrees: [1, 2, 3, 5, 6],
        modes: [
          {
            name: "Pentatonic major scale",
            subtitle: "based on the Ionian mode",
            degrees: [1, 2, 3, 5, 6],
          },
          {
            name: "Suspended pentatonic",
            aliases: "Egyptian pentatonic",
            subtitle: "based on the Dorian mode",
            degrees: [1, 2, 4, 5, "♭6"],
          },
          {
            name: "Blues minor pentatonic",
            subtitle: "based on the Phrygian mode",
            degrees: [1, "♭3", 4, "♭6", "♭7"],
          },
          {
            name: "Blues major pentatonic",
            subtitle: "based on the Mixolydian mode",
            degrees: [1, 2, 4, 5, 6],
          },
          {
            name: "Pentatonic minor scale",
            subtitle: "based on the Aeolian mode",
            degrees: [1, "♭3", 4, 5, "♭7"],
          },
        ],
      },
      {
        name: "Pentatonic minor scale",
        relatedTo: { name: "Pentatonic major scale", mode: 4 },
      },
      {
        name: "Hexatonic blues scale",
        subtitle: "Pentatonic minor scale with blue note added",
        steps: [3, 2, 1, 1, 3, 2],
        degrees: [1, "♭3", 4, "♭5", 5, "♭7"], //1, 2,♭3, 3, 5, 6
      },
    ],
  },
  {
    category: "Bebop scales",
    scales: [
      {
        name: "Bebop dominant scale",
        subtitle: "Mixolydian mode with major 7th added",
        steps: [2, 2, 1, 2, 2, 1, 1, 1],
        degrees: [1, 2, 3, 4, 5, 6, "♭7", 7],
      },
      {
        name: "Bebop Dorian scale",
        subtitle: "Dorian mode with major 3rd added",
        steps: [2, 1, 1, 1, 2, 2, 1, 2],
        degrees: [1, 2, "♭3", 3, 4, 5, 6, "♭7"],
      },
      {
        name: "Alternate Bebop Dorian scale",
        subtitle: "Dorian mode with major 7th added",
        steps: [2, 1, 2, 2, 2, 1, 1, 1],
        degrees: [1, 2, "♭3", 4, 5, 6, "♭7", 7],
      },
      {
        name: "Bebop major scale",
        subtitle: "Major scale with ♯5 added",
        steps: [2, 2, 1, 2, 1, 1, 2, 1],
        degrees: [1, 2, 3, 4, 5, "♯5", 6, 7],
      },
      {
        name: "Bebop melodic minor scale",
        subtitle: "Melodic minor scale with ♯5 added",
        steps: [2, 1, 2, 2, 1, 1, 2, 1],
        degrees: [1, 2, "♭3", 4, 5, "♯5", 6, 7],
      },
      {
        name: "Bebop harmonic minor scale",
        subtitle: "Harmonic minor scale with ♭7 addeed",
        steps: [2, 1, 2, 2, 1, 2, 1, 1],
        degrees: [1, 2, "♭3", 4, 5, "♭6", "♭7", 7],
      },
    ],
  },
  {
    category: "Hexatonic scales",
    scales: [
      {
        name: "Whole tone scale",
        aliases: ["Messiaen's first mode"],
        steps: [2, 2, 2, 2, 2, 2],
      },
      {
        name: "Augmented scale",
        steps: [3, 1, 3, 1, 3, 1],
        degrees: [1, "♭3", 3, 5, "♯5", 7],
      },
      {
        name: "Prometheus scale",
        steps: [2, 2, 2, 3, 1, 2],
        degrees: [1, 2, 3, "♯4", 6, "♭7"],
      },
      {
        name: "Tritone scale",
        steps: [1, 3, 2, 1, 3, 2],
        degrees: [1, "♭2", 3, "♭5", 5, "♭7"],
      },
      {
        name: "Two-semitone tritone scale",
        steps: [1, 1, 4, 1, 1, 4],
        degrees: [1, "♭2", 2, "♯4", 5, "♭6"],
      },
    ],
  },
  {
    category: "Heptatonic scales",
    scales: [
      { name: "Minor Neapolitan scale", steps: [1, 2, 2, 2, 1, 3, 1] },
      { name: "Major Neapolitan scale", steps: [1, 2, 2, 2, 2, 2, 1] },
      { name: "Enigmatic scale", steps: [1, 3, 2, 2, 2, 1, 1] },
      { name: "Hungarian Major scale", steps: [3, 1, 2, 1, 2, 1, 2] },
      { name: "Persian scale", steps: [1, 3, 1, 1, 2, 3, 1] },
    ],
  },
  {
    category: "Octatonic scales",
    scales: [
      {
        name: "Whole Half Diminished",
        aliases: ["Messiaen's second mode"],
        steps: [2, 1, 2, 1, 2, 1, 2, 1],
        degrees: [1, 2, "♭3", 4, "♭5", "♯5", 6, 7],
      },
      {
        name: "Half Whole Diminished",
        steps: [1, 2, 1, 2, 1, 2, 1, 2],
        degrees: [1, "♭9", "♯9", 3, "♯11", 5, 13, "♭7"],
      },
    ],
  },
];

const ScalePicker = () => {
  const classes = useStyles();
  console.log(scales);
  return <div className={classes.root}>Coming soon...</div>;
};

export default ScalePicker;
