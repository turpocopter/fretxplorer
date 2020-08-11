import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import RootForm from "components/FormParts/RootForm";
import QualityForm from "components/FormParts/Chord/QualityForm";
import SeventhForm from "components/FormParts/Chord/SeventhForm";
import ExtensionForm from "components/FormParts/Chord/ExtensionForm";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import useNoteNames from "hooks/noteNames";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.main,
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      minHeight: "calc(100vh - 262px)",
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
    },
    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      margin: "16px 32px",
    },
    "@media (max-height: 767px) and (orientation: landscape)": {
      minHeight: "calc(100vh - 150px)",
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
    },
    "@media (max-height: 767px) and (min-width: 1024px) and (orientation: landscape)": {
      minHeight: "calc(100vh - 268px)",
    },
    "@media (min-height: 768px) and (orientation: landscape)": {
      margin: "0 0 0 6px",
      minHeight: "16.6em",
    },
    "@media (min-height: 840px) and (orientation: landscape)": {
      minHeight: "19.7em" /*"23.1em",*/,
    },
  },
  paperInner: {
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      height: "30.8em",
    },
    "@media (max-height: 767px) and (orientation: landscape)": {
      height: "23.1em",
    },
    "@media (max-height: 767px) and (min-width: 1024px) and (orientation: landscape)": {
      height: "27em",
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      marginBottom: theme.spacing(4),
    },
    "@media (min-height: 768px) and (max-height: 839px) and (orientation: landscape)": {
      display: "none",
    },
  },
  form: {
    width: 250,
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
  },
  buttonWrapper: {
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      marginTop: 8,
    },
  },
  submitButton: {
    width: 250,
    marginTop: 16,
    padding: "16px 0",
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
    "& sup": {
      verticalAlign: "top",
      position: "relative",
      top: "-0.25em",
    },
    textTransform: "none",
    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      marginTop: 8,
      padding: "8px 0",
    },
    "@media (min-height: 768px) and (orientation: landscape)": {
      marginTop: 8,
      padding: "8px 0",
    },
    "@media (min-width: 1590px) and (max-aspect-ratio: 8/5)": {
      marginTop: 16,
      padding: "16px 0",
    },
  },
}));

const ChordPickerForm = () => {
  const [quality, setQuality] = useState("");
  const [seventh, setSeventh] = useState("");
  const [extension, setExtension] = useState("");
  const [tmpChordName, setTmpChordName] = useState("");

  const dispatch = useDispatch();
  const rootNote = useSelector((state) => state.notePicker.rootNote);
  const useFlats = useSelector((state) => state.notePicker.useFlats);
  const selected = useSelector((state) => state.notePicker.selected);
  const noteNaming = useSelector((state) => state.settings.noteNaming);

  const { getNoteName } = useNoteNames(noteNaming);

  const classes = useStyles();

  const onUpdateRoot = (rootNote) => {
    return dispatch(actions.updateRoot(rootNote, noteNaming));
  };
  const onUpdateQuality = (name, notes) => {
    setQuality(name);
    setSeventh("");
    setExtension("");
    return dispatch(actions.updateQuality(notes));
  };
  const onUpdateSeventh = (name, semitonesFromRoot) => {
    setSeventh(name);
    setExtension("");
    return dispatch(actions.updateSeventh(semitonesFromRoot));
  };
  const onUpdateExtension = (name, notes) => {
    setExtension(name);
    return dispatch(actions.updateExtension(notes));
  };
  const onToggleFlats = () => dispatch(actions.toggleFlats(noteNaming));
  const onPickChord = () => dispatch(actions.updateChordName(tmpChordName));

  const rootName = getNoteName(rootNote, useFlats);

  return (
    <div className={classes.paper}>
      <div className={classes.paperInner}>
        <Typography
          className={classes.title}
          variant='h5'
          component='h2'
          align='center'
        >
          Pick a chord!
        </Typography>
        <RootForm
          rootNote={rootNote}
          useFlats={useFlats}
          noteNaming={noteNaming}
          updateRoot={onUpdateRoot}
          toggleFlats={onToggleFlats}
        />
        <Fade in={rootNote !== ""} mountOnEnter unmountOnExit timeout={700}>
          <div>
            <QualityForm
              rootName={rootName}
              quality={quality}
              selected={selected}
              updateQuality={onUpdateQuality}
              setTmpChordName={setTmpChordName}
              className={classes.quality}
            />
          </div>
        </Fade>
        <Fade in={quality !== ""} mountOnEnter unmountOnExit timeout={700}>
          <div>
            <SeventhForm
              rootName={rootName}
              seventh={seventh}
              selected={selected}
              updateSeventh={onUpdateSeventh}
              setTmpChordName={setTmpChordName}
            />
          </div>
        </Fade>
        <Fade in={seventh !== ""} mountOnEnter unmountOnExit timeout={700}>
          <div>
            <ExtensionForm
              rootName={rootName}
              selected={selected}
              extension={extension}
              updateExtension={onUpdateExtension}
              setTmpChordName={setTmpChordName}
            />
          </div>
        </Fade>
        <Fade in={quality !== ""} mountOnEnter unmountOnExit timeout={700}>
          <div>
            <FormControl className={classes.buttonWrapper}>
              <Button
                className={classes.submitButton}
                variant='contained'
                color='primary'
                size='large'
                onClick={onPickChord}
              >
                PICK&nbsp;
                <span dangerouslySetInnerHTML={{ __html: tmpChordName }} />
              </Button>
            </FormControl>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default ChordPickerForm;
