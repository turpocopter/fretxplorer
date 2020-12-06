import React, { useContext } from "react";
import AudioContext from "AudioContext";

const WithMidiSounds = (WrappedComponent) => {
	const Hoc = (props) => {
		const ctx = useContext(AudioContext);
		const { midiSounds, INSTRUMENT_ID } =
			ctx !== null ? ctx : { midiSounds: null, INSTRUMENT_ID: null };

		const getNoteVal = (note, octave) => note + 12 * (octave + 1);

		const onPlayNote = (note, octave = null) => {
			const noteVal = octave ? getNoteVal(note, octave) : note;
			if (midiSounds) midiSounds.playChordNow(INSTRUMENT_ID, [noteVal], 1);
		};

		const onPlayMelody = (
			notes,
			speed = 1,
			type = null,
			notesNeedTranslation = false
		) => {
			if (midiSounds) {
				if (notesNeedTranslation) {
					notes = notes.map((note) =>
						note.o ? note.n + 12 * (note.o + 1) : note.n
					);
				}
				const when = midiSounds.contextTime();
				notes.forEach((note, i) => {
					midiSounds.playChordAt(
						when + speed * i,
						INSTRUMENT_ID,
						[note],
						speed
					);
				});
				// chord: play arpeggio after
				if (type === "chord") {
					notes.forEach((note, i) => {
						midiSounds.playChordAt(
							when + speed * notes.length + i * 0.07,
							INSTRUMENT_ID,
							[note],
							speed * 2
						);
					});
				}
				// scale: play root at octave after
				else if (type === "scale") {
					midiSounds.playChordAt(
						when + speed * notes.length,
						INSTRUMENT_ID,
						[notes[0] + 12],
						speed
					);
				}
			}
		};

		const onPlayChord = (notes, speed = 1, notesNeedTranslation = false) => {
			onPlayMelody(notes, speed, "chord", notesNeedTranslation);
		};

		const onPlayScale = (notes, speed = 1, notesNeedTranslation = false) => {
			onPlayMelody(notes, speed, "scale", notesNeedTranslation);
		};

		const onCancel = () => {
			if (midiSounds) midiSounds.cancelQueue();
		};

		return (
			<WrappedComponent
				{...props}
				playNote={onPlayNote}
				playMelody={onPlayMelody}
				playChord={onPlayChord}
				playScale={onPlayScale}
				getNoteVal={getNoteVal}
				cancelSound={onCancel}
			/>
		);
	};

	return Hoc;
};

export default WithMidiSounds;
