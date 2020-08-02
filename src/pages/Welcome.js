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
    },
    logo: {
      width: "100%",
      "& img": {
        width: "100%",
      },
    },
    buttons: {
      textAlign: "center",
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(16),
    },
    buttonWrapper: {
      margin: theme.spacing(2),
    },
    separator: {
      marginTop: theme.spacing(4),
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
