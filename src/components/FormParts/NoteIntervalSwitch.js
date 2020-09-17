import React from "react";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";

const NoteIntervalSwitch = ({ showIntervals, toggleNotesIntervals }) => {
  return (
    <div data-test='note-interval-switch' className='noteIntervalSwitch'>
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

NoteIntervalSwitch.propTypes = {
  showIntervals: PropTypes.bool.isRequired,
  toggleNotesIntervals: PropTypes.func.isRequired,
};

export default NoteIntervalSwitch;
