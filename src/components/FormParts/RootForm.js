import React from "react";

import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

import useNoteNames from "hooks/noteNames";

const useStyles = makeStyles((theme) => ({
  rootForm: {
    width: 250,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formControl: {
    margin: 0,
    width: 120,
  },
}));

const RootForm = (props) => {
  const classes = useStyles();
  const { getNoteNames } = useNoteNames(props.noteNaming);

  const noteList = getNoteNames(props.useFlats).map((noteName, k) => (
    <MenuItem key={`rootNote${k}`} value={k}>
      {noteName}
    </MenuItem>
  ));

  return (
    <div className={classes.rootForm}>
      <FormControl variant='outlined' className={classes.formControl}>
        <TextField
          variant='outlined'
          id='root-note'
          select
          label='Root Note'
          className={classes.textField}
          value={props.rootNote}
          onChange={(e) => props.updateRoot(e.target.value)}
          SelectProps={{
            className: classes.select,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin='normal'
        >
          {noteList}
        </TextField>
      </FormControl>
      <label className={classes.flatSwitch}>
        <span>♭</span>
        <Switch
          checked={!props.useFlats}
          onChange={props.toggleFlats}
          color='default'
        />
        <span>#</span>
      </label>
    </div>
  );
};

export default RootForm;
