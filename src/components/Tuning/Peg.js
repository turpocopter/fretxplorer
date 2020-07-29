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
  stringId,
  tuneUp,
  tuneDown,
  tuneUpDisabled,
  tuneDownDisabled,
}) => {
  const classes = useStyles();

  const pegClasses = [classes.peg];
  if (isOpen) pegClasses.push(classes.open);
  if (isActive) pegClasses.push(classes.active);
  return (
    <div className={pegClasses.join(" ")}>
      {isOpen && (
        <button
          className={classes.tuneBtn}
          onClick={() => tuneDown(stringId)}
          disabled={tuneDownDisabled}
        >
          <RemoveCircleIcon />
        </button>
      )}
      <div onClick={onClickPeg}>{getNoteName(tuning.n, useFlats)}</div>
      {isOpen && (
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
