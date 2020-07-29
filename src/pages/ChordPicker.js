import React from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ChordPickerForm from "containers/ChordPickerForm";
import Fretboard from "containers/Fretboard";
import Chord from "containers/Chord";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
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
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        {chordName === "" ? (
          <ChordPickerForm />
        ) : (
          <Chord chordName={chordName} selectedNotes={selectedNotes} />
        )}
      </Grid>
      <Grid className={classes.fretboardContainer} item xs={12} md={6}>
        <Fretboard />
      </Grid>
    </Grid>
  );
};

export default ChordPicker;
