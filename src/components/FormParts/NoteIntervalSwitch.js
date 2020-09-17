import React from "react";

import Switch from "@material-ui/core/Switch";

const NoteIntervalSwitch = ({ showIntervals, toggleNotesIntervals }) => {
  return (
    <div className='noteIntervalSwitch'>
      <label className='noteIntervalSwitchLabel'>
        <span>Show notes</span>
        <Switch
          checked={showIntervals}
          onChange={toggleNotesIntervals}
          color='default'
        />
        <span>Show intervals</span>
      </label>
    </div>
  );
};

export default NoteIntervalSwitch;
