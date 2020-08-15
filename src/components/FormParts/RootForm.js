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
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      margin: "8px 0",
    },
  },
  formControl: {
    margin: 0,
    width: 120,
    [theme.breakpoints.up("sm")]: {
      width: 200,
    },
    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      "& > .MuiTextField-root": {
        margin: "8px 0",
      },
    },
    "@media (min-height: 680px) and (max-width: 1589px) and (orientation: landscape)": {
      "& > .MuiTextField-root": {
        margin: "8px 0",
      },
    },
  },
  flatSwitch: {
    fontSize: "1.4em",
    "& span": {
      verticalAlign: "middle",
    },
    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      fontSize: "1.1em",
    },
    "@media (min-height: 680px) and (max-width: 1589px) and (orientation: landscape)": {
      fontSize: "1.1em",
    },
  },
  select: {
    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      fontSize: "0.9em",
      "& > .MuiSelect-root": {
        padding: 12,
        paddingRight: 32,
      },
    },
    "@media (min-height: 680px) and (max-width: 1589px) and (orientation: landscape)": {
      fontSize: "0.9em",
      "& > .MuiSelect-root": {
        padding: 12,
        paddingRight: 32,
      },
    },
  },
  label: {
    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      fontSize: "1em",
      transform: "translate(14px, 14px) scale(1)",
      "&.MuiInputLabel-shrink": {
        transform: "translate(11px, -6px) scale(0.7)",
      },
    },
    "@media (min-height: 680px) and (max-width: 1589px) and (orientation: landscape)": {
      fontSize: "1em",
      transform: "translate(14px, 14px) scale(1)",
      "&.MuiInputLabel-shrink": {
        transform: "translate(11px, -6px) scale(0.7)",
      },
    },
  },
  menu: {
    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      "& li": {
        fontSize: "1em!important",
      },
    },
    "@media (min-height: 680px) and (max-width: 1589px) and (orientation: landscape)": {
      "& li": {
        fontSize: "1em!important",
      },
    },
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
              classes: { list: classes.menu },
            },
          }}
          InputLabelProps={{
            className: classes.label,
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
        <span>♯</span>
      </label>
    </div>
  );
};

export default RootForm;
