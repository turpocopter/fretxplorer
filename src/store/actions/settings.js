import * as actionTypes from "./actionTypes";

export const updateMode = (mode) => {
  return {
    type: actionTypes.UPDATE_MODE,
    mode,
  };
};

export const toggleHands = () => {
  return {
    type: actionTypes.TOGGLE_HANDS,
  };
};

export const toggleNotesIntervals = () => {
  return {
    type: actionTypes.TOGGLE_NOTES_INTERVALS,
  };
};

export const tuneUpString = (stringId) => {
  return {
    type: actionTypes.TUNE_UP_STRING,
    stringId,
  };
};

export const tuneDownString = (stringId) => {
  return {
    type: actionTypes.TUNE_DOWN_STRING,
    stringId,
  };
};

export const tuneUpAll = () => {
  return {
    type: actionTypes.TUNE_UP_ALL,
  };
};

export const tuneDownAll = () => {
  return {
    type: actionTypes.TUNE_DOWN_ALL,
  };
};

export const setTuningPreset = (tuning) => {
  return {
    type: actionTypes.SET_TUNING_PRESET,
    tuning,
  };
};
