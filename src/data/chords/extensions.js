import { hasNote } from "utility/intervals";

const extensionsList = {
	none: {
		symbol: "none",
		notes: [],
		isAvailable: (selected) => true,
		nameChord: (selected) => null,
	},

	e6: {
		symbol: "6",
		notes: [{ semitonesFromRoot: 9, degree: 6 }],
		isAvailable: (selected) =>
			!hasNote(selected, 10, 7) &&
			!hasNote(selected, 11, 7) &&
			!hasNote(selected, 9, 7) &&
			!(hasNote(selected, 4, 3) && hasNote(selected, 6, 5)),
		nameChord: (selected) => {
			if (hasNote(selected, 6, 5)) return "<sup>o</sup>6";
			if (hasNote(selected, 8, 5)) return "+6";
			else if (hasNote(selected, 4, 3)) return "6";
			else if (hasNote(selected, 3, 3)) return "m6";
			else if (hasNote(selected, 5, 4)) return "6sus4";
			else if (hasNote(selected, 2, 2)) return "6sus2";
		},
	},
	"e6/9": {
		symbol: "6/9",
		notes: [
			{ semitonesFromRoot: 9, degree: 6 },
			{ semitonesFromRoot: 2, degree: 9 },
		],
		isAvailable: (selected) =>
			(hasNote(selected, 4, 3) || hasNote(selected, 3, 3)) &&
			!hasNote(selected, 10, 7) &&
			!hasNote(selected, 11, 7) &&
			!hasNote(selected, 9, 7) &&
			!(hasNote(selected, 4, 3) && hasNote(selected, 6, 5)),
		nameChord: (selected) => {
			if (hasNote(selected, 6, 5)) return "<sup>o</sup>6/9";
			else if (hasNote(selected, 8, 5)) return "+6/9";
			else if (hasNote(selected, 4, 3)) return "6/9";
			else return "m6/9";
		},
	},
	e9: {
		symbol: "9",
		notes: [{ semitonesFromRoot: 2, degree: 9 }],
		isAvailable: (selected) =>
			(hasNote(selected, 10, 7) ||
				hasNote(selected, 11, 7) ||
				hasNote(selected, 9, 7)) &&
			!hasNote(selected, 2, 2) &&
			!(hasNote(selected, 4, 3) && hasNote(selected, 6, 5)),
		nameChord: (selected) => {
			if (hasNote(selected, 11, 7)) {
				// maj 7th
				if (hasNote(selected, 8, 5)) return "+<sup>M9</sup>";
				else if (hasNote(selected, 5, 4)) return "M9sus4";
				else if (hasNote(selected, 4, 3)) return "M9";
				else if (hasNote(selected, 3, 3)) return "m<sup>M9</sup>";
			} else if (hasNote(selected, 10, 7)) {
				// min 7th
				if (hasNote(selected, 8, 5)) return "+9";
				else if (hasNote(selected, 5, 4)) return "9sus4";
				else if (hasNote(selected, 4, 3)) return "9";
				else if (hasNote(selected, 3, 3)) {
					if (hasNote(selected, 6, 5)) return "<sup>ø</sup>9";
					else return "m9";
				}
			} else if (hasNote(selected, 9, 7)) return "<sup>o</sup>9";
		},
	},
	add9: {
		symbol: "add9",
		notes: [{ semitonesFromRoot: 2, degree: 9 }],
		isAvailable: (selected) =>
			(hasNote(selected, 4, 3) ||
				hasNote(selected, 3, 3) ||
				hasNote(selected, 5, 4)) &&
			!hasNote(selected, 10, 7) &&
			!hasNote(selected, 11, 7) &&
			!hasNote(selected, 9, 7) &&
			!(hasNote(selected, 4, 3) && hasNote(selected, 6, 5)),
		nameChord: (selected) => {
			if (hasNote(selected, 6, 5)) return "<sup>oadd9</sup>";
			else if (hasNote(selected, 8, 5)) return "+<sup>add9</sup>";
			else if (hasNote(selected, 4, 3)) return "<sup>add9</sup>";
			else if (hasNote(selected, 3, 3)) return "m<sup>add9</sup>";
			else if (hasNote(selected, 5, 4)) return "sus4<sup>add9</sup>";
		},
	},
	e11: {
		symbol: "11",
		notes: [
			{ semitonesFromRoot: 2, degree: 9 },
			{ semitonesFromRoot: 5, degree: 11 },
		],
		isAvailable: (selected) =>
			(hasNote(selected, 10, 7) ||
				hasNote(selected, 11, 7) ||
				hasNote(selected, 9, 7)) &&
			!hasNote(selected, 2, 2) &&
			!hasNote(selected, 5, 4) &&
			!(hasNote(selected, 4, 3) && hasNote(selected, 6, 5)),
		nameChord: (selected) => {
			if (hasNote(selected, 11, 7)) {
				// maj7
				if (hasNote(selected, 8, 5)) return "+<sup>M11</sup>";
				else if (hasNote(selected, 4, 3)) return "M11";
				else if (hasNote(selected, 3, 3)) return "m<sup>M11</sup>";
			} else if (hasNote(selected, 10, 7)) {
				// min7
				if (hasNote(selected, 8, 5)) return "+11";
				else if (hasNote(selected, 4, 3)) {
					if (hasNote(selected, 6, 5)) return "11♭5";
					else return "11";
				} else if (hasNote(selected, 3, 3)) {
					if (hasNote(selected, 6, 5)) return "<sup>ø</sup>11";
					else return "m11";
				}
			} else if (hasNote(selected, 9, 7)) return "<sup>o</sup>11";
		},
	},
	add11: {
		symbol: "add11",
		notes: [{ semitonesFromRoot: 5, degree: 11 }],
		isAvailable: (selected) =>
			!hasNote(selected, 2, 2) &&
			!hasNote(selected, 5, 4) &&
			!(hasNote(selected, 4, 3) && hasNote(selected, 6, 5)),
		nameChord: (selected) => {
			if (hasNote(selected, 8, 5)) {
				if (hasNote(selected, 10, 7)) return "+7<sup>add11</sup>";
				else if (hasNote(selected, 11, 7)) return "+<sup>M7add11</sup>";
				return "+<sup>add11</sup>";
			} else if (hasNote(selected, 4, 3)) {
				if (hasNote(selected, 10, 7)) return "7<sup>add11</sup>";
				else if (hasNote(selected, 11, 7)) return "M7<sup>add11</sup>";
				return "<sup>add11</sup>";
			} else if (hasNote(selected, 10, 7)) {
				if (hasNote(selected, 6, 5)) return "<sup>ø</sup>7<sup>add11</sup>";
				return "m7<sup>add11</sup>";
			} else if (hasNote(selected, 11, 7)) return "m<sup>M7add11</sup>";
			else if (hasNote(selected, 9, 7)) return "<sup>o</sup>7<sup>add11</sup>";
			else if (hasNote(selected, 6, 5)) return "<sup>oadd11</sup>";
			return "m<sup>add11</sup>";
		},
	},
	e13: {
		symbol: "13",
		notes: [
			{ semitonesFromRoot: 2, degree: 9 },
			{ semitonesFromRoot: 5, degree: 11 },
			{ semitonesFromRoot: 9, degree: 13 },
		],
		isAvailable: (selected) =>
			(hasNote(selected, 10, 7) || hasNote(selected, 11, 7)) &&
			!hasNote(selected, 2, 2) &&
			!hasNote(selected, 5, 4) &&
			!(hasNote(selected, 4, 3) && hasNote(selected, 6, 5)),
		nameChord: (selected) => {
			if (hasNote(selected, 11, 7)) {
				if (hasNote(selected, 8, 5)) return "+<sup>M13</sup>";
				else if (hasNote(selected, 4, 3)) return "M13";
				else if (hasNote(selected, 3, 3)) return "m<sup>M13</sup>";
			} else if (hasNote(selected, 10, 7)) {
				if (hasNote(selected, 8, 5)) return "+13";
				else if (hasNote(selected, 4, 3)) return "13";
				else if (hasNote(selected, 3, 3)) {
					if (hasNote(selected, 6, 5)) return "<sup>ø</sup>13";
					else return "m13";
				}
			}
		},
	},
	add13: {
		symbol: "add13",
		notes: [{ semitonesFromRoot: 9, degree: 13 }],
		isAvailable: (selected) =>
			!hasNote(selected, 6, 5) &&
			!hasNote(selected, 2, 2) &&
			!hasNote(selected, 5, 4),
		nameChord: (selected) => {
			if (hasNote(selected, 8, 5)) {
				if (hasNote(selected, 10, 7)) return "+7<sup>add13</sup>";
				else if (hasNote(selected, 11, 7)) return "+<sup>M7add13</sup>";
				return "+<sup>add13</sup>";
			}
			if (hasNote(selected, 4, 3)) {
				if (hasNote(selected, 10, 7)) return "7<sup>add13</sup>";
				else if (hasNote(selected, 11, 7)) return "M7<sup>add13</sup>";
				return "<sup>add13</sup>";
			} else if (hasNote(selected, 10, 7)) return "m7<sup>add13</sup>";
			else if (hasNote(selected, 11, 7)) return "m<sup>M7add13</sup>";
			return "m<sup>add13</sup>";
		},
	},

	/*e6add11: {
    symbol: "6add11",
    notes: [
      { semitonesFromRoot: 9, degree: 6 },
      { semitonesFromRoot: 5, degree: 11 },
    ],
    isAvailable: (selected) =>
      !hasNote(selected, 10, 7) &&
      !hasNote(selected, 11, 7) &&
      !hasNote(selected, 9, 7) &&
      !hasNote(selected, 2, 2) &&
      !hasNote(selected, 5, 4),
    nameChord: (selected) => {
      if (hasNote(selected, 8, 5)) return "+6<sup>add11</sup>";
      else if (hasNote(selected, 4, 3)) return "6<sup>add11</sup>";
      else if (hasNote(selected, 6, 5)) return "o6<sup>add11</sup>";
      else if (hasNote(selected, 3, 3)) return "m6<sup>add11</sup>";
    },
  },
  e9add13: {
    symbol: "9add13",
    notes: [
      { semitonesFromRoot: 2, degree: 9 },
      { semitonesFromRoot: 9, degree: 13 },
    ],
    isAvailable: (selected) =>
      (hasNote(selected, 4, 3) || hasNote(selected, 3, 3)) &&
      (hasNote(selected, 10, 7) || hasNote(selected, 11, 7)) &&
      !hasNote(selected, 6, 5),
    nameChord: (selected) => {
      if (hasNote(selected, 8, 5)) {
        if (hasNote(selected, 10, 7)) return "+9<sup>add13</sup>";
        return "+<sup>M9add13</sup>";
      } else if (hasNote(selected, 4, 3)) {
        if (hasNote(selected, 10, 7)) return "9<sup>add13</sup>";
        return "M9<sup>add13</sup>";
      } else if (hasNote(selected, 11, 7)) return "m<sup>M9add13</sup>";
      return "m9<sup>add13</sup>";
    },
  },*/

	flat9: {
		symbol: "♭9",
		notes: [{ semitonesFromRoot: 1, degree: 9 }],
		isAvailable: (selected) =>
			(hasNote(selected, 3, 3) ||
				hasNote(selected, 4, 3) ||
				hasNote(selected, 5, 4)) &&
			((hasNote(selected, 11, 7) && !hasNote(selected, 8, 5)) ||
				hasNote(selected, 10, 7) ||
				hasNote(selected, 9, 7)),
		nameChord: (selected) => {
			if (hasNote(selected, 11, 7)) {
				if (hasNote(selected, 4, 3)) return "M7♭9";
				else return "m<sup>M7</sup>♭9";
			} else if (hasNote(selected, 10, 7)) {
				if (hasNote(selected, 8, 5)) return "7♯5♭9";
				else if (hasNote(selected, 6, 5)) {
					if (hasNote(selected, 4, 3)) return "7♭5♭9";
					else return "<sup>ø</sup>7♭9";
				} else if (hasNote(selected, 5, 4)) {
					if (hasNote(selected, 10, 7)) return "7♭9sus4";
					else return "♭9sus";
				} else if (hasNote(selected, 4, 3)) return "7♭9";
				else return "m7♭9";
			} else if (hasNote(selected, 9, 7)) return "<sup>o</sup>7♭9";
		},
	},
	sharp9: {
		symbol: "♯9",
		notes: [{ semitonesFromRoot: 3, degree: 9 }],
		isAvailable: (selected) =>
			(hasNote(selected, 7, 5) &&
				((hasNote(selected, 3, 3) && hasNote(selected, 10, 7)) ||
					(hasNote(selected, 4, 3) && hasNote(selected, 10, 7)) ||
					(hasNote(selected, 4, 3) && hasNote(selected, 11, 7)))) ||
			((hasNote(selected, 6, 5) || hasNote(selected, 8, 5)) &&
				hasNote(selected, 10, 7) &&
				hasNote(selected, 4, 3)),
		nameChord: (selected) => {
			if (hasNote(selected, 11, 7)) return "M7♯9";
			else if (hasNote(selected, 4, 3)) {
				if (hasNote(selected, 6, 5)) return "7♭5♯9";
				else if (hasNote(selected, 8, 5)) return "7♯5♯9";
				else return "7♯9";
			} else return "m7♯9";
		},
	},
	sharp11: {
		symbol: "♯11",
		notes: [{ semitonesFromRoot: 6, degree: 11 }],
		isAvailable: (selected) =>
			((hasNote(selected, 11, 7) && hasNote(selected, 4, 3)) ||
				(hasNote(selected, 10, 7) &&
					(hasNote(selected, 4, 3) || hasNote(selected, 3, 3)) &&
					!hasNote(selected, 6, 5))) &&
			!hasNote(selected, 8, 5),
		nameChord: (selected) => {
			if (hasNote(selected, 11, 7)) return "M7♯11";
			else if (hasNote(selected, 4, 3)) return "7♯11";
			else return "m7♯11";
		},
	},
	e9sharp11: {
		symbol: "9♯11",
		notes: [
			{ semitonesFromRoot: 2, degree: 9 },
			{ semitonesFromRoot: 6, degree: 11 },
		],
		isAvailable: (selected) =>
			hasNote(selected, 11, 7) &&
			hasNote(selected, 7, 5) &&
			hasNote(selected, 4, 3),
		nameChord: (selected) => "M9♯11",
	},
	flat13: {
		symbol: "♭13",
		notes: [{ semitonesFromRoot: 8, degree: 13 }],
		isAvailable: (selected) =>
			hasNote(selected, 10, 7) &&
			hasNote(selected, 4, 3) &&
			!hasNote(selected, 6, 5) &&
			!hasNote(selected, 8, 5),
		nameChord: (selected) => "7♭13",
	},
	flat9flat13: {
		symbol: "♭9♭13",
		notes: [
			{ semitonesFromRoot: 1, degree: 9 },
			{ semitonesFromRoot: 8, degree: 13 },
		],
		isAvailable: (selected) =>
			hasNote(selected, 10, 7) &&
			hasNote(selected, 4, 3) &&
			!hasNote(selected, 6, 5) &&
			!hasNote(selected, 8, 5),
		nameChord: (selected) => "7♭9♭13",
	},
	e13flat9: {
		symbol: "13♭9",
		notes: [
			{ semitonesFromRoot: 1, degree: 9 },
			{ semitonesFromRoot: 9, degree: 13 },
		],
		isAvailable: (selected) =>
			hasNote(selected, 10, 7) &&
			(hasNote(selected, 4, 3) || hasNote(selected, 5, 4)) &&
			!hasNote(selected, 6, 5) &&
			!hasNote(selected, 8, 5),
		nameChord: (selected) => (hasNote(selected, 5, 4) ? "13♭9sus4" : "13♭9"),
	},
	e13sharp9: {
		symbol: "13♯9",
		notes: [
			{ semitonesFromRoot: 3, degree: 9 },
			{ semitonesFromRoot: 9, degree: 13 },
		],
		isAvailable: (selected) =>
			hasNote(selected, 10, 7) &&
			hasNote(selected, 4, 3) &&
			!hasNote(selected, 6, 5) &&
			!hasNote(selected, 8, 5),
		nameChord: (selected) => "13♯9",
	},
};

export default extensionsList;
