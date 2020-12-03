import { getNoteName as gnn } from "utility/common";

export const scalesTutorial = ({
	noteNaming,
	leftHanded,
	rootNote,
	useFlats,
	selected,
	tuning,
}) => {
	const getNoteName = (index, useFlats = false) =>
		gnn(noteNaming, index, useFlats);
	const tuningDisplay = tuning
		.map((el) => getNoteName(el.note))
		.join(noteNaming === "letters" ? "" : " ");
	return [
		{
			main: () => "First, pick the <strong>root note</strong> of your scale.",
			small: () =>
				`It is the fundamental note on top of which your scale is built, and after which your scale is named. For instance, the scale <strong>${getNoteName(
					0
				)} pentatonic minor</strong> has the root note <strong>${getNoteName(
					0
				)}</strong>.`,
			selector: () => ".rootForm .MuiInputBase-root",
			tipSettings: {
				x: { side: "left", offset: 17 },
			},
			blockNext: () =>
				!document.querySelector(".rootForm .MuiInputBase-root > input").value,
		},
		{
			main: () =>
				"Would you like to pick a root note with a <strong>flat</strong> instead?",
			small: () =>
				`This will change the name of the altered notes in the root note list. For instance ${
					getNoteName(rootNote) !== getNoteName(rootNote, true)
						? `your root note <strong>${getNoteName(
								rootNote
						  )}</strong> will become <strong>${getNoteName(
								rootNote,
								true
						  )}</strong>`
						: `<strong>${getNoteName(
								1
						  )}</strong> will become <strong>${getNoteName(1, true)}</strong>`
				}.`,
			selector: () => ".flatSwitch",
		},
		{
			main: () => "Now pick ",
			small: () => "Mange bien tes morts",
			selector: () => ".scaleControl .MuiInputBase-root",
		},
	];
};
