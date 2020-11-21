import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "components/UI/Spinner";

import logo from "assets/logo.svg";
import logoLayer1 from "assets/logo-layer1.svg";
import logoLayer2 from "assets/logo-layer2.svg";
import logoLayer3 from "assets/logo-layer3.svg";
import logoLayer4 from "assets/logo-layer4.svg";
import logoLayer5 from "assets/logo-layer5.svg";
import { Button, Fade } from "@material-ui/core";

const Welcome = () => {
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
    setTimeout(() => setIsLoading(false), 10);
  }, []);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fade in={!isLoading} timeout={300}>
          <div className='landingPage'>
            <div className='logo'>
              <div className='logoInner'>
                <div
                  className='logoLayerOne'
                  style={{ backgroundImage: `url(${logoLayer1})` }}
                />
                <img className='logoLayerTwo' src={logoLayer2} alt='' />
                {!isLoading && (
                  <div
                    className='logoLayerTwoCache'
                    style={{ backgroundImage: `url(${logoLayer1})` }}
                  />
                )}
                <img className='logoLayerThree' src={logoLayer3} alt='' />
                <img className='logoLayerFour' src={logoLayer4} alt='' />
                <img className='logoLayerFive' src={logoLayer5} alt='' />
              </div>
            </div>
            <div className='buttons'>
              <div className='buttonWrapper'>
                <Button
                  className='button'
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
              <div className='buttonWrapper'>
                <Button
                  className='button'
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
              <div className='buttonWrapper separator'>
                <Button
                  className='button'
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
      )}
    </>
  );
};

export default Welcome;
