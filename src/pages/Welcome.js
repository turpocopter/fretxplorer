import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import logo from "assets/logo.png";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    screen: {
      height: "100vh",
      /*background: theme.palette.primary.main,*/
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
      "@media (orientation: landscape)": {
        flexFlow: "row nowrap",
        justifyContent: "space-between",
      },
    },
    logo: {
      width: "100%",
      "& img": {
        width: "100%",
      },
      "@media (orientation: landscape)": {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        width: "45%",
        maxWidth: 500,
      },
    },
    buttons: {
      textAlign: "center",
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(16),
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        paddingTop: theme.spacing(16),
        paddingBottom: theme.spacing(32),
      },
      "@media (orientation: landscape)": {
        flexGrow: 1,
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    buttonWrapper: {
      margin: theme.spacing(1),
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        margin: theme.spacing(2),
      },
    },
    button: {
      minWidth: "15em",
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        fontSize: "1.2em",
      },
    },
    separator: {
      marginTop: theme.spacing(3),
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        marginTop: theme.spacing(8),
      },
    },
  };
});

const Welcome = () => {
  const classes = useStyles();
  return (
    <div className={classes.screen}>
      <div className={classes.logo}>
        <img src={logo} alt='FretXplorer' />
      </div>
      <div className={classes.buttons}>
        <div className={classes.buttonWrapper}>
          <Button
            className={classes.button}
            variant='contained'
            size='large'
            color='primary'
            component={NavLink}
            to='/chordpicker'
            exact
          >
            Pick a Chord
          </Button>
        </div>
        <div className={classes.buttonWrapper}>
          <Button
            className={classes.button}
            variant='contained'
            size='large'
            color='primary'
            component={NavLink}
            to='/scalepicker'
            exact
          >
            Pick a Scale
          </Button>
        </div>
        <div className={`${classes.buttonWrapper} ${classes.separator}`}>
          <Button
            className={classes.button}
            variant='contained'
            size='large'
            component={NavLink}
            to='/settings'
            exact
          >
            Settings & Tuning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
