const scales = [
  {
    category: "Main heptatonic scales",
    subtitle: "with modes available",
    scales: [
      {
        shortName: "Major",
        fullName: "Major scale",
        semitonesFromRoot: [0, 2, 4, 5, 7, 9, 11],
        modes: [
          {
            shortName: "Major",
            fullName: "Major scale",
            listName: "Ionian",
            aliases: ["Ionian"],
          },
          {
            shortName: "Dorian",
            fullName: "Dorian mode",
          },
          {
            shortName: "Phrygian",
            fullName: "Phrygian mode",
          },
          {
            shortName: "Lydian",
            fullName: "Lydian mode",
          },
          {
            shortName: "Mixolydian",
            fullName: "Mixolydian mode",
          },
          {
            shortName: "minor",
            fullName: "Natural minor scale",
            listName: "Aeolian",
            aliases: ["Aeolian"],
          },
          {
            shortName: "Locrian",
            fullName: "Locrian mode",
          },
        ],
      },
      {
        shortName: "minor",
        fullName: "Natural minor scale",
        relatedTo: { name: "Major scale", mode: 5 },
      },
      {
        shortName: "melodic minor ascending",
        fullName: "Ascending melodic minor scale",
        aliases: ["jazz minor scale"],
        semitonesFromRoot: [0, 2, 3, 5, 7, 9, 11],
        modes: [
          {
            shortName: "melodic minor ascending",
            fullName: "Ascending melodic minor scale",
            aliases: ["jazz minor scale"],
          },
          {
            fullName: "Dorian ♭2",
            aliases: ["Phrygian ♮6", "Assyrian", "Phrygidorian"],
          },
          {
            fullName: "Lydian augmented",
            aliases: ["Lydian #5"],
          },
          {
            fullName: "Lydian dominant",
            aliases: [
              "Lydian ♭7",
              "Acoustic scale",
              "Overtone scale",
              "Bartok scale",
            ],
          },
          {
            fullName: "Mixolydian ♭6",
            aliases: [
              "Mixolydian ♭13",
              "Aeolian dominant scale",
              "Aeolian major",
              "melodic major scale",
              "Hindu scale",
            ],
          },
          {
            fullName: "Locrian ♮2",
            aliases: ["half-diminished scale", "Aeolocrian"],
          },
          {
            shortName: "altered",
            fullName: "Altered scale",
            aliases: ["altered dominant scale", "Super Locrian"],
          },
        ],
      },
      {
        shortName: "harmonic minor",
        fullName: "Harmonic minor scale",
        semitonesFromRoot: [0, 2, 3, 5, 7, 8, 11],
        modes: [
          { shortName: "harmonic minor", fullName: "Harmonic minor scale" },
          { fullName: "Locrian ♮6", aliases: ["Locrian ♮13"] },
          { fullName: "Ionian ♯5" },
          {
            shortName: "Dorian altered",
            fullName: "Altered Dorian scale",
            aliases: ["Ukrainian Dorian scale", "Romanian minor scale"],
          },
          {
            shortName: "Phrygian dominant",
            fullName: "Phrygian dominant scale",
            aliases: [
              "Altered Phrygian scale",
              "dominant ♭2 ♭6",
              "Freygish scale",
            ],
          },
          { fullName: "Lydian ♯2" },
          {
            shortName: "altered diminished",
            fullName: "Altered Diminished scale",
          },
        ],
      },
      {
        shortName: "double harmonic",
        fullName: "Double harmonic scale",
        semitonesFromRoot: [0, 1, 4, 5, 7, 8, 11],
        modes: [
          {
            shortName: "double harmonic major",
            fullName: "Double harmonic major scale",
            aliases: ["Byzantine scale", "Gypsy major scale", "Arabic scale"],
          },
          { fullName: "Lydian ♯2 ♯6" },
          { fullName: "Ultraphrygian" },
          {
            shortName: "Hungarian minor",
            fullName: "Hungarian minor scale",
            aliases: ["Double harmonic minor scale", "Gypsy minor scale"],
          },
          { shortName: "Oriental", fullName: "Oriental scale" },
          { fullName: "Ionian ♯2 ♯5" },
          { fullName: "Locrian 𝄫3 𝄫7" },
        ],
      },
    ],
  },
  {
    category: "Pentatonic scales and derived",
    scales: [
      {
        shortName: "pentatonic major",
        fullName: "Pentatonic major scale",
        semitonesFromRoot: [0, 2, 4, 7, 9],
        displayIntervals: [1, 2, 3, 5, 6],
        modes: [
          {
            shortName: "pentatonic major",
            fullName: "Pentatonic major scale",
            displayIntervals: [1, 2, 3, 5, 6],
          },
          {
            shortName: "suspended pentatonic",
            fullName: "Suspended pentatonic",
            aliases: ["Egyptian pentatonic"],
            displayIntervals: [1, 2, 4, 5, "♭7"],
          },
          {
            shortName: "blues minor pentatonic",
            fullName: "Blues minor pentatonic",
            displayIntervals: [1, "♭3", 4, "♭6", "♭7"],
          },
          {
            shortName: "blues major pentatonic",
            fullName: "Blues major pentatonic",
            displayIntervals: [1, 2, 4, 5, 6],
          },
          {
            shortName: "pentatonic minor",
            fullName: "Pentatonic minor scale",
            displayIntervals: [1, "♭3", 4, 5, "♭7"],
          },
        ],
      },
      {
        shortName: "pentatonic minor",
        fullName: "Pentatonic minor scale",
        relatedTo: { name: "Pentatonic major scale", mode: 4 },
      },
      {
        shortName: "blues hexatonic",
        fullName: "Hexatonic blues scale",
        subtitle: "Pentatonic minor scale with blue note added",
        semitonesFromRoot: [0, 3, 5, 6, 7, 10],
        displayIntervals: [1, "♭3", 4, "♭5", 5, "♭7"],
      },
    ],
  },
  {
    category: "Bebop scales",
    scales: [
      {
        shortName: "bebop dominant",
        fullName: "Bebop dominant scale",
        subtitle: "Mixolydian mode with major 7th added",
        semitonesFromRoot: [0, 2, 4, 5, 7, 9, 10, 11],
        displayIntervals: [1, 2, 3, 4, 5, 6, "♭7", 7],
      },
      {
        shortName: "bebop Dorian",
        fullName: "Bebop Dorian scale",
        subtitle: "Dorian mode with major 3rd added",
        semitonesFromRoot: [0, 2, 3, 4, 5, 7, 9, 10],
        displayIntervals: [1, 2, "♭3", 3, 4, 5, 6, "♭7"],
      },
      {
        shortName: "bebop Dorian (alt.)",
        fullName: "Alternate Bebop Dorian scale",
        subtitle: "Dorian mode with major 7th added",
        semitonesFromRoot: [0, 2, 3, 5, 7, 9, 10, 11],
        displayIntervals: [1, 2, "♭3", 4, 5, 6, "♭7", 7],
      },
      {
        shortName: "bebop major",
        fullName: "Bebop major scale",
        subtitle: "Major scale with ♯5 added",
        semitonesFromRoot: [0, 2, 4, 5, 7, 8, 9, 11],
        displayIntervals: [1, 2, 3, 4, 5, "♯5", 6, 7],
      },
      {
        shortName: "bebop melodic minor",
        fullName: "Bebop melodic minor scale",
        subtitle: "Melodic minor scale with ♯5 added",
        semitonesFromRoot: [0, 2, 3, 5, 7, 8, 9, 11],
        displayIntervals: [1, 2, "♭3", 4, 5, "♯5", 6, 7],
      },
      {
        shortName: "bebop harmonic minor",
        fullName: "Bebop harmonic minor scale",
        subtitle: "Harmonic minor scale with ♭7 addeed",
        semitonesFromRoot: [0, 2, 3, 5, 7, 8, 10, 11],
        displayIntervals: [1, 2, "♭3", 4, 5, "♭6", "♭7", 7],
      },
    ],
  },
  {
    category: "Hexatonic scales",
    scales: [
      {
        shortName: "whole tone",
        fullName: "Whole tone scale",
        aliases: ["Messiaen's first mode"],
        semitonesFromRoot: [0, 2, 4, 6, 8, 10],
        displayIntervals: [1, "2", "3", "#4", "#5", "#6"],
      },
      {
        shortName: "augmented",
        fullName: "Augmented scale",
        semitonesFromRoot: [0, 3, 4, 7, 8, 11],
        displayIntervals: [1, "♭3", 3, 5, "♯5", 7],
      },
      {
        shortName: "Prometheus",
        fullName: "Prometheus scale",
        semitonesFromRoot: [0, 2, 4, 6, 9, 10],
        displayIntervals: [1, 2, 3, "♯4", 6, "♭7"],
      },
      {
        shortName: "tritone",
        fullName: "Tritone scale",
        semitonesFromRoot: [0, 1, 4, 6, 7, 10],
        displayIntervals: [1, "♭2", 3, "♭5", 5, "♭7"],
      },
      {
        shortName: "two-semitone tritone",
        fullName: "Two-semitone tritone scale",
        semitonesFromRoot: [0, 1, 2, 6, 7, 8],
        displayIntervals: [1, "♭2", 2, "♯4", 5, "♭6"],
      },
    ],
  },
  {
    category: "Heptatonic scales",
    scales: [
      {
        shortName: "Neapolitan minor",
        fullName: "Minor Neapolitan scale",
        semitonesFromRoot: [0, 1, 3, 5, 7, 8, 11],
      },
      {
        shortName: "Neapolitan major",
        fullName: "Major Neapolitan scale",
        semitonesFromRoot: [0, 1, 3, 5, 7, 9, 11],
      },
      {
        shortName: "enigmatic",
        fullName: "Enigmatic scale",
        semitonesFromRoot: [0, 1, 4, 6, 7, 10, 11],
      },
      {
        shortName: "Hungarian major",
        fullName: "Hungarian Major scale",
        semitonesFromRoot: [0, 3, 4, 6, 7, 9, 10],
      },
      {
        shortName: "Persian",
        fullName: "Persian scale",
        semitonesFromRoot: [0, 1, 4, 5, 6, 8, 11],
      },
    ],
  },
  {
    category: "Octatonic scales",
    scales: [
      {
        fullName: "Whole Half Diminished",
        aliases: ["Messiaen's second mode"],
        semitonesFromRoot: [0, 2, 3, 5, 6, 8, 9, 11],
        displayIntervals: [1, 2, "♭3", 4, "♭5", "♯5", 6, 7],
      },
      {
        fullName: "Half Whole Diminished",
        semitonesFromRoot: [0, 1, 3, 4, 6, 7, 9, 10],
        displayIntervals: [1, "♭9", "♯9", 3, "♯11", 5, 13, "♭7"],
      },
    ],
  },
];

export default scales;
