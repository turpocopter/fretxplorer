export const INTERVALS = [1, null, 2, null, 3, 4, null, 5, null, 6, null, 7];

export const NOTE_NAMES = {
	letters: ["C", "D", "E", "F", "G", "A", "B"],
	latin: ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"],
};

/**
 * Names one note
 * @param {int} index index of note (between 0 for C and 11 for B)
 * @param {boolean} useFlats if note isn't natural, whether to use a flat or a sharp
 * @param {string} noteNaming which naming convention (letters, latin...)
 * @returns {string} name of the note
 */
export const getNoteName = (namingConvention, index, useFlats = false) => {
	return INTERVALS[index]
		? NOTE_NAMES[namingConvention][INTERVALS[index] - 1]
		: useFlats
		? `${NOTE_NAMES[namingConvention][INTERVALS[index + 1] - 1]}♭`
		: `${NOTE_NAMES[namingConvention][INTERVALS[index - 1] - 1]}♯`;
};

export const getDeviceType = () => {
	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return "tablet";
	}
	if (
		/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
			ua
		)
	) {
		return "mobile";
	}
	return "desktop";
};
