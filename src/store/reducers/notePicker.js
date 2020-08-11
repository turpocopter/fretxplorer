import * as actionTypes from "store/actions/actionTypes";
import { computeDisplayName, computeDisplayInterval } from "utility/intervals";

const initialState = {
  rootNote: "",
  useFlats: false,
  selected: [],
  chordName: "",
  scaleName: "",
  modeName: "",
};

/**
 * Updates the array of selected notes passed in param with name display info
 * @param {int} rootNote between 0 (C) and 11 (B)
 * @param {boolean} useFlats
 * @param {array} selected selected notes
 * @param {boolean} force whether existing display infos should be refreshed or not (can be set to false when only a new element has just been added to selected, must be kept to true when rootNote or useFlats has just changed)
 * return array of selected notes with extra name display info
 */
const updateDisplayNames = (rootNote, useFlats, selected, force = true) => {
  selected.forEach(function (value, index) {
    if (force || !value.hasOwnProperty("displayName")) {
      selected[index].displayName = computeDisplayName(
        rootNote,
        useFlats,
        value.degree,
        value.semitonesFromRoot
      );
    }
  });
  return selected;
};

/**
 * Updates the array of selected notes passed in param with interval display info
 * @param {array} selected selected notes
 * @param {boolean} force whether existing display infos should be refreshed or not (can be set to false when only a new element has just been added to selected, must be kept to true when rootNote or useFlats has just changed)
 * return array of selected notes with extra interval display info
 */
const updateDisplayIntervals = (selected, force = true) => {
  selected.forEach(function (value, index) {
    if (force || !value.hasOwnProperty("displayInterval")) {
      selected[index].displayInterval = computeDisplayInterval(
        value.degree,
        value.semitonesFromRoot
      );
    }
  });
  return selected;
};

/**
 * Updates missing display info (name & interval) when notes have been added to the selection
 * @param {int} rootNote between 0 (C) and 11 (B)
 * @param {boolean} useFlats
 * @param {array} selected selected notes
 * return array of selected notes with extra interval display info
 */
const updateDisplaysOnAdd = (rootNote, useFlats, selected) => {
  return updateDisplayNames(
    rootNote,
    useFlats,
    updateDisplayIntervals(selected, false),
    false
  );
};

const chordPickerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ROOT:
      const newSelected = updateDisplayNames(
        action.rootNote,
        state.useFlats,
        state.selected.length > 0
          ? state.selected
          : [
              {
                semitonesFromRoot: 0,
                degree: 1,
                displayInterval: "R",
              },
            ]
      );
      return {
        ...state,
        rootNote: action.rootNote,
        selected: newSelected,
      };

    case actionTypes.TOGGLE_FLATS:
      return {
        ...state,
        useFlats: !state.useFlats,
        selected: updateDisplayNames(
          state.rootNote,
          !state.useFlats,
          state.selected
        ),
      };

    case actionTypes.UPDATE_QUALITY:
      const selectedWQ = state.selected
        .filter((el) => el.degree === 1)
        .concat(action.notes.map((note) => ({ ...note })));
      return {
        ...state,
        selected: updateDisplaysOnAdd(
          state.rootNote,
          state.useFlats,
          selectedWQ
        ),
      };

    case actionTypes.UPDATE_SEVENTH:
      let selectedWS = state.selected.filter((el) => el.degree <= 5);
      if (action.semitonesFromRoot)
        selectedWS = selectedWS.concat({
          semitonesFromRoot: action.semitonesFromRoot,
          degree: 7,
        });
      return {
        ...state,
        selected: updateDisplaysOnAdd(
          state.rootNote,
          state.useFlats,
          selectedWS
        ),
      };

    case actionTypes.UPDATE_EXTENSION:
      const selectedWE = state.selected
        .filter((el) => el.degree === 7 || el.degree <= 5)
        .concat(action.notes.map((note) => ({ ...note })));
      return {
        ...state,
        selected: updateDisplaysOnAdd(
          state.rootNote,
          state.useFlats,
          selectedWE
        ),
      };

    case actionTypes.UPDATE_CHORD_NAME:
      return { ...state, chordName: action.name, scaleName: "", modeName: "" };

    case actionTypes.UPDATE_SCALE_NAME:
      console.log(action.selected);
      console.log(
        updateDisplaysOnAdd(state.rootNote, state.useFlats, action.selected)
      );
      return {
        ...state,
        scaleName: action.name,
        selected: updateDisplaysOnAdd(
          state.rootNote,
          state.useFlats,
          action.selected
        ),
        modeName: "",
        chordName: "",
      };

    case actionTypes.REINIT_SELECTION:
      return {
        ...state,
        chordName: "",
        selected: [],
        rootNote: "",
        scaleName: "",
        modeName: "",
      };

    default:
      return state;
  }
};

export default chordPickerReducer;
