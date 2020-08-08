import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import Presets from "components/Tuning/Presets";
import Peg from "components/Tuning/Peg";
import useNoteNames from "hooks/noteNames";
import withMidiSounds from "hoc/withMidiSounds";

import fork from "assets/fork.svg";
import SettingsIcon from "@material-ui/icons/Settings";
import CancelIcon from "@material-ui/icons/Cancel";
import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  let tuningTablet = { margin: "12px auto" };
  let forkTablet;
  let settingsTablet;
  let discardTablet;
  let linkStringsTablet;
  let playBtnOpenTablet;
  let tuneBtnWrapperTablet;
  return {
    tuning: {
      position: "relative",
      "&$active": {
        borderRadius: 10,
        border: `3px solid ${theme.palette.gray.light}`,
        width: "18.8em",
        paddingBottom: 8,
        margin: "0 auto",
        [`${theme.breakpoints.up(
          "sm"
        )} and (orientation: portrait)`]: tuningTablet,
        [`${theme.breakpoints.up(
          "md"
        )} and (orientation: landscape)`]: tuningTablet,
      },
      [theme.breakpoints.up("sm")]: tuningTablet,
      "@media (orientation: landscape)": {
        paddingLeft: (props) => (!props.alwaysOpen ? 16 : 0),
        paddingRight: (props) => (!props.alwaysOpen ? 16 : 0),
        //margin: (props) => !props.alwaysOpen && "2.5em 0 0",
        display: (props) => !props.alwaysOpen && "flex",
        margin: (props) => !props.alwaysOpen && "1.1em 0 0",
      },
    },
    pegs: (props) => ({
      display: "flex",
      flexFlow: `${
        props.isLeftHanded && !props.doNotFlipOver ? "row-reverse" : "row"
      } nowrap`,
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      "@media (orientation: landscape)": {
        flexFlow: !props.alwaysOpen
          ? "column-reverse nowrap"
          : `${
              props.isLeftHanded && !props.doNotFlipOver ? "row-reverse" : "row"
            } nowrap`,
      },
    }),
    forkWrapper: {
      display: "inline-flex",
      order: (props) => (props.isLeftHanded && !props.doNotFlipOver ? 10 : 0),
      "@media (orientation: landscape)": {
        order: (props) => (!props.alwaysOpen ? 10 : 0),
      },
    },
    fork: {
      height: 20,
      marginRight: 8,
      marginLeft: 5,
      "@media (orientation: landscape)": {
        marginRight: (props) => (!props.alwaysOpen ? 0 : 8),
        marginLeft: (props) => (!props.alwaysOpen ? 0 : 5),
        marginTop: (props) => (!props.alwaysOpen ? 5 : 0),
        marginBottom: (props) => (!props.alwaysOpen ? 8 : 0),
      },
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: portrait)`]: (forkTablet = {
        height: 25,
        marginRight: 9,
        marginLeft: 6,
      }),
      [`${theme.breakpoints.up(
        "md"
      )} and (orientation: landscape)`]: forkTablet,
    },
    settings: {
      display: "inline-block",
      height: 25,
      width: 25,
      border: "2px solid black",
      fontSize: 19,
      borderRadius: "50%",
      marginLeft: 10,
      order: (props) => (props.isLeftHanded && !props.doNotFlipOver ? 0 : 10),
      "@media (orientation: landscape)": {
        display: (props) => (!props.isAlwaysOpen ? "none" : "inline-block"),
        order: (props) => (!props.alwaysOpen ? 0 : 10),
        marginTop: (props) => (!props.alwaysOpen ? 10 : 0),
        marginLeft: (props) => (!props.alwaysOpen ? 0 : 10),
      },
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: portrait)`]: (settingsTablet = {
        height: 29,
        width: 29,
        fontSize: 21,
      }),
      [`${theme.breakpoints.up(
        "md"
      )} and (orientation: landscape)`]: settingsTablet,
    },
    playBtn: {
      display: "inline-flex",
      fontSize: 29,
    },
    discard: {
      position: "absolute",
      top: -17,
      right: -15,
      fontSize: 27,
      zIndex: 0,
      "&::before": {
        content: `''`,
        position: "absolute",
        display: "block",
        height: 19,
        width: 19,
        backgroundColor: theme.palette.background.main,
        top: 6,
        left: 4,
        zIndex: -1,
        borderRadius: "50%",
      },
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: portrait)`]: (discardTablet = {
        top: -23,
        right: -19,
        fontSize: 34,
      }),
      [`${theme.breakpoints.up(
        "md"
      )} and (orientation: landscape)`]: discardTablet,
    },
    linkStrings: {
      position: "absolute",
      fontSize: 21,
      width: 25,
      zIndex: 0,
      textAlign: "center",
      top: 85,
      right: -14,
      "&::before": {
        content: `''`,
        position: "absolute",
        display: "block",
        height: 25,
        width: 25,
        backgroundColor: theme.palette.background.main,
        zIndex: -1,
        borderRadius: "50%",
        border: "2.4px solid black",
        top: 0,
        left: 0,
      },
      "&$active": {
        color: theme.palette.secondary.main,
        "&::before": {
          borderColor: theme.palette.secondary.main,
        },
      },
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: portrait)`]: (linkStringsTablet = {
        fontSize: 24,
        right: -15,
        top: 117,
        width: 28,
        "&::before": {
          height: 29,
          width: 29,
        },
      }),
      [`${theme.breakpoints.up(
        "md"
      )} and (orientation: landscape)`]: linkStringsTablet,
    },
    playBtnOpen: {
      position: "absolute",
      fontSize: 21,
      width: 25,
      zIndex: 0,
      textAlign: "center",
      top: 85,
      left: -14,
      "&::before": {
        content: `''`,
        position: "absolute",
        display: "block",
        height: 25,
        width: 25,
        backgroundColor: theme.palette.background.main,
        zIndex: -1,
        borderRadius: "50%",
        border: "2.4px solid black",
        top: 0,
        left: 0,
      },
      "&$active": {
        color: theme.palette.secondary.main,
        "&::before": {
          borderColor: theme.palette.secondary.main,
        },
      },
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: portrait)`]: (playBtnOpenTablet = {
        fontSize: 24,
        left: -16,
        top: 117,
        width: 29,
        "&::before": {
          height: 29,
          width: 29,
        },
      }),
      [`${theme.breakpoints.up(
        "md"
      )} and (orientation: landscape)`]: playBtnOpenTablet,
    },
    tuneBtnWrapper: {
      display: "flex",
      justifyContent: "center",
      position: "relative",
      zIndex: 0,
      "&::before": {
        content: `''`,
        position: "absolute",
        top: "0.9em", //12,
        zIndex: -1,
        height: 1,
        width: "12.1em", //169,
        backgroundColor: theme.palette.gray.light,
      },
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: portrait)`]: (tuneBtnWrapperTablet = {
        "&::before": {
          //top: 17,
          //width: 236,
        },
      }),
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: landscape)`]: tuneBtnWrapperTablet,
    },
    tuneBtn: {
      display: "block",
      color: theme.palette.gray.dark,
      border: "none",
      margin: 0,
      padding: 0,
      background: theme.palette.background.main,
      outline: "none",
      "&:disabled": {
        color: theme.palette.gray.light,
      },
    },
    active: {},
  };
});

const Tuning = ({
  playNote,
  playMelody,
  getNoteVal,
  alwaysOpen,
  doNotFlipOver,
}) => {
  const dispatch = useDispatch();
  const tuning = useSelector((state) => state.settings.tuning);
  const useFlats = useSelector((state) => state.settings.useFlats);
  const noteNaming = useSelector((state) => state.settings.noteNaming);
  const isLeftHanded = useSelector((state) => state.settings.leftHanded);
  const { getNoteName } = useNoteNames(noteNaming);
  const [isOpen, setIsOpen] = useState(alwaysOpen);
  const [activePeg, setActivePeg] = useState(null);
  const [preset, setPreset] = useState("");
  const [isLinked, setIsLinked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const classes = useStyles({ doNotFlipOver, isLeftHanded, alwaysOpen });

  let intervalID = null;

  /*
  useEffect(() => {
    return () => {
      if (intervalID) clearInterval(intervalID);
      cancelSound();
    };
  }, [cancelSound, intervalID]);
  */

  const onTuneUpString = (stringId) => {
    setPreset("");
    return dispatch(actions.tuneUpString(stringId));
  };
  const onTuneDownString = (stringId) => {
    setPreset("");
    return dispatch(actions.tuneDownString(stringId));
  };
  const onTuneUpAll = () => {
    setPreset("");
    return dispatch(actions.tuneUpAll());
  };
  const onTuneDownAll = () => {
    setPreset("");
    return dispatch(actions.tuneDownAll());
  };
  const onClickPeg = (stringId, note, octave) => {
    if (!activePeg) {
      setActivePeg(stringId);
      playNote(note, octave);
      setTimeout(() => {
        setActivePeg(null);
      }, 1000);
    }
  };
  const onClickPlay = () => {
    if (!activePeg) {
      setIsPlaying(true);
      playMelody(
        tuning.map((el) => ({ n: el.note, o: el.octave })),
        1,
        false,
        true
      );
      let stringCounter = 6;
      setActivePeg(6);
      intervalID = setInterval(() => {
        stringCounter--;
        setActivePeg(stringCounter);
        if (stringCounter === 1) {
          clearInterval(intervalID);
          setTimeout(() => {
            setActivePeg(null);
            setIsPlaying(false);
          }, 1000);
        }
      }, 1000);
    }
  };
  const onSelectPreset = (id, tuning) => {
    setPreset(id);
    return dispatch(actions.setTuningPreset(tuning));
  };
  const isGlobalTuningEnabled = (isDown = false) =>
    tuning.every((el) =>
      isDown
        ? el.reference - getNoteVal(el.note, el.octave) < 9
        : getNoteVal(el.note, el.octave) - el.reference < 9
    );

  const pegList = tuning.map((el) => (
    <Peg
      key={el.stringId}
      stringId={el.stringId}
      tuning={{ n: el.note, o: el.octave }}
      noteNaming={noteNaming}
      useFlats={useFlats}
      getNoteName={getNoteName}
      isActive={activePeg === el.stringId}
      isLinked={isLinked}
      onClickPeg={() => onClickPeg(el.stringId, el.note, el.octave)}
      isOpen={isOpen}
      alwaysOpen={alwaysOpen}
      tuneUp={onTuneUpString}
      tuneDown={onTuneDownString}
      tuneUpDisabled={getNoteVal(el.note, el.octave) - el.reference === 9}
      tuneDownDisabled={el.reference - getNoteVal(el.note, el.octave) === 9}
    />
  ));
  const wrapperClasses = [classes.tuning];
  const pegsClasses = [classes.pegs];
  const playBtnClasses = [classes.playBtnOpen];
  const linkStringsClasses = [classes.linkStrings];
  if (isOpen) {
    wrapperClasses.push(classes.active);
    pegsClasses.push(classes.active);
  }
  if (isPlaying) {
    playBtnClasses.push(classes.active);
  }
  if (isLinked) {
    linkStringsClasses.push(classes.active);
  }
  return (
    <div className={wrapperClasses.join(" ")}>
      {isOpen && <Presets preset={preset} selectPreset={onSelectPreset} />}
      {isOpen && isLinked && (
        <div className={classes.tuneBtnWrapper}>
          <button
            className={classes.tuneBtn}
            onClick={onTuneDownAll}
            disabled={!isGlobalTuningEnabled(true)}
          >
            <RemoveCircleIcon />
          </button>
        </div>
      )}
      <div className={pegsClasses.join(" ")}>
        {!isOpen && (
          <div className={classes.forkWrapper} onClick={onClickPlay}>
            <img className={classes.fork} src={fork} alt='Tuning' />
          </div>
        )}
        {pegList}
        {!isOpen && (
          <div className={classes.settings} onClick={() => setIsOpen(true)}>
            <SettingsIcon fontSize='inherit' />
          </div>
        )}
      </div>
      {isOpen && isLinked && (
        <div className={classes.tuneBtnWrapper}>
          <button
            className={classes.tuneBtn}
            onClick={onTuneUpAll}
            disabled={!isGlobalTuningEnabled()}
          >
            <AddCircleIcon />
          </button>
        </div>
      )}
      {isOpen && (
        <>
          {!alwaysOpen && (
            <div className={classes.discard} onClick={() => setIsOpen(false)}>
              <CancelIcon fontSize='inherit' />
            </div>
          )}
          <div className={playBtnClasses.join(" ")} onClick={onClickPlay}>
            <PlayArrowIcon fontSize='inherit' />
          </div>
          <div
            className={linkStringsClasses.join(" ")}
            onClick={() => setIsLinked(!isLinked)}
          >
            {isLinked ? (
              <LinkOffIcon fontSize='inherit' />
            ) : (
              <LinkIcon fontSize='inherit' />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default withMidiSounds(Tuning);
