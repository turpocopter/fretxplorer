import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import RootForm from "components/FormParts/RootForm";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import useNoteNames from "hooks/noteNames";
import { computeModeSemitones } from "utility/intervals";

import { makeStyles } from "@material-ui/core/styles";

import scales from "data/scales";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.main,
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      minHeight: "calc(100vh - 262px)",
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
    },
    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      margin: "16px 32px",
    },
    "@media (max-height: 679px) and (orientation: landscape)": {
      minHeight: "calc(100vh - 150px)",
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "center",
    },
    "@media (max-height: 679px) and (min-width: 1024px) and (orientation: landscape)": {
      minHeight: "calc(100vh - 268px)",
    },
    "@media (min-height: 680px) and (orientation: landscape)": {
      margin: "0 0 0 6px",
      minHeight: "9.8em",
    },
    "@media (min-height: 840px) and (orientation: landscape)": {
      minHeight: "13em",
    },
  },
  paperInner: {
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      height: "30.8em",
    },
    "@media (max-height: 679px) and (orientation: landscape)": {
      height: "23.1em",
    },
    "@media (max-height: 679px) and (min-width: 1024px) and (orientation: landscape)": {
      height: "27em",
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      marginBottom: theme.spacing(4),
    },
    "@media (min-height: 680px) and (max-height: 839px) and (orientation: landscape)": {
      display: "none",
    },
  },
  form: {
    width: 250,
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
  },
  wrapper: {
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      margin: "8px 0",
    },
  },
  formControl: {
    margin: 0,
    minWidth: 250,
    [theme.breakpoints.up("sm")]: {
      minWidth: 400,
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
  select: {
    [`${theme.breakpoints.down("sm")} and (orientation: portrait)`]: {
      "& > .MuiSelect-root > span": {
        display: "none",
      },
    },
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
  group: {
    fontSize: "1em",
    textAlign: "center",
    color: theme.palette.gray.main,
    "& span": {
      fontSize: "0.85em",
    },
  },
  option: {
    fontSize: "1em",
    minHeight: 34,
    /*"& span": {
      color: theme.palette.gray.main,
      fontSize: "0.85em",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },*/
  },
  buttonWrapper: {
    [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
      marginTop: 8,
    },
  },
  submitButton: {
    width: 250,
    marginTop: 16,
    padding: "16px 0",
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
    "& sup": {
      verticalAlign: "top",
      position: "relative",
      top: "-0.25em",
    },
    textTransform: "none",
    [`${theme.breakpoints.down("sm")} and (orientation: landscape)`]: {
      marginTop: 8,
      padding: "8px 0",
    },
    "@media (min-height: 680px) and (orientation: landscape)": {
      marginTop: 8,
      padding: "8px 0",
    },
    "@media (min-width: 1590px) and (max-aspect-ratio: 8/5)": {
      marginTop: 16,
      padding: "16px 0",
    },
  },
}));

const ScalePickerForm = ({ onPick }) => {
  const dispatch = useDispatch();
  const rootNote = useSelector((state) => state.notePicker.rootNote);
  const useFlats = useSelector((state) => state.notePicker.useFlats);
  const noteNaming = useSelector((state) => state.settings.noteNaming);
  const [tmpScaleInfo, setTmpScaleInfo] = useState(null);
  const { getNoteName } = useNoteNames(noteNaming);
  const classes = useStyles();

  const rootName = getNoteName(rootNote, useFlats);

  const onUpdateRoot = (rootNote) => {
    return dispatch(actions.updateRoot(rootNote, noteNaming));
  };
  const onToggleFlats = () => dispatch(actions.toggleFlats(noteNaming));

  const onUpdateScale = (fullName, category) => {
    let semitonesFromRoot = [];
    let displayIntervals;
    const catObj = scales.find((cat) => cat.category === category);
    const scaleObj = {
      ...catObj.scales.find((sc) => sc.fullName === fullName),
    };
    if (scaleObj.hasOwnProperty("relatedTo")) {
      // find the related scale
      const refScale = catObj.scales.find(
        (sc) => sc.fullName === scaleObj.relatedTo.name
      );
      semitonesFromRoot = computeModeSemitones(
        refScale.semitonesFromRoot,
        scaleObj.relatedTo.mode
      );
      displayIntervals = refScale.modes[scaleObj.relatedTo.mode].hasOwnProperty(
        "displayIntervals"
      )
        ? refScale.modes[scaleObj.relatedTo.mode].displayIntervals
        : null;
      scaleObj.relatedTo.scaleInfo = refScale;
    } else {
      semitonesFromRoot = scaleObj.semitonesFromRoot;
      displayIntervals = scaleObj.hasOwnProperty("displayIntervals")
        ? scaleObj.displayIntervals
        : null;
    }
    setTmpScaleInfo(scaleObj);
    return dispatch(
      actions.updateScaleNotes(semitonesFromRoot, displayIntervals)
    );
  };
  const onPickScale = () => {
    dispatch(
      actions.updateScaleInfo(
        tmpScaleInfo.hasOwnProperty("shortName")
          ? tmpScaleInfo.shortName
          : tmpScaleInfo.fullName,
        tmpScaleInfo
      )
    );
  };

  const scaleListContents = scales.map((cat) => {
    const catItems = cat.scales.map((el) => {
      return (
        <MenuItem
          key={el.name}
          value={el.fullName}
          className={classes.option}
          data-category={cat.category}
        >
          {el.fullName.replace(" scale", "")}
          {el.fullName.includes(" scale") && <span>&nbsp;scale</span>}
        </MenuItem>
      );
    });
    return [
      <ListSubheader key={cat.category} className={classes.group} disableSticky>
        {cat.category}
        {cat.hasOwnProperty("subtitle") && (
          <span>&nbsp;{`(${cat.subtitle})`}</span>
        )}
      </ListSubheader>,
      catItems,
    ];
  });

  return (
    <div className={`${classes.paper} pickerForm`}>
      <div className={classes.paperInner}>
        <Typography
          className={classes.title}
          variant='h5'
          component='h2'
          align='center'
        >
          Pick a scale!
        </Typography>
        <RootForm
          rootNote={rootNote}
          useFlats={useFlats}
          noteNaming={noteNaming}
          updateRoot={onUpdateRoot}
          toggleFlats={onToggleFlats}
        />
        <Fade in={rootNote !== ""} mountOnEnter unmountOnExit timeout={700}>
          <div className={classes.wrapper}>
            <FormControl variant='outlined' className={classes.formControl}>
              <TextField
                variant='outlined'
                id='scale'
                select
                label='Scale'
                className={classes.textField}
                value={tmpScaleInfo !== null ? tmpScaleInfo.fullName : ""}
                onChange={(e) => {
                  if (e.target.value !== undefined) {
                    onUpdateScale(
                      e.target.value,
                      e.currentTarget.dataset.category
                    );
                  } else {
                    e.preventDefault();
                  }
                }}
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
                {scaleListContents}
              </TextField>
            </FormControl>
          </div>
        </Fade>
        <Fade
          in={tmpScaleInfo !== null}
          mountOnEnter
          unmountOnExit
          timeout={700}
        >
          <div>
            <FormControl className={classes.buttonWrapper}>
              <Button
                className={classes.submitButton}
                variant='contained'
                color='primary'
                size='large'
                onClick={onPickScale}
              >
                PICK {rootName}{" "}
                {tmpScaleInfo !== null
                  ? tmpScaleInfo.hasOwnProperty("shortName")
                    ? tmpScaleInfo.shortName
                    : tmpScaleInfo.fullName
                  : null}
              </Button>
            </FormControl>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default ScalePickerForm;
