export const chordsTutorial = [
	{
		main: "First, pick the <strong>root note</strong> of your chord.",
		small:
			"It is the fundamental note on top of which your chord is built, and after which your chord is named. For instance, the chord <strong>C7</strong> has the root note <strong>C</strong>.",
		selector: ".rootForm .MuiInputBase-root",
		tipSettings: {
			x: { side: "left", offset: 17 },
		},
		blockNext: () =>
			!document.querySelector(".rootForm .MuiInputBase-root > input").value,
	},
	{
		main:
			"Would you like to pick a root note with a <strong>flat</strong> instead?",
		small:
			"This will change the name of the altered notes in the root note list. For instance <strong>C♯</strong> will become <strong>D♭</strong>.",
		selector: ".flatSwitch",
	},
	{
		main: "Now pick the main quality of your chord.",
		small:
			"This will give you the basic 3-note structure of your chord. For instance picking a <strong>minor</strong> triad over the root note <strong>C</strong> will give you a <strong>Cm</strong> (C minor) chord.",
		selector: ".qualityForm .MuiInputBase-root",
		tipSettings: { x: { side: "left", offset: 17 } },
		blockNext: () =>
			!document.querySelector(".qualityForm .MuiInputBase-root > input").value,
	},
	{
		main:
			"Awesome, you just built a functional chord! But <strong>optionally</strong>, you can add more notes!",
		small:
			"Use the last two lists to add a 7th note to your chord, or any sort of extension or alteration. Again, this is <strong>totally optional</strong>.",
		selector: ".seventhForm .MuiInputBase-root",
		tipSettings: { x: { side: "left", offset: 17 } },
	},
	{
		main: "Happy with your chord?",
		small:
			"<strong>Click to confirm</strong> and view a recap of the notes it contains!",
		selector: ".chordPickerForm .submitButton",
		tipSettings: { x: { side: "left", offset: 17 } },
		blockNext: () => true,
		autoDiscard: true,
		autoJumpAction: "click", // signifie que si on clic sur $(selector) depuis une étape précédente, on est direct propulsé à la suivante
	},
	{
		main: "These are the notes in your chord.",
		small:
			"Both their name and their function in the chord. Click play to hear them!",
		selector: ".scaleInfo .notes",
		tipSettings: { y: { side: "top", offset: 37 } },
	},
	{
		main: "OK, now how do I play this chord?",
		small:
			"Well, it's up to you! <strong>Select each note of the chord at least once</strong> to create a valid chord voicing. In pop music, the root note is often the lowest note played in the chord.",
		selector: ".fretboardInner", //".StringList",
		boxSettings: { x: { side: "screencenter" } },
	},
];
