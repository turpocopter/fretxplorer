import { getNoteName as gnn } from "utility/common";

export const extrasTutorial = ({
	noteNaming,
	leftHanded,
	rootNote,
	useFlats,
	selected,
	tuning,
	tutorialName,
	tutorialStep,
}) => {
	const getNoteName = (index, useFlats = false) =>
		gnn(noteNaming, index, useFlats);
	const tuningDisplay = tuning
		.map((el) => getNoteName(el.note))
		.join(noteNaming === "letters" ? "" : " ");
	return {
		weirdAlteration: {
			condition: () => {
				if (tutorialName === "chords" && tutorialStep < 6) return false;
				if (document.querySelector(".notes") === null) return false;
				for (const el of document.querySelectorAll(".notes .noteName")) {
					if (el.innerText.includes("𝄫") || el.innerText.includes("𝄪"))
						return true;
				}
				return false;
			},
			main: () => {
				const index = [
					...document.querySelectorAll(".notes .noteName"),
				].findIndex(
					(el) => el.innerText.includes("𝄫") || el.innerText.includes("𝄪")
				);
				return `Wait... ${
					document.querySelectorAll(".notes .noteName")[index].innerText
				}, really?<br>Shouldn't that be a ${getNoteName(
					(rootNote + selected[index].semitonesFromRoot) % 12,
					useFlats
				)}?`;
			},

			small: () => {
				const alterationName = (alteration) =>
					alteration === "𝄫" ? "double flat" : "double sharp";
				const correctNote = [
					...document.querySelectorAll(".notes .noteName"),
				].find((el) => el.innerText.includes("𝄫") || el.innerText.includes("𝄪"))
					.parentNode;
				const noteName = correctNote.children[0].innerText;
				const noteFunction = correctNote.children[1].innerText;
				const noteAlteration = noteName.match(/[^A-Za-z]+/)[0];
				const otherAlteration = noteAlteration === "𝄫" ? "𝄪" : "𝄫";
				let noteDegree = noteFunction.match(/\d+/)[0];
				noteDegree =
					noteDegree === "2"
						? "2nd"
						: noteDegree === "3"
						? "3rd"
						: noteDegree + "th";
				const unalteredNote = noteName.match(/[A-Za-z]+/)[0];
				return `${noteName} is correct! It is the ${noteDegree} degree of your chord, therefore it is supposed to be ${
					unalteredNote === "A" || unalteredNote === "E" ? `an` : `a`
				} ${unalteredNote}
				(the ${noteDegree} note starting from ${
					getNoteName(rootNote, useFlats).match(/[A-Za-z]+/)[0]
				}), even if that means it has a uncommon alteration like ${noteAlteration} (${alterationName(
					noteAlteration
				)}).<br>
				In other cases you might encounter the ${otherAlteration} alteration (${alterationName(
					otherAlteration
				)}).`;
			},
			selector: () => {
				const index = [
					...document.querySelectorAll(".notes .noteName"),
				].findIndex(
					(el) => el.innerText.includes("𝄫") || el.innerText.includes("𝄪")
				);
				return `.notes .note:nth-child(${index + 1})`;
			},
		},
		/*navigateScaleModes: {
			condition: () => false,
			main: () => ``
		},*/
		shouldOpenTuner: {
			condition: () => {
				if (tutorialName === "chords" && tutorialStep < 7) return false;
				const settingsElt = document.querySelector(
					".fretboardWrapper .tuning .settings"
				);
				if (settingsElt === null) return false;
				if (settingsElt.clientHeight === 0 || settingsElt.clientWidth === 0)
					return false;
				return true;
			},
			main: () => `Your current tuning is ${tuningDisplay}.`,
			small: () => `Click on the cog to open the tuner!`,
			selector: () => ".fretboardWrapper .tuning .settings",
			autoDiscard: true,
			blockNext: () => true,
		},
	};
};
