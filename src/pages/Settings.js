import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import Tuning from "containers/Tuning";
import Switch from "@material-ui/core/Switch";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      margin: theme.spacing(6, 0),
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "stretch",
      [theme.breakpoints.up("sm")]: {
        minHeight: "calc(100vh - 294px)",
        justifyContent: "center",
      },
      [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
        margin: 0,
      },
    },
    title: {
      marginBottom: theme.spacing(6),
      [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
        marginBottom: theme.spacing(2),
      },
    },
    switchContainer: {
      width: "100%",
      marginBottom: theme.spacing(4),
      [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
        marginBottom: theme.spacing(1),
      },
    },
    flatSwitch: {
      fontSize: "0.9em",
      display: "block",
      textAlign: "center",
      marginTop: 0,
      minWidth: 120,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    switchLabel: {
      display: "inline-block",
      width: "38%",
      "&:first-child": {
        textAlign: "right",
      },
      "&:last-child": {
        textAlign: "left",
      },
      "& small": {
        color: theme.palette.gray.main,
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.1em",
      },
    },
    tuningContainer: {
      marginTop: theme.spacing(2),
    },
    active: {},
  };
});

const Settings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLatin = useSelector((state) => state.settings.noteNaming === "latin");
  const leftHanded = useSelector((state) => state.settings.leftHanded);
  console.log("this is LH in settings", leftHanded);
  console.log("typeof LH", typeof leftHanded);

  const onToggleHands = () => {
    return dispatch(actions.toggleHands());
  };
  const onToggleNamingConvention = () => {
    return dispatch(
      actions.updateNamingConvention(isLatin ? "letters" : "latin")
    );
  };

  return (
    <div className={classes.paper}>
      <div className={classes.paperInner}>
        <Typography
          className={classes.title}
          variant='h5'
          component='h2'
          align='center'
        >
          Settings
        </Typography>
        <div className={classes.switchContainer}>
          <label className={classes.flatSwitch}>
            <span className={classes.switchLabel}>
              Latin <small>(Do, Re, Mi...)</small>
            </span>
            <Switch
              checked={!isLatin}
              onChange={onToggleNamingConvention}
              color='default'
            />
            <span className={classes.switchLabel}>
              Letters <small>(C, D, E...)</small>
            </span>
          </label>
        </div>
        <div className={classes.switchContainer}>
          <label className={classes.flatSwitch}>
            <span className={classes.switchLabel}>Left-handed</span>
            <Switch
              checked={leftHanded === false}
              onChange={onToggleHands}
              color='default'
            />
            <span className={classes.switchLabel}>Right-handed</span>
          </label>
        </div>
        <div className={classes.tuningContainer}>
          <Tuning alwaysOpen={true} doNotFlipOver={true} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
