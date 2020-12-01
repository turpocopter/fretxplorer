export const chordsTutorial = [
	{
		main: "First, pick the <strong>root note</strong> of your chord.",
		small:
			"It is the fundamental note on top of which your chord is built, and after which your chord is named. For instance, the chord <strong>C7</strong> has the root note <strong>C</strong>.",
		selector: ".rootForm .MuiInputBase-root",
		position: { x: { side: "left", offset: 17 }, y: { side: "center" } },
		blockNext: () =>
			!document.querySelector(".rootForm .MuiInputBase-root > input").value,
	},
	{
		main:
			"Would you like to pick a root note with a <strong>flat</strong> instead?",
		small:
			"This will change the name of the altered notes in the root note list. For instance <strong>C♯</strong> will become <strong>D♭</strong>.",
		selector: ".flatSwitch",
		position: { x: { side: "center" }, y: { side: "center" } },
	},
	{
		main: "Now pick the main quality of your chord.",
		small:
			"This will give you the basic 3-note structure of your chord. For instance picking a <strong>minor</strong> triad over the root note <strong>C</strong> will give you a <strong>Cm</strong> (C minor) chord.",
		selector: ".qualityForm .MuiInputBase-root",
		position: { x: { side: "left", offset: 17 }, y: { side: "center" } },
		blockNext: () =>
			!document.querySelector(".qualityForm .MuiInputBase-root > input").value,
	},
	{
		main:
			"Awesome, you just built a functional chord! But <strong>optionally</strong>, you can add more notes!",
		small:
			"Use the last two lists to add a 7th note to your chord, or any sort of extension or alteration. Again, this is <strong>totally optional</strong>.",
		selector: ".seventhForm .MuiInputBase-root",
		position: { x: { side: "left", offset: 17 }, y: { side: "center" } },
	},
	{
		main: "Happy with your chord?",
		small:
			"<strong>Click to confirm</strong> and view a recap of the notes it contains!",
		selector: ".chordPickerForm .submitButton",
		position: { x: { side: "left", offset: 17 }, y: { side: "center" } },
		blockNext: () => true,
	},
];
