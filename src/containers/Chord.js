import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";
import { sanitize } from "dompurify";
import ChordNotes from "components/Selection/ChordNotes";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      padding: theme.spacing(1.5, 0, 1.5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderBottom: "1px solid #ddd",
      backgroundColor: theme.palette.background.main,
      [theme.breakpoints.up("sm")]: {
        paddingBottom: theme.spacing(3),
      },
    },
    chordHeader: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {},
    button: {
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        position: "relative",
        top: 30,
      },
    },
  };
});

const Chord = () => {
  const dispatch = useDispatch();
  const chordName = useSelector((state) => state.notePicker.chordName);
  const rootNote = useSelector((state) => state.notePicker.rootNote);
  const selected = useSelector((state) => state.notePicker.selected);
  const namingConvention = useSelector((state) => state.settings.noteNaming);
  const classes = useStyles();
  const tabletOrBigger = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const rootNoteValue = rootNote + (rootNote >= 4 ? 36 : 48); // on la veut à la 3è octave de la librairie (ou 4è si entre C et D#)
  const selectedWithValues = selected.map((el) => ({
    ...el,
    midiValue: rootNoteValue + el.semitonesFromRoot + (el.degree > 7 ? 12 : 0),
  }));

  const onDiscardChord = () => {
    return dispatch(actions.discardChord());
  };

  return (
    <div className={classes.paper}>
      <div className={classes.chordHeader}>
        <Typography
          className={classes.title}
          variant='h5'
          component='h2'
          color='primary'
          dangerouslySetInnerHTML={{ __html: sanitize(chordName) }}
        />
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          size={tabletOrBigger ? "medium" : "small"}
          onClick={onDiscardChord}
        >
          Pick Another
        </Button>
      </div>
      <ChordNotes
        selectedWithValues={selectedWithValues}
        namingConvention={namingConvention}
      ></ChordNotes>
    </div>
  );
};

export default Chord;
