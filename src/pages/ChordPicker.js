import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ChordPickerForm from "containers/ChordPickerForm";
import Fretboard from "containers/Fretboard";
import Chord from "containers/Chord";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    pickerContainer: {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.main,
      zIndex: 100,
      paddingBottom: "0!important",
      paddingLeft: 16,
      paddingRight: 16,
      marginBottom: 8,
      [theme.breakpoints.up("sm")]: {
        paddingLeft: 24,
        paddingRight: 24,
      },
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        top: 106,
      },
    },
    fretboardContainer: {
      [theme.breakpoints.down("md")]: {
        display: (props) => (props.chordName === "" ? "none" : "block"),
      },
      paddingTop: "0!important",
      paddingBottom: "0!important",
    },
  };
});

const ChordPicker = () => {
  const chordName = useSelector((state) => state.notePicker.chordName);
  const classes = useStyles({ chordName });
  const selectedNotes = useSelector((state) => state.notePicker.selected);
  return (
    <div spacing={3}>
      <div className={classes.pickerContainer}>
        {chordName === "" ? (
          <ChordPickerForm />
        ) : (
          <Chord chordName={chordName} selectedNotes={selectedNotes} />
        )}
      </div>
      <div className={classes.fretboardContainer}>
        <Fretboard />
      </div>
    </div>
  );
};

export default ChordPicker;
