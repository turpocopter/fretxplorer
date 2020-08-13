import React from "react";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import useNotes from "hooks/noteNames";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  let formControlTablet;
  return {
    root: {
      marginTop: "1em",
      borderTop: `1px solid ${theme.palette.gray.light}`,
      paddingTop: 4,
      width: "100%",
    },
    wrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mainCtrlsWrapper: {
      flexGrow: 1,
      textAlign: "center",
    },
    formControl: {
      textAlign: "left",
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
    modeSwitch: {
      textAlign: "center",
    },
    flatSwitch: {
      fontSize: "0.9em",
      display: "inline-block",
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      marginTop: 0,
      minWidth: 120,
      whiteSpace: "nowrap",
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        fontSize: "1em",
      },
      "@media (orientation: landscape)": {
        marginLeft: 8,
      },
      "@media (min-height: 768px) and (orientation: landscape)": {
        fontSize: "1em",
      },
    },
    btnPrevious: {
      marginLeft: -16,
    },
    btnNext: {
      marginRight: -16,
    },
  };
});

const Modes = ({
  modes,
  selected,
  current,
  setCurrent,
  pickPrevious,
  pickNext,
  parallelModes,
  toggleParallelModes,
  namingConvention,
}) => {
  const classes = useStyles();
  const { translateNote } = useNotes(namingConvention);
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={`${classes.btnWrapper} ${classes.btnPrevious}`}>
          <IconButton aria-label='delete' onClick={pickPrevious}>
            <NavigateBeforeIcon fontSize='large' />
          </IconButton>
        </div>
        <div className={classes.mainCtrlsWrapper}>
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
                    data-name={`${modeName}`}
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
              Relative <span>modes</span>
              <Switch
                checked={parallelModes}
                onChange={toggleParallelModes}
                color='default'
              />
              Parallel <span>modes</span>
            </label>
          </div>
        </div>
        <div className={`${classes.btnWrapper} ${classes.btnNext}`}>
          <IconButton aria-label='delete' onClick={pickNext}>
            <NavigateNextIcon fontSize='large' />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Modes;
