import React, { /*useState,*/ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import NoteIntervalSwitch from "components/FormParts/NoteIntervalSwitch";
import ScalePickerForm from "containers/ScalePickerForm";
import Fretboard from "containers/Fretboard";
import Selection from "containers/Selection";
import Tuning from "containers/Tuning";
import Fader from "react-fader";
import { makeStyles } from "@material-ui/core/styles";

import useMediaQuery from "@material-ui/core/useMediaQuery";

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
      "@media (max-height: 767px) and (orientation: landscape)": {
        display: (props) => props.chordName !== "" && "flex",
        flexFlow: (props) => props.chordName !== "" && "column nowrap",
        flexGrow: (props) => props.chordName !== "" && 1,
        justifyContent: (props) => props.chordName !== "" && "center",
      },
      "@media (min-height: 768px) and (orientation: landscape)": {
        display: "flex",
        flexFlow: "row nowrap",
        flexGrow: 1,
        justifyContent: "space-between",
        marginBottom: -54,
        alignItems: "normal",
        padding: "0 88px",
      },
      "@media (min-height: 840px) and (min-width: 1140px) and (orientation: landscape)": {
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: -10,
      },
    },
    persistentTuner: {
      display: "none",
      "@media (min-height: 768px) and (orientation: landscape)": {
        display: "block", //(props) => (props.chordName !== "" ? "block" : "none"),
        marginRight: 16,
      },
      "@media (min-height: 840px) and (min-width: 1140px) and (orientation: landscape)": {
        marginTop: "1em",
      },
    },
    switchUnderTuner: {
      marginTop: "2em",
    },
    fretboardContainer: {
      display: (props) => (props.scaleName === "" ? "none" : "block"),
      "@media (orientation: landscape)": {
        flexGrow: (props) => props.chordName !== "" && 1,
        alignItems: (props) => props.chordName !== "" && "center",
      },
      "@media (min-height: 768px) and (orientation: landscape)": {
        display: "block !important",
        flexGrow: 1,
      },
      paddingTop: "0!important",
      paddingBottom: "0!important",
    },
  };
});

const ScalePicker = () => {
  const dispatch = useDispatch();
  const scaleName = useSelector((state) => state.notePicker.scaleName);
  const showIntervals = useSelector((state) => state.settings.showIntervals);
  //const selectedNotes = useSelector((state) => state.notePicker.selectedNotes);
  //const [modes, setModes] = useState(null);

  const classes = useStyles({ scaleName });

  const onToggleNotesIntervals = () => {
    return dispatch(actions.toggleNotesIntervals());
  };

  const isBigScreen = useMediaQuery(
    "(min-height: 768px) and (orientation: landscape)"
  );
  useEffect(() => {
    dispatch(actions.reinitSelection());
  }, [dispatch]);
  return (
    <div className={classes.pageContent}>
      <div key='pickerContainer' className={classes.pickerContainer}>
        <div>
          <Fader
            fadeInTransitionDuration={300}
            fadeOutTransitionDuration={scaleName === "" ? 0 : 300}
            shouldTransition={(oldChildren, newChildren) => {
              return isBigScreen && oldChildren.key !== newChildren.key;
            }}
          >
            {scaleName === "" ? (
              <ScalePickerForm key='picker' />
            ) : (
              <Selection key='selection' type='scale' />
            )}
          </Fader>
        </div>
        <div className={classes.persistentTuner}>
          <Tuning alwaysOpen={true} />
          <div className={classes.switchUnderTuner}>
            <NoteIntervalSwitch
              showIntervals={showIntervals}
              toggleNotesIntervals={onToggleNotesIntervals}
            />
          </div>
        </div>
      </div>
      <div key='fretboardContainer' className={classes.fretboardContainer}>
        <Fretboard />
      </div>
    </div>
  );
};

export default ScalePicker;
