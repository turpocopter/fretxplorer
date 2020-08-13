import * as actionTypes from "store/actions/actionTypes";

const defaultTuning = [
  { stringId: 6, note: 4, octave: 2, reference: 40 },
  { stringId: 5, note: 9, octave: 2, reference: 45 },
  { stringId: 4, note: 2, octave: 3, reference: 50 },
  { stringId: 3, note: 7, octave: 3, reference: 55 },
  { stringId: 2, note: 11, octave: 3, reference: 59 },
  { stringId: 1, note: 4, octave: 4, reference: 64 },
];

const initialState = {
  noteNaming: "letters", // could also be latin, maybe latin_fr later...
  leftHanded: false,
  showIntervals: false, // show intervals instead of note names
  tuning: [...defaultTuning],
  parallelModes: false, // modes have common root instead of common notes
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_NAMING_CONVENTION:
      localStorage.setItem("fretxplorerNoteNaming", action.convention);
      return { ...state, noteNaming: action.convention };
    case actionTypes.TOGGLE_HANDS:
      localStorage.setItem("fretxplorerLeftHanded", !state.leftHanded);
      return { ...state, leftHanded: !state.leftHanded };
    case actionTypes.TOGGLE_NOTES_INTERVALS:
      return { ...state, showIntervals: !state.showIntervals };
    case actionTypes.TUNE_UP_STRING:
      const newTuningUp = state.tuning.map((el) =>
        el.stringId === action.stringId
          ? {
              ...el,
              note: (el.note + 1) % 12,
              octave: el.note === 11 ? el.octave + 1 : el.octave,
            }
          : { ...el }
      );
      localStorage.setItem("fretxplorerTuning", JSON.stringify(newTuningUp));
      return { ...state, tuning: newTuningUp };
    case actionTypes.TUNE_DOWN_STRING:
      const newTuningDown = state.tuning.map((el) =>
        el.stringId === action.stringId
          ? {
              ...el,
              note: el.note === 0 ? 11 : el.note - 1,
              octave: el.note === 0 ? el.octave - 1 : el.octave,
            }
          : { ...el }
      );
      localStorage.setItem("fretxplorerTuning", JSON.stringify(newTuningDown));
      return { ...state, tuning: newTuningDown };
    case actionTypes.TUNE_UP_ALL:
      const newTuningUpAll = state.tuning.map((s) => ({
        ...s,
        note: s.note === 11 ? 0 : s.note + 1,
        octave: s.note === 11 ? s.octave + 1 : s.octave,
      }));
      localStorage.setItem("fretxplorerTuning", JSON.stringify(newTuningUpAll));
      return {
        ...state,
        tuning: newTuningUpAll,
      };
    case actionTypes.TUNE_DOWN_ALL:
      const newTuningDownAll = state.tuning.map((s) => ({
        ...s,
        note: s.note === 0 ? 11 : s.note - 1,
        octave: s.note === 0 ? s.octave - 1 : s.octave,
      }));
      localStorage.setItem(
        "fretxplorerTuning",
        JSON.stringify(newTuningDownAll)
      );
      return {
        ...state,
        tuning: newTuningDownAll,
      };
    case actionTypes.SET_TUNING_PRESET:
      const newTuningPreset = state.tuning.map((el) => {
        const newStringPreset = action.tuning.find(
          (s) => s.stringId === el.stringId
        );
        return {
          ...el,
          note: newStringPreset.note,
          octave: newStringPreset.octave,
        };
      });
      localStorage.setItem(
        "fretxplorerTuning",
        JSON.stringify(newTuningPreset)
      );
      return { ...state, tuning: newTuningPreset };
    case actionTypes.TOGGLE_PARALLEL_MODES:
      return {
        ...state,
        parallelModes: !state.parallelModes,
      };
    case actionTypes.CHECK_LOCAL_SETTINGS:
      const localNoteNaming = localStorage.getItem("fretxplorerNoteNaming");
      const localLeftHanded = localStorage.getItem("fretxplorerLeftHanded");
      const localTuning = localStorage.getItem("fretxplorerTuning");
      return {
        ...state,
        noteNaming: localNoteNaming || state.noteNaming,
        leftHanded:
          localLeftHanded !== null
            ? JSON.parse(localLeftHanded)
            : state.leftHanded,
        tuning: localTuning ? JSON.parse(localTuning) : state.tuning,
      };
    default:
      return state;
  }
};

export default settingsReducer;
