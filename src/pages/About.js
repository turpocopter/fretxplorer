import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      margin: theme.spacing(6, 0),
      padding: theme.spacing(0, 2),
      display: "flex",
      flexFlow: "column nowrap",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.up("sm")]: {
        minHeight: "calc(100vh - 294px)",
      },
      [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
        margin: "0 0 2em",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    paperInner: {
      maxWidth: "26em",
      textAlign: "justify",
    },
    title: {
      marginBottom: theme.spacing(6),
      [`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
        marginBottom: theme.spacing(2),
      },
    },
    aboutApp: {
      fontSize: "1.1em",
    },
  };
});

const About = () => {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <div className={classes.paperInner}>
        <Typography
          className={classes.title}
          variant='h5'
          component='h2'
          align='center'
        >
          About
        </Typography>
        <p className={classes.aboutApp}>
          FretXplorer is a web app allowing you to locate guitar chords and
          scales in any tuning.
          <br />
          It was designed to be especially useful for open/alternate-tuning
          enthusiasts.
        </p>
        <p className={classes.aboutMe}>
          I'm Remy, a freelance web developer from France, and FretXplorer was
          the first proper project I built with React. The source code is
          available on{" "}
          <a
            href='https://github.com/turpocopter/fretxplorer/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
          .<br />
          Feel free to add me on{" "}
          <a
            href='https://www.linkedin.com/in/r%C3%A9my-turpault-14554939/'
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </a>
          , and please consider hiring me for your projects! <br />
          Also, feedback and feature requests are very welcome through either of
          these channels.
        </p>
      </div>
    </div>
  );
};

export default About;
