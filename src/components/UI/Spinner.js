import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  parent: {
    background: theme.palette.background.main,
    height: "100vh",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
  },
  loader: {
    color: theme.palette.primary.main,
    fontSize: 11,
    textIndent: "-99999em",
    margin: "55px auto",
    position: "relative",
    width: "10em",
    height: "10em",
    boxShadow: "inset 0 0 0 1em",
    transform: "translateZ(0)",
    borderRadius: "50%",
    "&::before": {
      content: `""`,
      position: "absolute",
      width: "5.2em",
      height: "10.2em",
      background: theme.palette.background.main,
      borderRadius: "10.2em 0 0 10.2em",
      top: "-0.1em",
      left: "-0.1em",
      transformOrigin: "5.1em 5.1em",
      animation: "load2 2s infinite ease 1.5s",
    },
    "&::after": {
      content: `""`,
      position: "absolute",
      width: "5.2em",
      height: "10.2em",
      background: theme.palette.background.main,
      borderRadius: "0 10.2em 10.2em 0",
      top: "-0.1em",
      left: "4.9em",
      transformOrigin: "0.1em 5.1em",
      animation: "$load2 2s infinite ease",
    },
  },
  "@keyframes load2": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.parent}>
      <div className={classes.loader}>Loading...</div>
    </div>
  );
};

export default Spinner;
