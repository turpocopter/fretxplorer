import React from "react";

import Fret from "./Fret";

import useNoteNames from "hooks/noteNames";

const String = (props) => {
  const {
    rootNote,
    showIntervals,
    name,
    tuning,
    selectedNotes,
    nbFrets,
    noteNaming,
    playNote,
    isLeftHanded,
  } = props;
  const { translateNote } = useNoteNames(noteNaming);

  const frets = [...Array(nbFrets + 1)].map((_, v) => {
    const note = (tuning.note + v) % 12;
    const octave =
      tuning.octave + Math.floor(v / 12) + (note < tuning.note ? 1 : 0);
    const noteInfo = selectedNotes.find(
      (el) => (rootNote + el.semitonesFromRoot) % 12 === note
    );
    const isSelected = Boolean(noteInfo);
    let display = "";
    if (isSelected) {
      display = showIntervals
        ? noteInfo.displayInterval
        : translateNote(noteInfo.displayName);
    }
    return (
      <Fret
        key={`${name}-${v}`}
        position={v}
        display={display}
        isRoot={note === rootNote}
        note={note}
        octave={octave}
        playNote={playNote}
        stringId={name}
        isLeftHanded={isLeftHanded}
      />
    );
  });
  let stringClasses = `String string-${name}`;
  let fretsClasses = "Frets";
  if (isLeftHanded) {
    stringClasses += " leftHanded";
    fretsClasses += " leftHanded";
  }
  return (
    <div className={stringClasses}>
      <div className={fretsClasses}>{frets}</div>
    </div>
  );
};

export default String;
