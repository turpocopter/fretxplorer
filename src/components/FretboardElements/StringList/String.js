import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Fret from "./Fret";

import useNoteNames from "hooks/noteNames";

const useStyles = makeStyles(() => ({
  string: {
    width: "2.6em",
    position: "relative",
    "&::before": {
      content: '""',
      display: "block",
      width: 1,
      position: "absolute",
      top: "1em",
      right: 0,
      left: 0,
      bottom: 0,
      margin: "auto",
      background:
        "linear-gradient(90deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
      zIndex: 1,
    },
    "&:nth-child(5)::before": {
      width: 1.3,
    },
    "&:nth-child(4)::before": {
      width: 1.7,
    },
    "&:nth-child(3)::before": {
      width: 3,
      background:
        "repeating-linear-gradient( 3deg, rgba(0,0,0,0), rgba(0,0,0,0) 0.5px, rgba(0,0,0,0.15) 0.5px, rgba(0,0,0,0.15) 1px), linear-gradient(90deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
    },
    "&:nth-child(2)::before": {
      width: 4.2,
      background:
        "repeating-linear-gradient( 3deg, rgba(0,0,0,0), rgba(0,0,0,0) 0.5px, rgba(0,0,0,0.15) 0.5px, rgba(0,0,0,0.15) 1px), linear-gradient(90deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
    },
    "&:nth-child(1)::before": {
      width: 5.2,
      background:
        "repeating-linear-gradient( 3deg, rgba(0,0,0,0), rgba(0,0,0,0) 0.5px, rgba(0,0,0,0.15) 0.5px, rgba(0,0,0,0.15) 1px), linear-gradient(90deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
    },
  },
}));

const String = (props) => {
  const classes = useStyles();
  const {
    rootNote,
    showIntervals,
    name,
    tuning,
    selectedNotes,
    nbFrets,
    noteNaming,
    playNote,
    order,
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
        order={order}
      />
    );
  });
  return (
    <div className={classes.string}>
      <div className='frets'>{frets}</div>
    </div>
  );
};

export default String;
