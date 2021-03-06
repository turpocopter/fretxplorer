import * as actionTypes from "./actionTypes";

export const updateRoot = (rootNote) => {
  return {
    type: actionTypes.UPDATE_ROOT,
    rootNote,
  };
};

export const toggleFlats = () => {
  return {
    type: actionTypes.TOGGLE_FLATS,
  };
};

export const updateQuality = (notes) => {
  return {
    type: actionTypes.UPDATE_QUALITY,
    notes,
  };
};

export const updateSeventh = (semitonesFromRoot) => {
  return {
    type: actionTypes.UPDATE_SEVENTH,
    semitonesFromRoot,
  };
};

export const updateExtension = (notes) => {
  return {
    type: actionTypes.UPDATE_EXTENSION,
    notes,
  };
};

export const updateChordName = (name) => {
  return {
    type: actionTypes.UPDATE_CHORD_NAME,
    name,
  };
};

/*export const updateScaleName = (name) => {
  return {
    type: actionTypes.UPDATE_SCALE_NAME,
    name,
  };
};*/

export const updateScaleInfo = (scaleName, scaleInfo) => {
  return {
    type: actionTypes.UPDATE_SCALE_INFO,
    scaleName,
    scaleInfo,
  };
};

export const updateScaleNotes = (
  semitonesFromRoot,
  displayIntervals = null
) => {
  return {
    type: actionTypes.UPDATE_SCALE_NOTES,
    semitonesFromRoot,
    displayIntervals,
  };
};

export const updateMode = (modeIndex, keepRoot = false) => {
  return {
    type: actionTypes.UPDATE_MODE,
    modeIndex,
    keepRoot,
  };
};

export const reinitSelection = () => {
  return {
    type: actionTypes.REINIT_SELECTION,
  };
};
