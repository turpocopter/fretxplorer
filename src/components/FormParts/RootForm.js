import React from "react";

import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import useNoteNames from "hooks/noteNames";

import PropTypes from "prop-types";

const RootForm = (props) => {
  const { getNoteNames } = useNoteNames(props.noteNaming);

  const noteList = getNoteNames(props.useFlats).map((noteName, k) => (
    <MenuItem className='rootNoteItem' key={`rootNote${k}`} value={k}>
      {noteName}
    </MenuItem>
  ));

  return (
    <div data-test='root-form' className='rootForm'>
      <FormControl variant='outlined' className='formControl -root'>
        <TextField
          variant='outlined'
          id='root-note'
          select
          label='Root Note'
          className='textField'
          value={props.rootNote}
          onChange={(e) => props.updateRoot(e.target.value)}
          SelectProps={{
            className: "select",
            MenuProps: {
              classes: { list: "menu" },
            },
          }}
          InputLabelProps={{
            className: "label",
          }}
          margin='normal'
        >
          {noteList}
        </TextField>
      </FormControl>
      <label className='flatSwitch'>
        <span>♭</span>
        <Switch
          checked={!props.useFlats}
          onChange={props.toggleFlats}
          color='default'
        />
        <span>♯</span>
      </label>
    </div>
  );
};

RootForm.propTypes = {
  rootNote: PropTypes.oneOf(["", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .isRequired,
  useFlats: PropTypes.bool.isRequired,
  noteNaming: PropTypes.oneOf(["letters", "latin"]).isRequired,
  updateRoot: PropTypes.func.isRequired,
  toggleFlats: PropTypes.func.isRequired,
};

export default RootForm;
