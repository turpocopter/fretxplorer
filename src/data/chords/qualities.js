const chordQualities = {
  major: {
    symbol: "",
    notes: [
      { semitonesFromRoot: 4, degree: 3 },
      { semitonesFromRoot: 7, degree: 5 },
    ],
  },
  minor: {
    symbol: "m",
    notes: [
      { semitonesFromRoot: 3, degree: 3 },
      { semitonesFromRoot: 7, degree: 5 },
    ],
  },
  augmented: {
    symbol: "+",
    notes: [
      { semitonesFromRoot: 4, degree: 3 },
      { semitonesFromRoot: 8, degree: 5 },
    ],
  },
  diminished: {
    symbol: "<sup>o</sup>",
    notes: [
      { semitonesFromRoot: 3, degree: 3 },
      { semitonesFromRoot: 6, degree: 5 },
    ],
  },
  sus2: {
    symbol: "sus2",
    notes: [
      { semitonesFromRoot: 2, degree: 2 },
      { semitonesFromRoot: 7, degree: 5 },
    ],
  },
  sus4: {
    symbol: "sus4",
    notes: [
      { semitonesFromRoot: 5, degree: 4 },
      { semitonesFromRoot: 7, degree: 5 },
    ],
  },
  "major ♭5": {
    symbol: "♭5",
    notes: [
      { semitonesFromRoot: 4, degree: 3 },
      { semitonesFromRoot: 6, degree: 5 },
    ],
  },
  powerchord: {
    symbol: "5",
    notes: [{ semitonesFromRoot: 7, degree: 5 }],
  },
};

export default chordQualities;
