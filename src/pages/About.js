import React from "react";
import { Typography } from "@material-ui/core";

const About = () => {
  return (
    <div className='aboutPage'>
      <div className='paperInner'>
        <Typography
          className='title'
          variant='h5'
          component='h2'
          align='center'
        >
          About
        </Typography>
        <p className='aboutApp'>
          FretXplorer is a web app allowing you to locate guitar chords and
          scales in any tuning.
          <br />
          It was designed to be especially useful for open/alternate-tuning
          enthusiasts.
        </p>
        <p className='aboutMe'>
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
