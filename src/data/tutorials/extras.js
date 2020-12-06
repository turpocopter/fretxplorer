import { NOTE_NAMES, getNoteName as gnn } from "utility/common";
import { computeDisplayName } from "utility/intervals";

export const extrasTutorial = ({
	noteNaming,
	leftHanded,
	rootNote,
	useFlats,
	selected,
	scaleName,
	scaleInfo,
	tuning,
	modeIndex,
	parallelModes,
	tutorialName,
	tutorialStep,
}) => {
	const getNoteName = (index, useFlats = false) =>
		gnn(noteNaming, index, useFlats);
	const tuningDisplay = tuning
		.map((el) => getNoteName(el.note))
		.join(noteNaming === "letters" ? "" : " ");
	const getRelativeModesBlurb = () => {
		let blurb = `Relative modes contain the same notes as the original scale, but start from another note. <br>`;
		if (window.innerWidth < 590) return blurb;
		const rootName = getNoteName(rootNote, useFlats);
		if (modeIndex > 0) {
			const relMode = scaleInfo.modes[modeIndex];
			const altName = relMode.hasOwnProperty("listName")
				? relMode.listName
				: null;
			let modeCount = modeIndex + 1;
			modeCount += modeCount === 2 ? "nd" : modeCount === 3 ? "rd" : "th";
			const relRoot = selected[selected.length - modeIndex];
			const relRootName =
				NOTE_NAMES[noteNaming][relRoot.displayName.id] +
				relRoot.displayName.alt;
			return (
				blurb +
				`Actually, the <strong>${rootName} ${scaleName}</strong>${
					altName !== null ? ` (or ${rootName} ${altName})` : ""
				} scale you picked is also known as the ${modeCount} mode of the <strong>${relRootName} ${
					scaleInfo.modes[0].shortName || scaleInfo.modes[0].fullName
				}</strong>${
					scaleInfo.modes[0].hasOwnProperty("listName")
						? ` (or ${relRootName} ${scaleInfo.modes[0].listName})`
						: ""
				} scale: it contains the same notes but starts from the ${modeCount} note ${rootName}.`
			);
		}
		return (
			blurb +
			`For instance <strong>${
				NOTE_NAMES[noteNaming][selected[2].displayName.id]
			}${selected[2].displayName.alt} ${
				scaleInfo.modes[2].shortName || scaleInfo.modes[2].fullName
			}</strong> is the third mode of your <strong>${rootName} ${scaleName}</strong>${
				scaleName === "Major" ? ` (or ${rootName} Ionian)` : ""
			} scale: it contains the same notes but starts from the third note <strong>${
				NOTE_NAMES[noteNaming][selected[2].displayName.id]
			}${selected[2].displayName.alt}</strong>.`
		);
	};
	const getParallelModesBlurb = () => {
		let blurb = `Parallel modes start from the same root note and contain the same successive intervals as the original scale, but start from another interval. <br>`;
		const rootName = getNoteName(rootNote, useFlats);
		if (window.innerWidth < 590) return blurb;
		if (modeIndex > 0) {
			const relMode = scaleInfo.modes[modeIndex];
			const altName = relMode.hasOwnProperty("listName")
				? relMode.listName
				: null;
			let modeCount = modeIndex + 1;
			modeCount += modeCount === 2 ? "nd" : modeCount === 3 ? "rd" : "th";
			const nbSt = selected[1].semitonesFromRoot;
			const dn1 = computeDisplayName(
				rootNote,
				useFlats,
				scaleInfo.modes[0].hasOwnProperty("displayIntervals")
					? Number(
							("" + scaleInfo.modes[0].displayIntervals[modeIndex]).match(
								/\d+/
							)[0]
					  )
					: modeIndex + 1,
				scaleInfo.semitonesFromRoot[modeIndex]
			);
			const dn2 = computeDisplayName(
				rootNote,
				useFlats,
				scaleInfo.modes[0].hasOwnProperty("displayIntervals")
					? Number(
							(
								"" +
								scaleInfo.modes[0].displayIntervals[
									(modeIndex + 1) % selected.length
								]
							).match(/\d+/)[0]
					  )
					: modeIndex + 2,
				scaleInfo.semitonesFromRoot[(modeIndex + 1) % selected.length]
			);
			return (
				blurb +
				`Actually, the <strong>${rootName} ${scaleName}</strong>${
					altName !== null ? ` (or ${rootName} ${altName})` : ""
				} scale you picked is also known as the ${modeCount} parallel mode of the <strong>${rootName} ${
					scaleInfo.modes[0].shortName || scaleInfo.modes[0].fullName
				}</strong>${
					scaleInfo.modes[0].hasOwnProperty("listName")
						? ` (or ${rootName} ${scaleInfo.modes[0].listName})`
						: ""
				} scale. So, for example, the interval between ${rootName} and ${
					NOTE_NAMES[noteNaming][selected[1].displayName.id]
				}${
					selected[1].displayName.alt
				} (the first two notes of ${rootName} ${scaleName}) and the interval between ${
					NOTE_NAMES[noteNaming][dn1.id]
				}${dn1.alt} and ${NOTE_NAMES[noteNaming][dn2.id]}${dn2.alt} (the ${
					modeIndex + 1
				}th and ${
					modeIndex + 1 === selected.length ? "1st" : `${modeIndex + 2}th`
				} notes of ${rootName} ${
					scaleInfo.modes[0].shortName || scaleInfo.modes[0].fullName
				}) are the same: ${nbSt} semitone${nbSt > 1 ? "s" : ""}.`
			);
		}
		const nbSt = selected[3].semitonesFromRoot - selected[2].semitonesFromRoot;
		const dn2 = computeDisplayName(
			rootNote,
			useFlats,
			scaleInfo.modes[2].hasOwnProperty("displayIntervals")
				? Number(("" + scaleInfo.modes[2].displayIntervals[1]).match(/\d+/)[0])
				: 2,
			nbSt
		);
		return (
			blurb +
			`For instance <strong>${rootName} ${
				scaleInfo.modes[2].shortName || scaleInfo.modes[2].fullName
			}</strong> is the third parallel mode of your <strong>${rootName} ${scaleName}</strong>${
				scaleName === "Major" ? ` (or ${rootName} Ionian)` : ""
			} scale. So, for example, the interval between ${rootName} and ${
				NOTE_NAMES[noteNaming][dn2.id]
			}${dn2.alt} (the first two notes of ${rootName} ${
				scaleInfo.modes[2].shortName || scaleInfo.modes[2].fullName
			}) and the interval between ${
				NOTE_NAMES[noteNaming][selected[2].displayName.id]
			}${selected[2].displayName.alt} and ${
				NOTE_NAMES[noteNaming][selected[3].displayName.id]
			}${
				selected[3].displayName.alt
			} (the 3rd and 4th notes of ${rootName} ${scaleName}) are the same: ${nbSt} semitone${
				nbSt > 1 ? "s" : ""
			}.`
		);
	};

	return {
		weirdAlteration: {
			condition: () => {
				if (tutorialName === "chords" && tutorialStep < 6) return false;
				if (tutorialName === "scales" && tutorialStep < 5) return false;
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
				let noteDegree = ("" + noteFunction).match(/\d+/)[0];
				noteDegree =
					noteDegree === "2"
						? "2nd"
						: noteDegree === "3"
						? "3rd"
						: noteDegree + "th";
				const unalteredNote = noteName.match(/[A-Za-z]+/)[0];
				return `${noteName} is correct! It is the ${noteDegree} degree of your ${
					tutorialName === "scales" ? "scale" : "chord"
				}, therefore it is supposed to be ${
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
		navigateScaleModes: {
			condition: () =>
				tutorialName === "scales" &&
				tutorialStep >= 5 &&
				document.querySelector(".modeSelector") !== null,
			main: () => `There are <strong>modes</strong> available for this scale!`,
			small: () =>
				parallelModes ? getParallelModesBlurb() : getRelativeModesBlurb(),
			selector: () => ".modeSelector .MuiInputBase-root",
			boxSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth ? "screencenter" : "left",
				},
			},
		},
		parallelVsRelativeModes: {
			condition: () =>
				tutorialName === "scales" &&
				tutorialStep >= 5 &&
				document.querySelector(".modeSwitch") !== null,
			main: () =>
				`You can switch from <strong>${
					parallelModes ? "parallel" : "relative"
				}</strong> to <strong>${
					parallelModes ? "relative" : "parallel"
				}</strong> modes!`,
			small: () =>
				parallelModes ? getRelativeModesBlurb() : getParallelModesBlurb(),
			selector: () => ".modeSwitch .flatSwitch",
			boxSettings: {
				x: {
					side:
						window.innerHeight > window.innerWidth ? "screencenter" : "left",
				},
			},
		},
		shouldOpenTunerChords: {
			condition: () => {
				if (tutorialName !== "chords" || tutorialStep < 7) return false;
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
			boxSettings: {
				x: { side: "screencenter" },
			},
			tipSettings: {
				y: { side: "top", offset: 17 },
			},
			autoDiscard: true,
			blockNext: () => true,
		},
		shouldOpenTunerScales: {
			condition: () => {
				if (tutorialName !== "scales" || tutorialStep < 6) return false;
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
			boxSettings: {
				x: { side: "screencenter" },
			},
			tipSettings: {
				y: { side: "top", offset: 17 },
			},
			autoDiscard: true,
			blockNext: () => true,
		},
	};
};
