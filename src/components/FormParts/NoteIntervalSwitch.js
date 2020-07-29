import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
  },
  flatSwitch: {
    fontSize: "0.9em",
    display: "inline-block",
    marginLeft: 16,
    marginRight: 8,
    marginBottom: 8,
    marginTop: 0,
    minWidth: 120,
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
