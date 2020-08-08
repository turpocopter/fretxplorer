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
      zIndex: 1,
      order: 1,
      width: "2.4em",
      color: theme.palette.gray.main,
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
      },
      "&$active": {
        color: theme.palette.secondary.main,
      },
      "&::before": {
        content: (props) => props.isLinked && `''`,
        display: (props) => (props.isLinked ? "block" : "none"),
        position: "absolute",
        width: 1,
        height: "2.8rem",
        backgroundColor: theme.palette.gray.light,
        top: 0,
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
      display: "block",
      color: theme.palette.gray.dark,
      border: "none",
      margin: 0,
      padding: 0,
      background: "transparent",
      outline: "none",
      "&:disabled": {
        color: theme.palette.gray.light,
      },
    },
    open: {},
    active: {},
  };
});

const Peg = ({
  tuning,
  useFlats,
  getNoteName,
  onClickPeg,
  isActive,
  isOpen,
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
  if (isOpen) pegClasses.push(classes.open);
  if (isActive) pegClasses.push(classes.active);
  return (
    <div className={pegClasses.join(" ")}>
      {isOpen && !isLinked && (
        <button
          className={classes.tuneBtn}
          onClick={() => tuneDown(stringId)}
          disabled={tuneDownDisabled}
        >
          <RemoveCircleIcon />
        </button>
      )}
      <div onClick={onClickPeg}>{getNoteName(tuning.n, useFlats)}</div>
      {isOpen && !isLinked && (
        <button
          className={classes.tuneBtn}
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
