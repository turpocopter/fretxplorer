import React from "react";

import MIDISounds from "midi-sounds-react";

const WithMidiSounds = (WrappedComponent) => {
  return (props) => {
    const INSTRUMENT_ID = 270; // ou 262 ??
    let midiSounds = null;

    const getNoteVal = (note, octave) => note + 12 * (octave + 1);

    const onPlayNote = (note, octave = null) => {
      const noteVal = octave ? getNoteVal(note, octave) : note;
      if (midiSounds) midiSounds.playChordNow(INSTRUMENT_ID, [noteVal], 1);
    };

    const onPlayMelody = (
      notes,
      speed = 1,
      playChord = false,
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
        if (playChord) {
          notes.forEach((note, i) => {
            midiSounds.playChordAt(
              when + speed * notes.length + i * 0.07,
              INSTRUMENT_ID,
              [note],
              speed * 2
            );
          });
        }
      }
    };

    const onPlayChord = (notes, speed = 1, notesNeedTranslation = false) => {
      onPlayMelody(notes, speed, true, notesNeedTranslation);
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
};

export default WithMidiSounds;
