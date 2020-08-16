import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  //let pegTablet;
  return {
    peg: {
      display: "flex",
      flexFlow: "column nowrap",
      position: "relative",
      alignItems: "center",
      zIndex: 1,
      order: 1,
      width: "2.4em",
      color: theme.palette.gray.main,
      transition: "all 0.2s",
      "@media (orientation: landscape)": {
        height: (props) => (!props.alwaysOpen ? "2.4em" : "auto"),
        flexFlow: (props) =>
          !props.alwaysOpen ? "row nowrap" : "column nowrap",
        justifyContent: "center",
        alignItems: "center",
      },
      "&$open": {
        color: theme.palette.gray.dark,
        fontWeight: 500,
        padding: "6.25em 0 1.95em",
      },
      "&$active": {
        color: theme.palette.secondary.main,
      },
      "&::before": {
        content: (props) => props.isLinked && `''`,
        display: (props) => (props.isLinked ? "block" : "none"),
        position: "absolute",
        width: 1,
        height: "3.6em",
        backgroundColor: theme.palette.gray.light,
        top: "4.5em",
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        zIndex: -1,
      },
      "& div": {
        backgroundColor: theme.palette.background.main,
      },
      /*[`${theme.breakpoints.up(
        "sm"
      )} and (orientation: portrait)`]: (pegTablet = {
        "&::before": {
          height: 64,
        },
      }),
      [`${theme.breakpoints.up("md")} and (orientation: landscape)`]: pegTablet,*/
    },
    tuneBtn: {
      position: "absolute",
      left: 0,
      right: 0,
      width: "100%",
      display: "block",
      color: theme.palette.gray.dark,
      border: "none",
      margin: "0 auto",
      padding: 0,
      background: "transparent",
      outline: "none",
      fontSize: "inherit",
      transition: "opacity 0.3s",
      "&:disabled": {
        color: theme.palette.gray.light,
      },
      "& svg": {
        display: "block",
        margin: "auto",
      },
    },
    tuneDownBtn: { top: "4.3em" },
    tuneUpBtn: { bottom: 0 },
    open: {},
    active: {},
    hidden: {
      opacity: 0,
    },
  };
});

const Peg = ({
  tuning,
  useFlats,
  getNoteName,
  onClickPeg,
  isActive,
  isOpen,
  isOpening,
  isClosing,
  alwaysOpen,
  isLinked,
  stringId,
  tuneUp,
  tuneDown,
  tuneUpDisabled,
  tuneDownDisabled,
}) => {
  const classes = useStyles({ isLinked, alwaysOpen });

  const pegClasses = [classes.peg];
  const tuneUpClasses = [classes.tuneBtn, classes.tuneUpBtn];
  const tuneDownClasses = [classes.tuneBtn, classes.tuneDownBtn];
  if (isOpen) pegClasses.push(classes.open);
  if (isActive) pegClasses.push(classes.active);
  if (isOpening || isClosing) {
    tuneUpClasses.push(classes.hidden);
    tuneDownClasses.push(classes.hidden);
  }
  return (
    <div className={pegClasses.join(" ")}>
      {isOpen && !isLinked && (
        <button
          className={tuneDownClasses.join(" ")}
          onClick={() => tuneDown(stringId)}
          disabled={tuneDownDisabled}
        >
          <RemoveCircleIcon />
        </button>
      )}
      <div onClick={onClickPeg}>{getNoteName(tuning.n, useFlats)}</div>
      {isOpen && !isLinked && (
        <button
          className={tuneUpClasses.join(" ")}
          onClick={() => tuneUp(stringId)}
          disabled={tuneUpDisabled}
        >
          <AddCircleIcon />
        </button>
      )}
    </div>
  );
};

export default Peg;
