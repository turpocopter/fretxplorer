import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Fret from "./Fret";

import useNoteNames from "hooks/noteNames";

const useStyles = makeStyles((theme) => ({
  string: {
    width: "2.4em",
    position: "relative",
    "@media (orientation: landscape)": {
      height: "2.4em",
      width: "auto",
      position: "relative",
    },
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
      "@media (orientation: landscape)": {
        height: 1,
        width: "calc(100% - 1em)",
        top: 0,
        left: (props) => (props.isLeftHanded ? 0 : "1em"),
        right: (props) => (props.isLeftHanded ? "1em" : 0),
        margin: "auto",
        background:
          "linear-gradient(0deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
        zIndex: 1,
        /*[theme.breakpoints.up("sm")]: {
          left: (props) => (props.isLeftHanded ? "auto" : 20),
          right: (props) => (props.isLeftHanded ? 20 : "auto"),
        },*/
      },
    },
    "&:nth-child(5)::before": {
      width: 1.3,
      "@media (orientation: landscape)": {
        width: "auto",
        height: 1.3,
      },
    },
    "&:nth-child(4)::before": {
      width: 1.7,
      "@media (orientation: landscape)": {
        width: "auto",
        height: 1.7,
      },
    },
    "&:nth-child(3)::before": {
      width: 3,
      background:
        "repeating-linear-gradient( 3deg, rgba(0,0,0,0), rgba(0,0,0,0) 0.5px, rgba(0,0,0,0.15) 0.5px, rgba(0,0,0,0.15) 1px), linear-gradient(90deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
      "@media (orientation: landscape)": {
        width: "auto",
        height: 3,
        background:
          "repeating-linear-gradient( -87deg, rgba(0,0,0,0), rgba(0,0,0,0) 0.5px, rgba(0,0,0,0.15) 0.5px, rgba(0,0,0,0.15) 1px), linear-gradient(0deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
      },
    },
    "&:nth-child(2)::before": {
      width: 4.2,
      background:
        "repeating-linear-gradient( 3deg, rgba(0,0,0,0), rgba(0,0,0,0) 0.5px, rgba(0,0,0,0.15) 0.5px, rgba(0,0,0,0.15) 1px), linear-gradient(90deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
      "@media (orientation: landscape)": {
        width: "auto",
        height: 4.2,
        background:
          "repeating-linear-gradient( -87deg, rgba(0,0,0,0), rgba(0,0,0,0) 0.5px, rgba(0,0,0,0.15) 0.5px, rgba(0,0,0,0.15) 1px), linear-gradient(0deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
      },
    },
    "&:nth-child(1)::before": {
      width: 5.2,
      background:
        "repeating-linear-gradient( 3deg, rgba(0,0,0,0), rgba(0,0,0,0) 0.5px, rgba(0,0,0,0.15) 0.5px, rgba(0,0,0,0.15) 1px), linear-gradient(90deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
      "@media (orientation: landscape)": {
        width: "auto",
        height: 5.2,
        background:
          "repeating-linear-gradient( -87deg, rgba(0,0,0,0), rgba(0,0,0,0) 0.5px, rgba(0,0,0,0.15) 0.5px, rgba(0,0,0,0.15) 1px), linear-gradient(0deg, #797265 0%, #eee4d8 49%, #ededed 50%, #ededed 55%, #999080 100%)",
      },
    },
  },
  frets: {
    "@media (orientation: landscape)": {
      display: "flex",
      flexFlow: (props) =>
        `${props.isLeftHanded ? "row-reverse" : "row"} nowrap`,
      height: "100%",
    },
  },
}));

const String = (props) => {
  const classes = useStyles(props);
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
  return (
    <div className={classes.string}>
      <div className={classes.frets}>{frets}</div>
    </div>
  );
};

export default String;
