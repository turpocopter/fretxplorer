import { hasNote } from "utility/intervals";

const seventhList = {
  none: {
    semitonesFromRoot: null,
    isAvailable: (selected) =>
      (hasNote(selected, 4, 3) ||
        hasNote(selected, 3, 3) ||
        hasNote(selected, 2, 2) ||
        hasNote(selected, 5, 4)) &&
      (hasNote(selected, 7, 5) ||
        hasNote(selected, 6, 5) ||
        hasNote(selected, 8, 5)),
    nameChord: () => null,
  },
  major: {
    semitonesFromRoot: 11,
    isAvailable: (selected) =>
      (hasNote(selected, 3, 3) && !hasNote(selected, 6, 5)) ||
      (hasNote(selected, 4, 3) && !hasNote(selected, 6, 5)) ||
      hasNote(selected, 2, 2) ||
      hasNote(selected, 5, 4),
    nameChord: (selected) => {
      if (hasNote(selected, 8, 5)) return "+<sup>M7</sup>";
      //else if (hasNote(selected, 4, 3) && hasNote(selected, 6, 5)) return "M7♭5";
      else if (hasNote(selected, 4, 3)) return "M7";
      else if (hasNote(selected, 5, 4)) return "M7sus4";
      else if (hasNote(selected, 2, 2)) return "M7sus2";
      else if (hasNote(selected, 3, 3)) return "m<sup>M7</sup>";
    },
  },
  minor: {
    semitonesFromRoot: 10,
    isAvailable: (selected) =>
      hasNote(selected, 3, 3) ||
      hasNote(selected, 4, 3) ||
      hasNote(selected, 2, 2) ||
      hasNote(selected, 5, 4),

    nameChord: (selected) => {
      if (hasNote(selected, 8, 5)) return "+7";
      else if (hasNote(selected, 3, 3) && hasNote(selected, 6, 5))
        return "<sup>ø</sup>7";
      else if (hasNote(selected, 4, 3) && hasNote(selected, 6, 5)) return "7♭5";
      else if (hasNote(selected, 4, 3)) return "7";
      else if (hasNote(selected, 3, 3)) return "m7";
      else if (hasNote(selected, 5, 4)) return "7sus4";
      else if (hasNote(selected, 2, 2)) return "7sus2";
    },
  },
  diminished: {
    semitonesFromRoot: 9,
    isAvailable: (selected) =>
      hasNote(selected, 3, 3) && hasNote(selected, 6, 5),
    nameChord: (selected) => {
      return "<sup>o</sup>7";
    },
  },
};

export default seventhList;
