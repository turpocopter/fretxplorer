import { getNoteName as gnn } from "utility/common";

export const scalesTutorial = ({
	noteNaming,
	leftHanded,
	rootNote,
	useFlats,
	selected,
	chordName,
	scaleName,
	tuning,
}) => {
	const getNoteName = (index, useFlats = false) =>
		gnn(noteNaming, index, useFlats);
	const tuningDisplay = tuning
		.map((el) => getNoteName(el.note))
		.join(noteNaming === "letters" ? "" : " ");
	return [
		{
			condition: () => true,
			main: () => "First, pick the <strong>root note</strong> of your scale.",
			small: () =>
				`It is the fundamental note on top of which your scale is built, and after which your scale is named. For instance, the scale <strong>${getNoteName(
					0
				)} pentatonic minor</strong> has the root note <strong>${getNoteName(
					0
				)}</strong>.`,
			selector: () => ".rootForm .MuiInputBase-root",
			boxSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth ? "screencenter" : "left",
				},
			},
			tipSettings: {
				x: { side: "left", offset: 17 },
			},
			blockNext: () =>
				!document.querySelector(".rootForm .MuiInputBase-root > input").value,
		},
		{
			condition: () => rootNote !== "",
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
			boxSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth ? "screencenter" : "left",
				},
			},
		},
		{
			condition: () => rootNote !== "",
			main: () => "Now pick a type of scale!",
			small: () =>
				`For instance picking a <strong>pentatonic minor</strong> scale type over your root note <strong>${getNoteName(
					rootNote,
					useFlats
				)}</strong> will give you the <strong>${getNoteName(
					rootNote,
					useFlats
				)} pentatonic minor scale</strong>`,
			selector: () => ".scaleControl .MuiInputBase-root",
			boxSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth ? "screencenter" : "left",
				},
			},
			blockNext: () =>
				!document.querySelector(".scaleControl .MuiInputBase-root > input")
					.value,
		},
		{
			condition: () => rootNote !== "" && selected.length > 1,
			main: () => "Happy with your scale?",
			small: () =>
				"<strong>Click to confirm</strong> and view a recap of the notes it contains!",
			selector: () => ".scalePickerForm .submitButton",
			tipSettings: { x: { side: "left", offset: 17 } },
			boxSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth ? "screencenter" : "left",
				},
			},
			blockNext: () => true,
			autoDiscard: true,
			autoJumpAction: "click",
		},
		{
			condition: () => scaleName !== null,
			main: () => "These are the notes in your scale.",
			small: () =>
				"Both their names and their degrees in the scale. Click play to hear them!",
			selector: () => ".scaleInfo .notes",
			tipSettings: { y: { side: "top", offset: 37 } },
			hidePrevious: true,
		},
		{
			condition: () => scaleName !== null,
			main: () => "Now how do I play a run in this scale?",
			small: () =>
				"Well, it's up to you! This diagram shows you every location of the scale's notes on the fretboard. Use it to create your own scale runs!",
			selector: () => ".fretboardContainer.hasContent .fretboardInner",
			boxSettings: { x: { side: "screencenter" } },
		},
		{
			condition: () => scaleName !== null,
			main: () => "Fancy trying another tuning?",
			small: () =>
				`Your current tuning is ${tuningDisplay}. You can pick another tuning from the preset list, or use the pegs to dial in any tuning you like.`,
			selector: () =>
				window.innerWidth > window.innerHeight
					? ".persistentTuner"
					: ".fretboardContainer.hasContent .fretboardScroller .tuning.active:not(.opening)",
			boxSettings: { x: { side: "screencenter" } },
			tipSettings: { y: { side: "top", offset: 17 } },
		},
	];
};
