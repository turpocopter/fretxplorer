import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: "5em",
      color: theme.palette.gray.main,
      fontSize: "2em",
      textAlign: "center",
    },
  };
});

const About = () => {
  const classes = useStyles();
  return <div className={classes.root}>Coming soon...</div>;
};

export default About;
