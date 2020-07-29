import React, { useState } from "react";

import withMidiSounds from "hoc/withMidiSounds";
import useNotes from "hooks/noteNames";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
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
      fontSize: "2.2em",
      lineHeight: 1,
      verticalAlign: "bottom",
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

const ChordNotes = ({
  playNote,
  playChord,
  selectedWithValues,
  namingConvention,
}) => {
  const speed = 1;
  const classes = useStyles();
  const { translateNote } = useNotes(namingConvention);
  const [activeNote, setActiveNote] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    if (!isPlaying && !activeNote) {
      playNote(el.midiValue);
      setActiveNote(i);
      setTimeout(() => {
        setActiveNote(null);
      }, speed * 1000);
    }
  };

  const onChordListen = () => {
    if (!isPlaying && !activeNote) {
      setIsPlaying(true);
      playChord(midiValues, speed);
      setActiveNote(0);
      let noteCounter = 0;
      const intervalID = setInterval(() => {
        noteCounter++;
        setActiveNote(noteCounter);
        if (noteCounter === notes.length - 1) {
          clearInterval(intervalID);
          setTimeout(() => {
            setActiveNote(null);
          }, speed * 1000);
          setTimeout(() => {
            setIsPlaying(false);
          }, speed * (3000 + 70 * notes.length));
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
        onClick={onChordListen}
      >
        <PlayCircleOutlineIcon fontSize='inherit' />
      </li>
    </ul>
  );
};

export default withMidiSounds(ChordNotes);
