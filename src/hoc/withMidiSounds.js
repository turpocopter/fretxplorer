import React, { useEffect } from "react";

import MIDISounds from "midi-sounds-react";

const WithMidiSounds = (WrappedComponent) => {
	let midiSounds = null;

	const Hoc = (props) => {
		useEffect(() => {
			if (midiSounds) {
				midiSounds.setMasterVolume(0.4);
			}
			return () => {
				if (midiSounds) {
					midiSounds.cancelQueue();
				}
			};
		}, []);
		const INSTRUMENT_ID = 270; // ou 262 ??

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
			<>
				<WrappedComponent
					{...props}
					playNote={onPlayNote}
					playMelody={onPlayMelody}
					playChord={onPlayChord}
					playScale={onPlayScale}
					getNoteVal={getNoteVal}
					cancelSound={onCancel}
				/>
				<div style={{ display: "none" }}>
					<MIDISounds
						ref={(ref) => (midiSounds = ref)}
						appElementName='root'
						instruments={[INSTRUMENT_ID]}
					/>
				</div>
			</>
		);
	};

	return Hoc;
};

export default WithMidiSounds;
