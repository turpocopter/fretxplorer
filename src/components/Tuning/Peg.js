import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  peg: {
    display: "flex",
    flexFlow: "column nowrap",
    position: "relative",
    zIndex: 1,
    width: "2.6em",
    color: "#999",
    "&$open": {
      color: "#222",
      fontWeight: 500,
    },
    "&$active": {
      color: theme.palette.secondary.main,
    },
    "&::before": {
      content: (isLinked) => isLinked && `''`,
      display: "block",
      position: "absolute",
      width: 1,
      height: 47,
      backgroundColor: "#ccc",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
      zIndex: -1,
    },
    "& div": {
      backgroundColor: "#f8f7f9",
    },
  },
  tuneBtn: {
    display: "block",
    color: "#222",
    border: "none",
    margin: 0,
    padding: 0,
    background: "transparent",
    outline: "none",
    "&:disabled": {
      color: "#ccc",
    },
  },
  open: {},
  active: {},
}));

const Peg = ({
  tuning,
  useFlats,
  getNoteName,
  onClickPeg,
  isActive,
  isOpen,
  isLinked,
  stringId,
  tuneUp,
  tuneDown,
  tuneUpDisabled,
  tuneDownDisabled,
}) => {
  const classes = useStyles(isLinked);

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
