import { INTERVALS } from "./common";

/**
 * Tells if note is natural
 * @param {int} index index of note (between 0 for C and 11 for B)
 * @returns {boolean}
 */
const isNatural = (index) => INTERVALS[index] !== null;

/**
 * Computes info used for the name that will be displayed for a note
 * @param {int} rootNoteIndex which is the root note of the chord, expressed as a number between 0 and 11 (0 is C, 11 is B)
 * @param {boolean} useFlats if root note is not natural, whether name should contain a flat or a sharp
 * @param {int} degree which degree of the chord our goal note represents
 * @param {int} semitonesFromRoot how many semytones apart from root note it is
 * @returns {object} with id property for the name of the note (0 for C, 1 for D... 6 for B) and alt property ('','♭','#','♭♭' or '##')
 */
export const computeDisplayName = (
  rootNoteIndex,
  useFlats,
  degree,
  semitonesFromRoot
) => {
  // index of destination note
  const noteIndex = (rootNoteIndex + semitonesFromRoot) % 12;
  // index of root note without alteration
  const naturalRootNoteIndex = isNatural(rootNoteIndex)
    ? rootNoteIndex
    : rootNoteIndex + (useFlats ? 1 : -1);
  let noteName;
  let semitonesDelta;
  // if no formal degree is wanted - pick the closest natural
  if (degree === "N") {
    if (isNatural(noteIndex)) {
      noteName = (INTERVALS[noteIndex] - 1) % 7;
      semitonesDelta = 0;
    } else {
      noteName = useFlats
        ? (INTERVALS[noteIndex + 1] - 1) % 7
        : (INTERVALS[noteIndex - 1] - 1) % 7;
      semitonesDelta = useFlats ? -1 : 1;
    }
  }
  // normal case
  else {
    // "name" of destination note (between 0 for C and 6 for B)
    noteName = (INTERVALS[naturalRootNoteIndex] + degree - 2) % 7;
    // index of destination note without alteration
    const naturalNoteIndex = INTERVALS.indexOf(noteName + 1);
    // which alteration should be displayed?
    semitonesDelta = noteIndex - naturalNoteIndex;
  }

  if (semitonesDelta > 2) semitonesDelta -= 12;
  else if (semitonesDelta < -2) semitonesDelta += 12;
  let alteration = "";
  switch (semitonesDelta) {
    case 2:
      alteration = "𝄪";
      break;
    case 1:
      alteration = "♯";
      break;
    case -1:
      alteration = "♭";
      break;
    case -2:
      alteration = "𝄫";
      break;
    default:
  }
  return { id: noteName, alt: alteration };
};

/**
 * Computes interval that will be displayed for a note
 * @param {int} degree which degree of the chord our goal note represents
 * @param {int} semitonesFromRoot how many semytones apart from root note it is
 * @returns {string} interval to display
 */

export const computeDisplayInterval = (degree, semitonesFromRoot) => {
  const semitonesDelta =
    semitonesFromRoot - INTERVALS.indexOf(degree > 7 ? degree - 7 : degree);
  let alteration = "";
  switch (semitonesDelta) {
    case 2:
      alteration = "𝄪";
      break;
    case 1:
      alteration = "♯";
      break;
    case -1:
      alteration = "♭";
      break;
    case -2:
      alteration = "𝄫";
      break;
    default:
  }
  return alteration + degree;
};

/**
 * Finds if a note exists in an array of note objects (each having semitonesFromRoot and degree properties)
 * @param {*} notes
 * @param {*} semitonesFromRoot
 * @param {*} degree
 * @returns {boolean}
 */

export const hasNote = (notes, semitonesFromRoot, degree) => {
  return (
    notes.findIndex(
      (el) => el.semitonesFromRoot === semitonesFromRoot && el.degree === degree
    ) !== -1
  );
};
