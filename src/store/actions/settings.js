import * as actionTypes from "./actionTypes";

export const updateNamingConvention = (convention) => {
	return {
		type: actionTypes.UPDATE_NAMING_CONVENTION,
		convention,
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

export const setTuningPreset = (tuning, id) => {
	return {
		type: actionTypes.SET_TUNING_PRESET,
		tuning,
		id,
	};
};

export const toggleParallelModes = () => {
	return {
		type: actionTypes.TOGGLE_PARALLEL_MODES,
	};
};

export const checkLocalSettings = () => {
	return {
		type: actionTypes.CHECK_LOCAL_SETTINGS,
	};
};

export const incrementTutorialStep = (tutorial) => {
	return {
		type: actionTypes.INCREMENT_TUTORIAL_STEP,
		tutorial,
	};
};

export const decrementTutorialStep = (tutorial) => {
	return {
		type: actionTypes.DECREMENT_TUTORIAL_STEP,
		tutorial,
	};
};

export const jumpToTutorialStep = (tutorial, step) => {
	return {
		type: actionTypes.JUMP_TO_TUTORIAL_STEP,
		tutorial,
		step,
	};
};

export const validateExtraTutorialStep = (name) => {
	return {
		type: actionTypes.VALIDATE_EXTRA_TUTORIAL_STEP,
		name,
	};
};

export const enableTutorials = () => {
	return {
		type: actionTypes.ENABLE_TUTORIALS,
	};
};

export const closeTutorials = () => {
	return {
		type: actionTypes.CLOSE_TUTORIALS,
	};
};

export const disableTutorials = () => {
	return {
		type: actionTypes.DISABLE_TUTORIALS,
	};
};

export const finishTutorial = (tutorial) => {
	return {
		type: actionTypes.FINISH_TUTORIAL,
		tutorial,
	};
};

export const startOverTutorials = () => {
	return {
		type: actionTypes.START_OVER_TUTORIALS,
	};
};
