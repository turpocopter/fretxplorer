import React from "react";

import Fret from "./Fret";
import useNoteNames from "hooks/noteNames";

import PropTypes from "prop-types";

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
        data-test='fret'
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
    <div data-test='string' className={stringClasses}>
      <div className={fretsClasses}>{frets}</div>
    </div>
  );
};

String.propTypes = {
  rootNote: PropTypes.oneOf(["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    .isRequired,
  showIntervals: PropTypes.bool.isRequired,
  name: PropTypes.number.isRequired,
  tuning: PropTypes.shape({
    stringId: PropTypes.number.isRequired,
    note: PropTypes.number.isRequired,
    octave: PropTypes.number.isRequired,
  }).isRequired,
  selectedNotes: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.number.isRequired,
      displayInterval: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      displayName: PropTypes.exact({
        alt: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired,
      semitonesFromRoot: PropTypes.number.isRequired,
    })
  ).isRequired,
  nbFrets: PropTypes.number.isRequired,
  noteNaming: PropTypes.string.isRequired,
  playNote: PropTypes.func.isRequired,
  isLeftHanded: PropTypes.bool.isRequired,
};

export default String;
