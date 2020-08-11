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

export const updateScaleName = (name, selected) => {
  return {
    type: actionTypes.UPDATE_SCALE_NAME,
    name,
    selected,
  };
};

export const reinitSelection = () => {
  return {
    type: actionTypes.REINIT_SELECTION,
  };
};
