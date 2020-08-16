import React, { useState, useEffect } from "react";
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
//import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => {
  let tuningTablet = { margin: "12px auto" };
  let tuneBtnWrapperTablet;
  return {
    tuning: {
      position: "relative",
      borderColor: "transparent",
      borderStyle: "solid",
      borderWidth: 3,
      borderRadius: 10,
      margin: "0 auto",
      width: "18.8em",
      transition: "all 0.5s",
      "&$active": {
        borderColor: theme.palette.gray.light,
        paddingBottom: "0.6em",
        [`${theme.breakpoints.up(
          "sm"
        )} and (orientation: portrait)`]: tuningTablet,
        [`${theme.breakpoints.up(
          "md"
        )} and (orientation: landscape)`]: tuningTablet,
      },
      [theme.breakpoints.up("sm")]: tuningTablet,
      "@media (orientation: landscape)": {
        width: (props) => (!props.alwaysOpen ? "auto" : "18.8em"),
        paddingLeft: (props) => (!props.alwaysOpen ? 16 : 0),
        paddingRight: (props) => (!props.alwaysOpen ? 16 : 0),
        display: (props) => !props.alwaysOpen && "flex",
        margin: (props) => !props.alwaysOpen && "3.3em 0 0",
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
      /*display: "inline-flex",
      order: (props) => (props.isLeftHanded && !props.doNotFlipOver ? 10 : 0),
      "@media (orientation: landscape)": {
        order: (props) => (!props.alwaysOpen ? 10 : 0),
      },*/
      position: "absolute",
      left: "-1em",
      width: "1.7em",
      height: "1.7em",
      zIndex: 1,
      transition: "opacity 0.2s",
      "@media (orientation: landscape)": {
        top: "-1em",
        left: 0,
        right: 0,
        margin: "auto",
      },
    },
    fork: {
      height: "1.7em",
    },
    settings: {
      position: "absolute",
      zIndex: 1,
      fontSize: "1.2em",
      right: "-0.75em",
      width: "1.4em",
      height: "1.4em",
      border: "2px solid black",
      borderRadius: "50%",
      display: "inline-block",
      transition: "opacity 0.2s",
      "@media (orientation: landscape)": {
        display: (props) => (!props.isAlwaysOpen ? "none" : "inline-block"),
      },
    },
    playBtn: {
      display: "inline-flex",
      fontSize: 29,
    },
    discard: {
      position: "absolute",
      top: "-1.05rem",
      right: "-0.95rem",
      fontSize: "1.7rem",
      zIndex: 0,
      transition: "opacity 0.3s",
      "&::before": {
        content: `''`,
        position: "absolute",
        display: "block",
        top: "0.5rem",
        left: "0.4rem",
        width: "0.9rem",
        height: "1rem",
        backgroundColor: theme.palette.background.main,
        zIndex: -1,
        borderRadius: "50%",
      },
    },
    linkStrings: {
      position: "absolute",
      zIndex: 0,
      textAlign: "center",
      bottom: "1.9rem",
      right: "-0.5rem",
      width: "1rem",
      fontSize: "1.1rem",
      transition: "opacity 0.3s",
      "&::before": {
        content: `''`,
        position: "absolute",
        display: "block",
        backgroundColor: theme.palette.background.main,
        zIndex: -1,
        borderRadius: "50%",
        border: "2.4px solid black",
        top: "-0.1rem",
        left: "-0.17rem",
        width: "1.45rem",
        height: "1.45rem",
      },
      "&$active": {
        color: theme.palette.secondary.main,
        "&::before": {
          borderColor: theme.palette.secondary.main,
        },
      },
    },
    playBtnOpen: {
      position: "absolute",
      zIndex: 0,
      textAlign: "center",
      bottom: "1.9rem",
      left: "-0.5rem",
      width: "1rem",
      fontSize: "1.1rem",
      transition: "opacity 0.3s",
      "&::before": {
        content: `''`,
        position: "absolute",
        display: "block",
        backgroundColor: theme.palette.background.main,
        zIndex: -1,
        borderRadius: "50%",
        border: "2.4px solid black",
        top: "-0.1rem",
        left: "-0.2rem",
        width: "1.45rem",
        height: "1.45rem",
      },
      "&$active": {
        color: theme.palette.secondary.main,
        "&::before": {
          borderColor: theme.palette.secondary.main,
        },
      },
    },
    tuneBtnWrapper: {
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      zIndex: 10,
      "&::before": {
        content: `''`,
        position: "absolute",
        top: "0.9em",
        zIndex: -1,
        height: 1,
        width: "12.1em",
        backgroundColor: theme.palette.gray.light,
      },
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: portrait)`]: (tuneBtnWrapperTablet = {
        "&::before": {},
      }),
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: landscape)`]: tuneBtnWrapperTablet,
    },
    tuneBtnDownWrapper: {
      top: "4.3em",
    },
    tuneBtnUpWrapper: {
      bottom: "0.4em",
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
    hidden: {
      opacity: 0,
    },
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
  const preset = useSelector((state) => state.settings.tuningPreset);
  const useFlats = useSelector((state) => state.settings.useFlats);
  const noteNaming = useSelector((state) => state.settings.noteNaming);
  const isLeftHanded = useSelector((state) => state.settings.leftHanded);
  const { getNoteName } = useNoteNames(noteNaming);
  const [isOpen, setIsOpen] = useState(alwaysOpen);
  const [activePeg, setActivePeg] = useState(null);
  //const [preset, setPreset] = useState("");
  const [isLinked, setIsLinked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const classes = useStyles({
    doNotFlipOver,
    isLeftHanded,
    alwaysOpen,
  });

  let intervalID = null;

  useEffect(() => {
    window.addEventListener("orientationchange", (event) => {
      if (!alwaysOpen) {
        setIsOpen(false);
      }
    });
  }, [alwaysOpen]);

  const onTuneUpString = (stringId) => {
    return dispatch(actions.tuneUpString(stringId));
  };
  const onTuneDownString = (stringId) => {
    return dispatch(actions.tuneDownString(stringId));
  };
  const onTuneUpAll = () => {
    return dispatch(actions.tuneUpAll());
  };
  const onTuneDownAll = () => {
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
        null,
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
    //setPreset(id);
    return dispatch(actions.setTuningPreset(tuning, id));
  };
  const isGlobalTuningEnabled = (isDown = false) =>
    tuning.every((el) =>
      isDown
        ? el.reference - getNoteVal(el.note, el.octave) < 9
        : getNoteVal(el.note, el.octave) - el.reference < 9
    );
  const onOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
    setTimeout(() => {
      setIsOpening(false);
    }, 300);
  };
  const onClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
    setTimeout(() => {
      setIsClosing(false);
      setIsLinked(false);
    }, 400);
  };
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
      isOpening={isOpening}
      isClosing={isClosing}
      onClickPeg={() => onClickPeg(el.stringId, el.note, el.octave)}
      isOpen={isOpen || isOpening}
      alwaysOpen={alwaysOpen}
      tuneUp={onTuneUpString}
      tuneDown={onTuneDownString}
      tuneUpDisabled={getNoteVal(el.note, el.octave) - el.reference === 9}
      tuneDownDisabled={el.reference - getNoteVal(el.note, el.octave) === 9}
    />
  ));
  const wrapperClasses = [classes.tuning];
  const pegsClasses = [classes.pegs];
  const discardClasses = [classes.discard];
  const playBtnClasses = [classes.playBtnOpen];
  const linkStringsClasses = [classes.linkStrings];
  const settingClasses = [classes.settings];
  const forkClasses = [classes.forkWrapper];
  if (isOpen || isOpening) {
    wrapperClasses.push(classes.active);
    pegsClasses.push(classes.active);
  }
  if (isPlaying) {
    playBtnClasses.push(classes.active);
  }
  if (isLinked) {
    linkStringsClasses.push(classes.active);
  }
  if (isOpening || isClosing) {
    settingClasses.push(classes.hidden);
    forkClasses.push(classes.hidden);
    discardClasses.push(classes.hidden);
    playBtnClasses.push(classes.hidden);
    linkStringsClasses.push(classes.hidden);
  }
  return (
    <>
      <div className={wrapperClasses.join(" ")}>
        {isOpen && (
          <Presets
            preset={preset}
            isOpening={isOpening}
            isClosing={isClosing}
            selectPreset={onSelectPreset}
          />
        )}

        <div className={pegsClasses.join(" ")}>
          {!isOpen && (
            <div className={forkClasses.join(" ")} onClick={onClickPlay}>
              <img className={classes.fork} src={fork} alt='Tuning' />
            </div>
          )}
          {isOpen && isLinked && (
            <div
              className={`${classes.tuneBtnWrapper} ${classes.tuneBtnDownWrapper}`}
            >
              <button
                className={classes.tuneBtn}
                onClick={onTuneDownAll}
                disabled={!isGlobalTuningEnabled(true)}
              >
                <RemoveCircleIcon />
              </button>
            </div>
          )}
          {pegList}
          {isOpen && isLinked && (
            <div
              className={`${classes.tuneBtnWrapper} ${classes.tuneBtnUpWrapper}`}
            >
              <button
                className={classes.tuneBtn}
                onClick={onTuneUpAll}
                disabled={!isGlobalTuningEnabled()}
              >
                <AddCircleIcon />
              </button>
            </div>
          )}
          {!isOpen && (
            <div className={settingClasses.join(" ")} onClick={onOpen}>
              <SettingsIcon fontSize='inherit' />
            </div>
          )}
        </div>

        {isOpen && !alwaysOpen && (
          <div className={discardClasses.join(" ")} onClick={onClose}>
            <CancelIcon fontSize='inherit' />
          </div>
        )}

        {isOpen && (
          <>
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
    </>
  );
};

export default withMidiSounds(Tuning);
