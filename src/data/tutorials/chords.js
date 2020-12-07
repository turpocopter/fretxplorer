import { getNoteName as gnn } from "utility/common";

export const chordsTutorial = ({
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
			main: () => "First, pick the <strong>root note</strong> of your chord.",
			small: () =>
				`It is the fundamental note on top of which your chord is built, and after which your chord is named. For instance, the chord <strong>${getNoteName(
					0
				)}7</strong> has the root note <strong>${getNoteName(0)}</strong>.`,
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
				`Would you like to pick a root note with a <strong>${
					useFlats ? "sharp" : "flat"
				}</strong> instead?`,
			small: () =>
				`This will change the name of the altered notes in the root note list. For instance ${
					getNoteName(rootNote) !== getNoteName(rootNote, true)
						? `your root note <strong>${getNoteName(
								rootNote,
								useFlats
						  )}</strong> will become <strong>${getNoteName(
								rootNote,
								!useFlats
						  )}</strong>`
						: `<strong>${getNoteName(
								1,
								useFlats
						  )}</strong> will become <strong>${getNoteName(
								1,
								!useFlats
						  )}</strong>`
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
			main: () => "Now pick the main quality of your chord.",
			small: () =>
				`This will give you the basic 3-note structure of your chord. For instance picking a <strong>minor</strong> triad over your root note <strong>${getNoteName(
					rootNote,
					useFlats
				)}</strong> will give you a <strong>${getNoteName(
					rootNote,
					useFlats
				)}m</strong> (${getNoteName(rootNote, useFlats)} minor) chord.`,
			selector: () => ".qualityForm .MuiInputBase-root",
			boxSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth ? "screencenter" : "left",
				},
			},
			tipSettings: { x: { side: "left", offset: 17 } },
			blockNext: () =>
				!document.querySelector(".qualityForm .MuiInputBase-root > input")
					.value,
		},
		{
			condition: () => rootNote !== "" && selected.length > 1,
			main: () =>
				"Awesome, you just built a functional chord! But <strong>optionally</strong>, you can add more notes!",
			small: () =>
				"Use the last two lists to add a 7th note to your chord, and/or any sort of extension or alteration. Again, this is <strong>totally optional</strong>.",
			selector: () => ".seventhForm .MuiInputBase-root",
			boxSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth ? "screencenter" : "left",
				},
			},
			tipSettings: { x: { side: "left", offset: 17 } },
		},
		{
			condition: () => rootNote !== "" && selected.length > 1,
			main: () => "Happy with your chord?",
			small: () =>
				"<strong>Click to confirm</strong> and view a recap of the notes it contains!",
			selector: () => ".chordPickerForm .submitButton",
			boxSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth ? "screencenter" : "left",
				},
			},
			tipSettings: { x: { side: "left", offset: 17 } },
			blockNext: () => true,
			autoDiscard: true,
			autoJumpAction: "click", // signifie que si on clic sur $(selector) depuis une étape précédente, on est direct propulsé à la suivante
		},
		{
			condition: () => chordName !== null,
			main: () => "These are the notes in your chord.",
			small: () =>
				"Both their names and their functions in the chord. Click play to hear them!",
			selector: () => ".scaleInfo .notes",
			tipSettings: { y: { side: "top", offset: 37 } },
			hidePrevious: true,
		},
		{
			condition: () => chordName !== null,
			main: () => "Now how do I play this chord?",
			small: () =>
				"Well, it's up to you! <strong>Select each note of the chord at least once</strong> to create a valid chord voicing. In pop music, the root note is often the lowest note played in the chord.",
			selector: () => ".fretboardContainer.hasContent .fretboardInner",
			boxSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth
							? "screencenter"
							: leftHanded
							? "right"
							: "left",
					offset: window.innerHeight > window.innerWidth ? 0 : 18,
				},
			},
			tipSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth
							? "center"
							: leftHanded
							? "right"
							: "left",
					offset: window.innerHeight > window.innerWidth ? 0 : 37,
				},
			},
		},
		{
			condition: () => chordName !== null,
			main: () => "Fancy trying another tuning?",
			small: () =>
				`Your current tuning is ${tuningDisplay}. You can pick another tuning from the preset list, or use the pegs to dial in any tuning you like.`,
			selector: () =>
				window.innerWidth > window.innerHeight
					? ".persistentTuner"
					: ".fretboardContainer.hasContent .fretboardScroller .tuning.active:not(.opening)",
			boxSettings: { x: { side: "screencenter" } },
			tipSettings: {
				y: { side: "top", offset: 17 },
			},
		},
	];
};
