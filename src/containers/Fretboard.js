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
    overflow: "auto",
  },
  fretboardInner: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    marginTop: theme.spacing(1),
  },
}));

const Fretboard = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles(props);
  const rootNote = useSelector((state) => state.notePicker.rootNote);
  const selectedNotes = useSelector((state) => state.notePicker.selected);
  const noteNaming = useSelector((state) => state.settings.noteNaming);
  const tuning = useSelector((state) => state.settings.tuning);
  const showIntervals = useSelector((state) => state.settings.showIntervals);
  const onToggleNotesIntervals = () => {
    return dispatch(actions.toggleNotesIntervals());
  };

  return (
    <div>
      <NoteIntervalSwitch
        showIntervals={showIntervals}
        toggleNotesIntervals={onToggleNotesIntervals}
      />
      <Tuning alwaysOpen={false} />
      <div className={classes.fretboardWrapper}>
        <div className={classes.fretboardInner}>
          <FretMarkerList nbFrets={16} />
          <StringList
            tuning={tuning}
            rootNote={rootNote}
            selectedNotes={selectedNotes}
            showIntervals={showIntervals}
            nbFrets={16}
            noteNaming={noteNaming}
            playNote={props.playNote}
          />
        </div>
      </div>
    </div>
  );
};

export default withMidiSounds(Fretboard);
