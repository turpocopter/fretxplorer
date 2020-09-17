import React from "react";

import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import useNoteNames from "hooks/noteNames";

const RootForm = (props) => {
  const { getNoteNames } = useNoteNames(props.noteNaming);

  const noteList = getNoteNames(props.useFlats).map((noteName, k) => (
    <MenuItem key={`rootNote${k}`} value={k}>
      {noteName}
    </MenuItem>
  ));

  return (
    <div className='rootForm'>
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

export default RootForm;
