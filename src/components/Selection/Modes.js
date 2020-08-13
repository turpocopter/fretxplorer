import React from "react";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import useNotes from "hooks/noteNames";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  let formControlTablet;
  return {
    /*wrapper: {
      display: "flex",
      justifyContent: "center",
    },*/
    formControl: {
      margin: 0,
      width: 218,
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: portrait)`]: (formControlTablet = {
        marginTop: 4,
        marginBottom: 8,
        width: "13.4em",
      }),
      [`${theme.breakpoints.up(
        "md"
      )} and (orientation: landscape)`]: formControlTablet,
    },
    select: {
      fontSize: "0.95em",
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        fontSize: "1em",
      },
      [`${theme.breakpoints.up("md")} and (orientation: landscape)`]: {
        fontSize: "1em",
      },
      "& span": {
        color: theme.palette.gray.main,
        fontSize: "0.9em",
      },
    },
    label: {
      fontSize: "0.92em",
    },
    menu: {
      fontSize: "0.95em",
    },
    group: {
      fontSize: "1em",
      textAlign: "center",
      color: theme.palette.gray.main,
    },
    option: {
      fontSize: "1em",
      minHeight: 34,
      "& span": {
        color: theme.palette.gray.main,
        fontSize: "0.9em",
      },
    },
  };
});

const Modes = ({
  modes,
  selected,
  current,
  setCurrent,
  parallelModes,
  toggleParallelModes,
  namingConvention,
}) => {
  const classes = useStyles();
  const { translateNote } = useNotes(namingConvention);
  return (
    <div>
      <FormControl variant='outlined' className={classes.formControl}>
        <TextField
          variant='outlined'
          id='modes'
          select
          label='Modes'
          className={classes.textField}
          value={current}
          onChange={(e) =>
            setCurrent(e.target.value, e.currentTarget.dataset.name)
          }
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
          size='small'
        >
          {modes.map((mode, i) => {
            const rootForMode = translateNote(
              selected[
                parallelModes
                  ? 0
                  : (selected.length + i - current) % selected.length
              ].displayName
            );
            const modeName = mode.hasOwnProperty("shortName")
              ? mode.shortName
              : mode.fullName;
            const displayName = mode.hasOwnProperty("listName")
              ? mode.listName
              : modeName;
            return (
              <MenuItem
                key={i}
                value={i}
                data-name={`${rootForMode} ${modeName}`}
                className={classes.option}
              >
                {`${rootForMode} ${displayName}`}
              </MenuItem>
            );
          })}
        </TextField>
      </FormControl>

      <div className={classes.modeSwitch}>
        <label className={classes.flatSwitch}>
          <span>Relative modes</span>
          <Switch
            checked={parallelModes}
            onChange={toggleParallelModes}
            color='default'
          />
          <span>Parallel modes </span>
        </label>
      </div>
    </div>
  );
};

export default Modes;
