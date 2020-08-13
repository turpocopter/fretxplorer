import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      marginTop: "0.8em",
    },
  },
  flatSwitch: {
    fontSize: "0.9em",
    display: "inline-block",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 8,
    marginTop: 0,
    minWidth: 120,
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      fontSize: "1em",
    },
    "@media (orientation: landscape)": {
      marginLeft: 8,
    },
    "@media (min-height: 768px) and (orientation: landscape)": {
      fontSize: "1em",
    },
  },
}));

const NoteIntervalSwitch = ({ showIntervals, toggleNotesIntervals }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <label className={classes.flatSwitch}>
        <span>Show notes</span>
        <Switch
          checked={showIntervals}
          onChange={toggleNotesIntervals}
          color='default'
        />
        <span>Show intervals</span>
      </label>
    </div>
  );
};

export default NoteIntervalSwitch;
