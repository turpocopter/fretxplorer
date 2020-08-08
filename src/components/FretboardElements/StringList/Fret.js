import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fret: {
    display: "flex",
    position: "relative",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "content-box",
    backgroundColor: (props) =>
      props.position > 0 ? "#5f4035" : "transparent",
    backgroundImage: (props) => {
      if (
        props.position > 0 &&
        (props.stringId === 1 || props.stringId === 6)
      ) {
        return `linear-gradient(${
          (props.isLeftHanded ? props.stringId === 1 : props.stringId === 6)
            ? 90
            : -90
        }deg, rgba(0,0,0,0.05), transparent)`;
      }
      return null;
    },
    height: (props) =>
      props.position === 0 ? "2.5em" : `${6 * 0.9438 ** props.position}em`,
    minHeight: "2.35em",
    "&::before": {
      content: (props) => props.position === 0 && `''`,
      position: "absolute",
      backgroundColor: "#c0ac87",
      height: "calc(1.5em - 1px)",
      bottom: 0,
      left: 0,
      width: "100%",
      backgroundImage: (props) =>
        props.stringId === 1 || props.stringId === 6
          ? `linear-gradient(${
              (props.isLeftHanded ? props.stringId === 1 : props.stringId === 6)
                ? 90
                : -90
            }deg, #9d8c64 0%,#c0ac87 50%)`
          : null,
      borderBottom: "1px solid #917f5f",
      "@media (orientation: landscape)": {
        width: "calc(1.5em - 1px)",
        height: "100%",
        left: (props) => (props.isLeftHanded ? 0 : "auto"),
        right: (props) => (props.isLeftHanded ? "auto" : 0),
        borderBottom: "none",
        borderRight: (props) =>
          props.isLeftHanded ? "none" : "1px solid #917f5f",
        borderLeft: (props) =>
          props.isLeftHanded ? "1px solid #917f5f" : "none",
        backgroundImage: (props) =>
          props.stringId === 1 || props.stringId === 6
            ? `linear-gradient(${
                props.stringId === 1 ? 180 : 0
              }deg, #9d8c64 0%,#c0ac87 50%)`
            : null,
      },
    },
    "@media (orientation: landscape)": {
      flexFlow: "row nowrap",
      height: "auto!important",
      minHeight: "auto!important",
      backgroundImage: (props) => {
        if (
          props.position > 0 &&
          (props.stringId === 1 || props.stringId === 6)
        ) {
          return `linear-gradient(${
            props.stringId === 1 ? 180 : 0
          }deg, rgba(0,0,0,0.05), transparent)`;
        }
        return null;
      },
      width: (props) =>
        props.position === 0 ? "2.5em" : `${6 * 0.9438 ** props.position}em`,
      minWidth: "2.35em",
    },
  },
  fretInner: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    width: "2.2em",
    height: "2.2em",
    lineHeight: "2.2em",
    borderRadius: "50%",
    fontSize: "0.9em",
    fontWeight: 500,
    zIndex: 2,
    cursor: "pointer",
    border: `2px solid ${theme.palette.secondary.main}`,
    "&$active": {
      backgroundColor: "white",
      color: theme.palette.secondary.main,
    },
    "&$isRoot": {
      backgroundColor: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      "&$active": {
        backgroundColor: "white",
        color: theme.palette.primary.main,
      },
    },
    "@media (orientation: landscape)": {},
  },
  isRoot: {},
  active: {},
  fretDelimiter: {
    content: `""`,
    display: "block",
    width: "100%",
    height: "0.25em",
    background: (props) => {
      switch (props.isLeftHanded ? props.stringId : 7 - props.stringId) {
        case 1:
          return "linear-gradient(-90deg, transparent 0%, transparent 70%, rgb(90, 90, 90) 100%), linear-gradient(0deg, rgb(140, 140, 140) 0%, white 35%, white 65%, rgb(140, 140, 140) 100%)";
        case 6:
          return "linear-gradient(90deg, transparent 0%, transparent 70%, rgb(90, 90, 90) 100%), linear-gradient(0deg, rgb(140, 140, 140) 0%, white 35%, white 65%, rgb(140, 140, 140) 100%)";
        default:
          return "linear-gradient(0deg, rgb(140, 140, 140) 0%, white 35%, white 65%, rgb(140, 140, 140) 100%)";
      }
    },
    "&:last-child": {
      display: "none",
    },
    "@media (orientation: landscape)": {
      width: "0.25em",
      height: "100%",

      background: (props) => {
        switch (props.stringId) {
          case 6:
            return "linear-gradient(180deg, transparent 0%, transparent 70%, rgb(90, 90, 90) 100%), linear-gradient(90deg, rgb(140, 140, 140) 0%, white 35%, white 65%, rgb(140, 140, 140) 100%)";
          case 1:
            return "linear-gradient(0deg, transparent 0%, transparent 70%, rgb(90, 90, 90) 100%), linear-gradient(90deg, rgb(140, 140, 140) 0%, white 35%, white 65%, rgb(140, 140, 140) 100%)";
          default:
            return "linear-gradient(90deg, rgb(140, 140, 140) 0%, white 35%, white 65%, rgb(140, 140, 140) 100%)";
        }
      },
    },
  },
}));

export default function Fret(props) {
  const { display, isRoot, note, octave, playNote } = props;
  const [isActive, setIsActive] = useState(false);
  const classes = useStyles(props);

  const onPlay = (note, octave) => {
    if (!isActive) {
      setIsActive(true);
      playNote(note, octave);
      setTimeout(() => {
        setIsActive(false);
      }, 1000);
    }
  };
  const fretClasses = [classes.fretInner];
  if (isRoot) fretClasses.push(classes.isRoot);
  if (isActive) fretClasses.push(classes.active);
  const content = display && (
    <div className={fretClasses.join(" ")} onClick={() => onPlay(note, octave)}>
      {display}
    </div>
  );
  return (
    <>
      <div className={classes.fret}>{content}</div>
      {props.position > 0 && <div className={classes.fretDelimiter} />}
    </>
  );
}
