import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "components/UI/Spinner";

import logo from "assets/logo.svg";
import logoLayer1 from "assets/logo-layer1.svg";
import logoLayer2 from "assets/logo-layer2.svg";
import logoLayer3 from "assets/logo-layer3.svg";
import logoLayer4 from "assets/logo-layer4.svg";
import logoLayer5 from "assets/logo-layer5.svg";
import { Button, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    screen: {
      height: "100vh",
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
      "@media (orientation: portrait)": {
        height: 0,
        paddingBottom: "38%",
        position: "relative",
      },
    },
    logoInner: {
      position: "relative",
    },
    logoLayerTwo: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    logoLayerTwoCache: {
      top: "51.9%",
      left: "34%",
      width: "7%",
      height: 0,
      position: "absolute",
      transform: "rotate(78.1deg) scaleY(0)",
      paddingBottom: "42%",
      backgroundColor: "#c4c4c4",
      transformOrigin: "top center",
      animation: "$shrinkCache 2s forwards ease-out 0.6s",
    },
    logoLayerThree: {
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0,
      animation: "$showElement 1s forwards ease-out 0.5s",
    },
    logoLayerFour: {
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0,
      animation: "$showElement 0.2s forwards ease-out 2.6s",
    },
    logoLayerFive: {
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0,
      animation:
        "$showElement 0.5s forwards ease-out 2.8s, $bounce 0.5s 2 forwards ease 2.8s",
    },
    buttons: {
      textAlign: "center",
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(16),
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
      opacity: 0,
      animation: "$showButtons 0.5s forwards ease-out 0.5s",
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
      [`${theme.breakpoints.up("md")} and (orientation: landscape)`]: {
        margin: "0.2em",
        minWidth: "15em",
        fontSize: "1.2em",
      },
    },
    separator: {
      marginTop: theme.spacing(3),
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        marginTop: theme.spacing(8),
      },
    },
    "@keyframes shrinkCache": {
      "0%": {
        transform: "rotate(78.1deg) scaleY(1)",
      },
      "100%": {
        transform: "rotate(78.1deg) scaleY(0)",
      },
    },
    "@keyframes showElement": {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
    "@keyframes bounce": {
      "0%": {
        transform: "translateY(0)",
      },
      "30%": {
        transform: "translateY(-3%)",
      },
      "50%": {
        transform: "translateY(0)",
      },
      "100%": {
        transform: "translateY(0)",
      },
    },
    "@keyframes showButtons": {
      "0%": {
        opacity: 0,
        transform: "translateY(-1em)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  };
});

const Welcome = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const srcArray = [
      logo,
      logoLayer1,
      logoLayer2,
      logoLayer3,
      logoLayer4,
      logoLayer5,
    ];
    srcArray.forEach((src) => {
      new Promise(function (resolve, reject) {
        const img = new Image();
        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading && <Spinner />}
      <Fade in={!isLoading} timeout={300}>
        <div className={classes.screen}>
          <div className={classes.logo}>
            <div className={classes.logoInner}>
              <img
                className={classes.logoLayerOne}
                src={logoLayer1}
                alt='FretXplorer'
              />
              <img className={classes.logoLayerTwo} src={logoLayer2} alt='' />
              <div className={classes.logoLayerTwoCache} />
              <img className={classes.logoLayerThree} src={logoLayer3} alt='' />
              <img className={classes.logoLayerFour} src={logoLayer4} alt='' />
              <img className={classes.logoLayerFive} src={logoLayer5} alt='' />
            </div>
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
      </Fade>
    </>
  );
};

export default Welcome;
