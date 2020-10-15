const tuningPresets = [
  {
    cat_name: "Standard and derived",
    tunings: [
      {
        id: "EADGBE",
        name: "Standard",
        tuning: [
          { stringId: 6, note: 4, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "DADGBE",
        name: "Drop $2$",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "DADBGD",
        name: "Double drop $2$",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "BEADF♯B",
        name: "Baritone",
        tuning: [
          { stringId: 6, note: 11, octave: 1 },
          { stringId: 5, note: 4, octave: 2 },
          { stringId: 4, note: 9, octave: 2 },
          { stringId: 3, note: 2, octave: 3 },
          { stringId: 2, note: 6, octave: 3 },
          { stringId: 1, note: 11, octave: 3 },
        ],
      },
    ],
  },
  {
    cat_name: "Tunings in $0$",
    tunings: [
      {
        id: "CGCGCE",
        name: "Open $0$ major",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "CGCGCE♭",
        name: "Open $0$ minor",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 3, octave: 4 },
        ],
      },
      {
        id: "CGCGGC",
        name: "Open $0$ no third / Ben Howard",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 7, octave: 3 },
          { stringId: 1, note: 0, octave: 4 },
        ],
      },
    ],
  },
  {
    cat_name: "Tunings in $2$",
    tunings: [
      {
        id: "DADGAD",
        name: "$2$sus4",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DADF♯AD",
        name: "Open $2$ major / Vestapol",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 6, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DADFAD",
        name: "Open $2$ minor",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 5, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DADEAD",
        name: "$2$sus2",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 4, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DADDAD",
        name: "Open $2$ - no third",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 2, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
    ],
  },
  {
    cat_name: "Tunings in $7$",
    tunings: [
      {
        id: "DGDGBD",
        name: "Open $7$ major",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DGDGB♭D",
        name: "Open $7$ minor",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 10, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
    ],
  },
  {
    cat_name: "Other open tunings",
    tunings: [
      {
        id: "EAC♯EAE",
        name: "Open $9$ major",
        tuning: [
          { stringId: 6, note: 4, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 1, octave: 3 },
          { stringId: 3, note: 4, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "EACEAE",
        name: "Open $9$ minor",
        tuning: [
          { stringId: 6, note: 4, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 4, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "EAEACE",
        name: "Open $9$ minor v2",
        tuning: [
          { stringId: 6, note: 4, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 4, octave: 3 },
          { stringId: 3, note: 9, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "BF♯BF♯BD♯",
        name: "Open $11$ major",
        tuning: [
          { stringId: 6, note: 11, octave: 1 },
          { stringId: 5, note: 6, octave: 2 },
          { stringId: 4, note: 11, octave: 2 },
          { stringId: 3, note: 6, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 3, octave: 4 },
        ],
      },
      {
        id: "CFCFAC",
        name: "Open $5$ major",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 5, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 5, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 0, octave: 4 },
        ],
      },
    ],
  },
  {
    cat_name: "Other modal & extended tunings",
    tunings: [
      {
        id: "BEBEBE",
        name: "Nick Drake's $11$ modal",
        tuning: [
          { stringId: 6, note: 11, octave: 1 },
          { stringId: 5, note: 4, octave: 2 },
          { stringId: 4, note: 11, octave: 2 },
          { stringId: 3, note: 4, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "CACGCE",
        name: "$0$6",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "CGDGCD",
        name: "$7$sus4 / Orkney Tuning",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DGDGBE",
        name: "$7$6",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
    ],
  },
  {
    cat_name: "Other",
    tunings: [
      {
        id: "BF♯BGBE",
        name: "Karnivool Tuning",
        tuning: [
          { stringId: 6, note: 11, octave: 1 },
          { stringId: 5, note: 6, octave: 2 },
          { stringId: 4, note: 11, octave: 2 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "CGCFCE",
        name: "Pink Moon",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 5, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "CGDAEG",
        name: "Fripp's New Standard Tuning",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 9, octave: 3 },
          { stringId: 2, note: 4, octave: 4 },
          { stringId: 1, note: 7, octave: 4 },
        ],
      },
      {
        id: "DADEBC♯",
        name: "Ålesund",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 4, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 1, octave: 4 },
        ],
      },
      {
        id: "DADF♯BE",
        name: "José González tuning",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 6, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "DGCGCD",
        name: "The Rain Song",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
    ],
  },
];

export const tuningPresetsSimpleList = tuningPresets
  .map((cat) => cat.tunings)
  .reduce((a, b) => [...a, ...b]);

export default tuningPresets;
