import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import NoteIntervalSwitch from "components/FormParts/NoteIntervalSwitch";
import ChordPickerForm from "containers/ChordPickerForm";
import Fretboard from "containers/Fretboard";
import Selection from "containers/Selection";
import Tuning from "containers/Tuning";
import Fader from "react-fader";

import useMediaQuery from "@material-ui/core/useMediaQuery";

/*const useStyles = makeStyles((theme) => {
  return {
    pageContent: {
      "@media (orientation: landscape)": {
        height: "calc(100vh - 66px)",
        minHeight: 380,
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-between",
      },
      "@media (min-width: 800px) and (orientation: landscape)": {
        height: "calc(100vh - 116px)",
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
      marginBottom: 0,
      [theme.breakpoints.up("sm")]: {
        paddingLeft: 24,
        paddingRight: 24,
      },
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        top: 106,
      },
      "@media (max-height: 679px) and (orientation: landscape)": {
        display: (props) => props.chordName !== "" && "flex",
        flexFlow: (props) => props.chordName !== "" && "column nowrap",
        flexGrow: (props) => props.chordName !== "" && 1,
        justifyContent: (props) => props.chordName !== "" && "center",
      },
      "@media (min-height: 680px) and (orientation: landscape)": {
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
      "@media (min-height: 680px) and (orientation: landscape)": {
        display: "block", //(props) => (props.chordName !== "" ? "block" : "none"),
        marginLeft: "2em",
      },
      "@media (min-height: 840px) and (min-width: 1140px) and (orientation: landscape)": {
        marginTop: "1em",
      },
    },
    switchUnderTuner: {
      marginTop: "2em",
    },
    fretboardContainer: {
      display: (props) => (props.chordName === "" ? "none" : "block"),
      "@media (orientation: landscape)": {
        flexGrow: (props) => props.chordName !== "" && 1,
        alignItems: (props) => props.chordName !== "" && "center",
      },
      "@media (min-height: 680px) and (orientation: landscape)": {
        display: "block !important",
        flexGrow: 1,
      },
      paddingTop: "0!important",
      paddingBottom: "0!important",
    },
  };
});
*/
const ChordPicker = () => {
  const dispatch = useDispatch();
  const chordName = useSelector((state) => state.notePicker.chordName);
  const showIntervals = useSelector((state) => state.settings.showIntervals);
  //const selectedNotes = useSelector((state) => state.notePicker.selected);

  const onToggleNotesIntervals = () => {
    return dispatch(actions.toggleNotesIntervals());
  };
  const isBigScreen = useMediaQuery(
    "(min-height: 680px) and (orientation: landscape)"
  );
  const pickerContainerClasses = ["pickerContainer"];
  const fretboardContainerClasses = ["fretboardContainer"];
  if (chordName !== "") {
    pickerContainerClasses.push("hasContent");
    fretboardContainerClasses.push("hasContent");
  }
  useEffect(() => {
    dispatch(actions.reinitSelection());
  }, [dispatch]);
  return (
    <div className='pickerPage chordPicker'>
      <div key='pickerContainer' className={pickerContainerClasses.join(" ")}>
        <div>
          <Fader
            fadeInTransitionDuration={300}
            fadeOutTransitionDuration={chordName === "" ? 0 : 300}
            shouldTransition={(oldChildren, newChildren) => {
              return isBigScreen && oldChildren.key !== newChildren.key;
            }}
          >
            {chordName === "" ? (
              <ChordPickerForm key='picker' />
            ) : (
              <Selection key='chord' type='chord' />
            )}
          </Fader>
        </div>
        <div className='persistentTuner'>
          <Tuning alwaysOpen={true} />
          <div className='switchUnderTuner'>
            <NoteIntervalSwitch
              showIntervals={showIntervals}
              toggleNotesIntervals={onToggleNotesIntervals}
            />
          </div>
        </div>
      </div>
      <div
        key='fretboardContainer'
        className={fretboardContainerClasses.join(" ")}
      >
        <Fretboard />
      </div>
    </div>
  );
};

export default ChordPicker;
