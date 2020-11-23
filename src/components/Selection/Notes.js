import React, { useState, useEffect } from "react";

import withMidiSounds from "hoc/withMidiSounds";
import useNotes from "hooks/noteNames";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import PropTypes from "prop-types";

let intervalID = null;

export const Notes = ({
	selectionType,
	playNote,
	playChord,
	playScale,
	cancelSound,
	selectedWithValues,
	namingConvention,
}) => {
	const { translateNote } = useNotes(namingConvention);
	const [activeNote, setActiveNote] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		return () => {
			if (intervalID !== null) {
				clearInterval(intervalID);
			}
		};
	}, []);

	useEffect(() => {
		if (cancelSound) cancelSound();
		return () => {
			if (intervalID) clearInterval(intervalID);
			if (cancelSound) cancelSound();
			setActiveNote(null);
			setIsPlaying(false);
		};
	}, [cancelSound, setActiveNote, setIsPlaying, selectedWithValues]);

	const notes = selectedWithValues.map((el, i) => {
		const noteClasses = ["note"];
		if (activeNote === i) noteClasses.push("active");
		return (
			<li
				key={el.displayInterval}
				className={noteClasses.join(" ")}
				onClick={() => onClickNote(el, i)}>
				<div className='noteName'>{translateNote(el.displayName)}</div>
				<div className='interval'>{el.displayInterval}</div>
			</li>
		);
	});
	const midiValues = selectedWithValues.map((el) => el.midiValue);

	const onClickNote = (el, i) => {
		const speed = 1;
		if (!isPlaying && !activeNote) {
			playNote(el.midiValue);
			setActiveNote(i);
			setTimeout(() => {
				setActiveNote(null);
			}, speed * 1000);
		}
	};

	const onSelectionListen = (type = "chord") => {
		const speed = type === "scale" ? 0.7 : 1;
		if (!isPlaying && !activeNote) {
			setIsPlaying(true);
			type === "scale"
				? playScale(midiValues, speed)
				: playChord(midiValues, speed);
			setActiveNote(0);
			let noteCounter = 0;
			intervalID = setInterval(() => {
				noteCounter++;
				setActiveNote(noteCounter);
				if (noteCounter === notes.length - 1) {
					clearInterval(intervalID);
					// Scale : finish by playing first note again one octave higher
					if (type === "scale") {
						setTimeout(() => {
							setActiveNote(0);
						}, speed * 1000);
						setTimeout(() => {
							setActiveNote(null);
							setIsPlaying(false);
						}, speed * 2000);
					}
					// Chord: finish by playing arpeggiated chord
					else {
						setTimeout(() => {
							setActiveNote(null);
						}, speed * 1000);
						setTimeout(() => {
							setIsPlaying(false);
						}, speed * (3000 + 70 * notes.length));
					}
				}
			}, speed * 1000);
		}
	};

	const playChordClasses = ["playChord"];
	if (isPlaying === true) playChordClasses.push("active");
	return (
		<ul data-test='notes' className='notes'>
			{notes}
			<li
				className={playChordClasses.join(" ")}
				onClick={() => onSelectionListen(selectionType)}>
				<PlayArrowIcon fontSize='inherit' />
			</li>
		</ul>
	);
};

Notes.propTypes = {
	// FROM PARENT
	selectionType: PropTypes.oneOf(["chord", "scale"]),
	selectedWithValues: PropTypes.arrayOf(
		PropTypes.shape({
			degree: PropTypes.number.isRequired,
			displayInterval: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			semitonesFromRoot: PropTypes.number.isRequired,
			displayName: PropTypes.shape({
				alt: PropTypes.string,
				id: PropTypes.number.isRequired,
			}).isRequired,
			midiValue: PropTypes.number.isRequired,
		})
	),
	namingConvention: PropTypes.oneOf(["letters", "latin"]).isRequired,
	// FROM HOC
	playNote: PropTypes.func.isRequired,
	playChord: PropTypes.func.isRequired,
	playScale: PropTypes.func.isRequired,
	cancelSound: PropTypes.func.isRequired,
};

export default withMidiSounds(Notes);
