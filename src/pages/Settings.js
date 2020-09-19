import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import Tuning from "containers/Tuning";
import Switch from "@material-ui/core/Switch";
import { Typography } from "@material-ui/core";

const Settings = () => {
  const dispatch = useDispatch();
  const isLatin = useSelector((state) => state.settings.noteNaming === "latin");
  const leftHanded = useSelector((state) => state.settings.leftHanded);

  const onToggleHands = () => {
    return dispatch(actions.toggleHands());
  };
  const onToggleNamingConvention = () => {
    return dispatch(
      actions.updateNamingConvention(isLatin ? "letters" : "latin")
    );
  };

  return (
    <div className='settingsPage'>
      <div className='paperInner'>
        <Typography
          className='title'
          variant='h5'
          component='h2'
          align='center'
        >
          Settings
        </Typography>
        <div className='switchContainer'>
          <label className='flatSwitch'>
            <span className='switchLabel'>
              Latin <small>(Do, Re, Mi...)</small>
            </span>
            <Switch
              checked={!isLatin}
              onChange={onToggleNamingConvention}
              color='default'
            />
            <span className='switchLabel'>
              Letters <small>(C, D, E...)</small>
            </span>
          </label>
        </div>
        <div className='switchContainer'>
          <label className='flatSwitch'>
            <span className='switchLabel'>Left-handed</span>
            <Switch
              checked={leftHanded === false}
              onChange={onToggleHands}
              color='default'
            />
            <span className='switchLabel'>Right-handed</span>
          </label>
        </div>
        <div className='tuningContainer'>
          <Tuning alwaysOpen={true} doNotFlipOver={true} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
