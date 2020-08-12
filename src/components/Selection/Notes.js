import React, { useState, useEffect } from "react";

import withMidiSounds from "hoc/withMidiSounds";
import useNotes from "hooks/noteNames";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    notes: {
      width: "100%",
      paddingTop: theme.spacing(1),
      paddingLeft: 0,
      margin: 0,
      listStyleType: "none",
      fontSize: "0.9em",
      [theme.breakpoints.up("sm")]: {
        fontSize: "1em",
      },
    },
    note: {
      display: "inline-block",
      textAlign: "center",
      width: "1.7em",
      marginRight: "1.3em",
    },
    noteName: {},
    playChord: {
      display: "inline-block",
      fontSize: "1.3rem",
      width: "1.5rem",
      zIndex: 0,
      textAlign: "center",
      position: "relative",
      "&::before": {
        content: `''`,
        position: "absolute",
        display: "block",
        height: "1.6rem",
        width: "1.6rem",
        backgroundColor: theme.palette.background.main,
        zIndex: -1,
        borderRadius: "50%",
        border: "2.4px solid black",
        top: "-0.1rem",
        left: 0,
      },
      "&$active": {
        color: theme.palette.secondary.main,
        "&::before": {
          borderColor: theme.palette.secondary.main,
        },
      },
    },
    interval: {
      color: "#aaa",
      fontSize: "0.9em",
    },
    active: {
      color: theme.palette.secondary.main,
    },
  };
});

const Notes = ({
  selectionType,
  playNote,
  playChord,
  playScale,
  cancelSound,
  selectedWithValues,
  namingConvention,
}) => {
  const classes = useStyles();
  const { translateNote } = useNotes(namingConvention);
  const [activeNote, setActiveNote] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  let intervalID = null;

  useEffect(() => {
    return () => {
      if (intervalID) clearInterval(intervalID);
      cancelSound();
    };
  }, [cancelSound, intervalID]);

  const notes = selectedWithValues.map((el, i) => {
    return (
      <li
        key={el.displayInterval}
        className={
          classes.note + (activeNote === i ? " " + classes.active : "")
        }
        onClick={() => onClickNote(el, i)}
      >
        <div className={classes.noteName}>{translateNote(el.displayName)}</div>
        <div className={classes.interval}>{el.displayInterval}</div>
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

  return (
    <ul className={classes.notes}>
      {notes}
      <li
        className={
          classes.playChord + (isPlaying === true ? " " + classes.active : "")
        }
        onClick={() => onSelectionListen(selectionType)}
      >
        <PlayArrowIcon fontSize='inherit' />
      </li>
    </ul>
  );
};

export default withMidiSounds(Notes);
