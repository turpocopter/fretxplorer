import React from "react";
import { useSelector } from "react-redux";
import ChordPickerForm from "containers/ChordPickerForm";
import Fretboard from "containers/Fretboard";
import Chord from "containers/Chord";
import Tuning from "containers/Tuning";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    pageContent: {
      "@media (orientation: landscape)": {
        height: "calc(100vh - 66px)",
        minHeight: 380,
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-between",
      },
      [`${theme.breakpoints.up("md")} and (orientation: landscape)`]: {
        height: "calc(100vh - 110px)",
      },
    },
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
      "@media (min-height: 768px) and (orientation: landscape)": {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: (props) =>
          props.chordName === "" ? "center" : "space-between",
      },
    },
    persistentTuner: {
      display: "none",
      "@media (min-height: 768px) and (orientation: landscape)": {
        display: (props) => (props.chordName !== "" ? "block" : "none"),
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
    <div className={classes.pageContent}>
      <div className={classes.pickerContainer}>
        <div>
          {chordName === "" ? (
            <ChordPickerForm />
          ) : (
            <Chord chordName={chordName} selectedNotes={selectedNotes} />
          )}
        </div>
        <div className={classes.persistentTuner}>
          <Tuning alwaysOpen={true} />
        </div>
      </div>
      <div className={classes.fretboardContainer}>
        <Fretboard />
      </div>
    </div>
  );
};

export default ChordPicker;
