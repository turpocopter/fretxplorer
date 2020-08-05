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
      //backgroundColor: theme.palette.background.main,
      zIndex: 100,
      paddingBottom: "0!important",
      marginBottom: 8,
      "&::after": {
        content: `''`,
        display: "block",
        height: 8,
        bottom: -24,
        left: 0,
        backgroundImage: `linear-gradient(180deg, ${theme.palette.background.main}, transparent)`,
      },
      [theme.breakpoints.up("sm")]: {
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
