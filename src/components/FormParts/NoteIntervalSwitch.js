import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      marginTop: "8px",
    },
    "@media (orientation: landscape)": {
      position: "absolute",
      top: 0,
      left: (props) => (props.isLeftHanded ? 16 : "auto"),
      right: (props) => (props.isLeftHanded ? "auto" : 16),
    },
    /*"@media (max-width: 800px) and (orientation: landscape)": {
      marginTop: 0,
    },*/
  },
  flatSwitch: {
    fontSize: "0.9em",
    display: "inline-block",
    marginLeft: 16,
    marginRight: 8,
    marginBottom: 8,
    marginTop: 0,
    minWidth: 120,
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      fontSize: "1em",
    },
    "@media (min-height: 768px) and (orientation: landscape)": {
      fontSize: "1em",
    },
  },
}));

const NoteIntervalSwitch = ({
  showIntervals,
  toggleNotesIntervals,
  isLeftHanded,
}) => {
  const classes = useStyles({ isLeftHanded });

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
