import * as actionTypes from "store/actions/actionTypes";
import {
	computeDisplayName,
	computeDisplayInterval,
	computeModeSemitones,
} from "utility/intervals";
import { addOmittables } from "data/chords/omittables";

const initialState = {
	rootNote: "",
	useFlats: false,
	selected: [],
	chordName: null,
	scaleName: null,
	scaleInfo: null,
	modeIndex: 0,
};

/**
 * Updates the array of selected notes passed in param with name display info
 * @param {int} rootNote between 0 (C) and 11 (B)
 * @param {boolean} useFlats
 * @param {array} selected selected notes
 * @param {boolean} force whether existing display infos should be refreshed or not (can be set to false when only a new element has just been added to selected, must be kept to true when rootNote or useFlats has just changed)
 * @param {boolean} forceRoot when root already has a display name, whether it should be kept or not
 * return array of selected notes with extra name display info
 */
const updateDisplayNames = (
	rootNote,
	useFlats,
	selected,
	force = true,
	forceRoot = true
) => {
	const selectedWithNames = [];
	selected.forEach(function (value, index) {
		selectedWithNames[index] = { ...value };
		if (force || !value.hasOwnProperty("displayName")) {
			selectedWithNames[index].displayName = computeDisplayName(
				rootNote,
				useFlats,
				value.degree,
				value.semitonesFromRoot,
				forceRoot && selected[0].hasOwnProperty("displayName")
					? selected[0].displayName.id
					: null
			);
		}
	});
	return selectedWithNames;
};

/**
 * Updates the array of selected notes passed in param with interval display info
 * @param {array} selected selected notes
 * @param {boolean} force whether existing display infos should be refreshed or not (can be set to false when only a new element has just been added to selected, must be kept to true when rootNote or useFlats has just changed)
 * return array of selected notes with extra interval display info
 */
const updateDisplayIntervals = (selected, force = true) => {
	const selectedWithIntervals = [];
	selected.forEach(function (value, index) {
		selectedWithIntervals[index] = { ...value };
		if (force || !value.hasOwnProperty("displayInterval")) {
			selectedWithIntervals[index].displayInterval = computeDisplayInterval(
				value.degree,
				value.semitonesFromRoot
			);
		}
	});
	return selectedWithIntervals;
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
		[...updateDisplayIntervals([...selected], false)],
		false
	);
};

/**
 * /**
 * Builds a new value for the selected property from a list of semitone intervals and (optionnaly) a list of display intervals
 * @param {int} rootNote between 0 (C) and 11 (B)
 * @param {boolean} useFlats
 * @param {array} semitonesFromRoot list of semitone intervals
 * @param {array} displayIntervals info for interval display (optional)
 * return array of selected notes with extra interval display info
 */
const rebuildSelected = (
	rootNote,
	useFlats,
	semitonesFromRoot,
	displayIntervals = null,
	forcedRootDisplayName = null
) => {
	let updatedSelected;
	// if displayIntervals is an array: intervals can be mapped to semitones
	if (displayIntervals !== null) {
		updatedSelected = semitonesFromRoot.map((el, i) => ({
			semitonesFromRoot: el,
			degree:
				displayIntervals[i] === "R"
					? 1
					: parseInt(displayIntervals[i].toString().replace(/\D/g, "")),
			displayInterval: displayIntervals[i],
		}));
	}
	// otherwise we just map degrees to semitones, and the intervals will be calculated by updateDisplaysOnAdd
	else {
		updatedSelected = semitonesFromRoot.map((el, i) => ({
			semitonesFromRoot: el,
			degree: i + 1,
		}));
	}
	if (forcedRootDisplayName !== null)
		updatedSelected[0].displayName = forcedRootDisplayName;
	return updateDisplaysOnAdd(rootNote, useFlats, [...updatedSelected]);
};

const chordPickerReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_ROOT:
			const newSelected = updateDisplayNames(
				action.rootNote,
				state.useFlats,
				state.selected.length > 0
					? [...state.selected]
					: [
							{
								semitonesFromRoot: 0,
								degree: 1,
								displayInterval: "R",
							},
					  ],
				true,
				false
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
					[...state.selected],
					true,
					false
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
			return {
				...state,
				chordName: action.name,
				selected: addOmittables(state.selected),
			};

		/*case actionTypes.UPDATE_SCALE_NAME:
      return { ...state, chordName: "", scaleName: action.name };
    */

		case actionTypes.UPDATE_SCALE_INFO:
			const isAlreadyMode = action.scaleInfo.hasOwnProperty("relatedTo");
			return {
				...state,
				chordName: null,
				scaleName: action.scaleName,
				scaleInfo: isAlreadyMode
					? action.scaleInfo.relatedTo.scaleInfo
					: action.scaleInfo,
				modeIndex: isAlreadyMode ? action.scaleInfo.relatedTo.mode : 0,
			};

		case actionTypes.UPDATE_SCALE_NOTES:
			return {
				...state,
				scaleName: null,
				selected: rebuildSelected(
					state.rootNote,
					state.useFlats,
					action.semitonesFromRoot,
					action.displayIntervals
				),
				scaleInfo: null,
				modeIndex: 0,
				chordName: null,
			};

		case actionTypes.UPDATE_MODE:
			const newRoot = action.keepRoot
				? state.rootNote
				: (12 +
						state.rootNote -
						state.scaleInfo.semitonesFromRoot[state.modeIndex] +
						state.scaleInfo.semitonesFromRoot[action.modeIndex]) %
				  12;
			let forceFlats = false;
			let forceSharps = false;
			let newRootDisplayName = null;
			//when using relative modes, check alteration of new tonic to determine if flats or sharps should be forced
			if (!action.keepRoot) {
				newRootDisplayName =
					state.selected[
						(state.selected.length + action.modeIndex - state.modeIndex) %
							state.selected.length
					].displayName;
				forceFlats =
					newRootDisplayName.alt === "♭" || newRootDisplayName.alt === "𝄫";
				forceSharps =
					newRootDisplayName.alt === "♯" || newRootDisplayName.alt === "𝄪";
			}
			// when using parallel modes, if tonic had a simple flat or sharp we keep it (doubles are discarded though)
			else {
				forceFlats = state.selected[0].displayName.alt === "♭";
				forceSharps = state.selected[0].displayName.alt === "#";
			}
			const modeName = state.scaleInfo.modes[action.modeIndex].hasOwnProperty(
				"shortName"
			)
				? state.scaleInfo.modes[action.modeIndex].shortName
				: state.scaleInfo.modes[action.modeIndex].fullName;
			return {
				...state,
				modeIndex: action.modeIndex,
				rootNote: newRoot,
				scaleName: modeName,
				selected: rebuildSelected(
					newRoot,
					forceFlats ? true : forceSharps ? false : state.useFlats,
					computeModeSemitones(
						state.scaleInfo.semitonesFromRoot,
						action.modeIndex
					),
					state.scaleInfo.modes[action.modeIndex].hasOwnProperty(
						"displayIntervals"
					)
						? state.scaleInfo.modes[action.modeIndex].displayIntervals
						: null,
					newRootDisplayName
				),
			};

		case actionTypes.REINIT_SELECTION:
			return {
				...state,
				rootNote: "",
				selected: [],
				chordName: null,
				scaleName: null,
				scaleInfo: null,
				modeIndex: 0,
			};

		default:
			return state;
	}
};

export default chordPickerReducer;
