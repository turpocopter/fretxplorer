import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import NoteIntervalSwitch from "components/FormParts/NoteIntervalSwitch";
import Tuning from "containers/Tuning";
import FretMarkerList from "components/FretboardElements/FretMarkerList/FretMarkerList";
import StringList from "components/FretboardElements/StringList/StringList";
import withMidiSounds from "hoc/withMidiSounds";

import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  fretboardRoot: {
    position: "relative",
    marginTop: 8,
    "@media (orientation: landscape)": {
      display: "flex",
      flexFlow: "row nowrap",
      height: "100%",
    },
  },
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
      flexGrow: 1,
      justifyContent: "flex-end",
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
      paddingBottom: "1.4em",
      marginTop: theme.spacing(6),
    },
    "@media (min-width: 1024px) and (orientation: landscape)": {
      width: "87.8em",
    },
    "@media (max-width: 800px) and (orientation: landscape)": {
      marginTop: 40,
      paddingBottom: "1.4em",
    },
  },
  noteIntervalSwitch: {
    "@media (orientation: landscape)": {
      position: "absolute",
      top: 0,
      left: (props) => (props.isLeftHanded ? 16 : "auto"),
      right: (props) => (props.isLeftHanded ? "auto" : 16),
      //width: (props) => (props.isLeftHanded ? "19.4em" : "inherit"),
      zIndex: 90,
    },
    "@media (min-height: 740px) and (orientation: landscape)": {
      display: "none",
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
  const useFlats = useSelector((state) => state.notePicker.useFlats);

  const classes = useStyles({ isLeftHanded });
  const onToggleNotesIntervals = () => {
    return dispatch(actions.toggleNotesIntervals());
  };
  const fullFretboard = useMediaQuery("(min-width: 1024px)");
  const nbFrets = fullFretboard ? 24 : 16;
  return (
    <div className={classes.fretboardRoot}>
      <div className={classes.noteIntervalSwitch}>
        <NoteIntervalSwitch
          showIntervals={showIntervals}
          toggleNotesIntervals={onToggleNotesIntervals}
        />
      </div>
      <div className={classes.fretboardWrapper}>
        <div className={classes.fretboardScroller}>
          <Tuning alwaysOpen={false} />
          <div className={classes.fretboardInner}>
            <FretMarkerList nbFrets={nbFrets} isLeftHanded={isLeftHanded} />
            <StringList
              tuning={tuning}
              rootNote={rootNote}
              selectedNotes={selectedNotes}
              showIntervals={showIntervals}
              nbFrets={nbFrets}
              noteNaming={noteNaming}
              playNote={props.playNote}
              isLeftHanded={isLeftHanded}
              useFlats={useFlats}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withMidiSounds(Fretboard);
