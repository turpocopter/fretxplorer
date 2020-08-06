import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import NoteIntervalSwitch from "components/FormParts/NoteIntervalSwitch";
import Tuning from "containers/Tuning";
import FretMarkerList from "components/FretboardElements/FretMarkerList/FretMarkerList";
import StringList from "components/FretboardElements/StringList/StringList";
import withMidiSounds from "hoc/withMidiSounds";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fretboardWrapper: {
    "@media (orientation: landscape)": {
      overflow: "auto",
      //margin: "0 -16px",
      display: "flex",
      flexFlow: (props) =>
        `${props.isLeftHanded ? "row-reverse" : "row"} nowrap`,
    },
    [`${theme.breakpoints.up("sm")} and (orientation: landscape)`]: {
      //margin: "0 -24px",
    },
  },
  fretboardScroller: {
    "@media (orientation: landscape)": {
      display: "flex",
      flexFlow: (props) =>
        `${props.isLeftHanded ? "row-reverse" : "row"} nowrap`,
      width: "70em",
    },
    "@media (max-width: 800px) and (orientation: landscape)": {
      fontSize: "0.85em",
    },
  },
  fretboardInner: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    marginTop: theme.spacing(1),
    "@media (orientation: landscape)": {
      flexFlow: "column nowrap",
      overflow: "auto",
      width: "67em",
      paddingBottom: "2em",
    },
  },
}));

const Fretboard = (props) => {
  const dispatch = useDispatch();
  const rootNote = useSelector((state) => state.notePicker.rootNote);
  const selectedNotes = useSelector((state) => state.notePicker.selected);
  const noteNaming = useSelector((state) => state.settings.noteNaming);
  const isLeftHanded = useSelector((state) => state.settings.leftHanded);
  const tuning = useSelector((state) => state.settings.tuning);
  const showIntervals = useSelector((state) => state.settings.showIntervals);
  const classes = useStyles({ isLeftHanded });
  const onToggleNotesIntervals = () => {
    return dispatch(actions.toggleNotesIntervals());
  };

  return (
    <div>
      <NoteIntervalSwitch
        showIntervals={showIntervals}
        toggleNotesIntervals={onToggleNotesIntervals}
      />
      <div className={classes.fretboardWrapper}>
        <div className={classes.fretboardScroller}>
          <Tuning alwaysOpen={false} />
          <div className={classes.fretboardInner}>
            <FretMarkerList nbFrets={16} isLeftHanded={isLeftHanded} />
            <StringList
              tuning={tuning}
              rootNote={rootNote}
              selectedNotes={selectedNotes}
              showIntervals={showIntervals}
              nbFrets={16}
              noteNaming={noteNaming}
              playNote={props.playNote}
              isLeftHanded={isLeftHanded}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withMidiSounds(Fretboard);
