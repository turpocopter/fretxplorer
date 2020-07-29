import { INTERVALS } from "../utility/common";

export default (namingConvention = "letters") => {
  const NOTE_NAMES = {
    letters: ["C", "D", "E", "F", "G", "A", "B"],
    latin: ["Do", "Re", "Mi", "Fa", "Sol", "La", "Ti"],
    latin_fr: ["Do", "Ré", "Mi", "Fa", "Sol", "La", "Si"],
  };

  /**
   * Names one note
   * @param {int} index index of note (between 0 for C and 11 for B)
   * @param {boolean} useFlats if note isn't natural, whether to use a flat or a sharp
   * @param {string} noteNaming which naming convention (letters, latin...)
   * @returns {string} name of the note
   */
  const getNoteName = (index, useFlats = false) => {
    return INTERVALS[index]
      ? NOTE_NAMES[namingConvention][INTERVALS[index] - 1]
      : useFlats
      ? `${NOTE_NAMES[namingConvention][INTERVALS[index + 1] - 1]}♭`
      : `${NOTE_NAMES[namingConvention][INTERVALS[index - 1] - 1]}#`;
  };

  /**
   * Names all twelve notes
   * @param {boolean} useFlats if note isn't natural, whether to use a flat or a sharp
   * @returns {array} name of all notes starting with C
   */
  const getNoteNames = (useFlats = false) =>
    INTERVALS.map((v, k) => {
      return v
        ? NOTE_NAMES[namingConvention][v - 1]
        : useFlats
        ? `${NOTE_NAMES[namingConvention][INTERVALS[k + 1] - 1]}♭`
        : `${NOTE_NAMES[namingConvention][INTERVALS[k - 1] - 1]}#`;
    });

  /**
   * Translates a note object
   * @param {object} note object with an id property (which note btw 0 for C and 6 for B) and an alt property ('','♭','#','♭♭' or '##')
   */
  const translateNote = (note) =>
    NOTE_NAMES[namingConvention][note.id] + note.alt;

  return { getNoteName, getNoteNames, translateNote };
};
