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

const scales = [
  {
    category: "Main heptatonic scales",
    subtitle: "with modes available",
    scales: [
      {
        shortName: "Major",
        fullName: "Major scale",
        semitonesFromRoot: [0, 2, 4, 5, 7, 9, 11],
        modes: [
          {
            shortName: "Major",
            fullName: "Major scale",
            listName: "Ionian",
            aliases: ["Ionian"],
          },
          {
            shortName: "Dorian",
            fullName: "Dorian mode",
          },
          {
            shortName: "Phrygian",
            fullName: "Phrygian mode",
          },
          {
            shortName: "Lydian",
            fullName: "Lydian mode",
          },
          {
            shortName: "Mixolydian",
            fullName: "Mixolydian mode",
          },
          {
            shortName: "minor",
            fullName: "Natural minor scale",
            listName: "Aeolian",
            aliases: ["Aeolian"],
          },
          {
            shortName: "Locrian",
            fullName: "Locrian mode",
          },
        ],
      },
      {
        shortName: "minor",
        fullName: "Natural minor scale",
        relatedTo: { name: "Major scale", mode: 5 },
      },
      {
        shortName: "melodic minor ascending",
        fullName: "Ascending melodic minor scale",
        aliases: ["jazz minor scale"],
        semitonesFromRoot: [0, 2, 3, 5, 7, 9, 11],
        modes: [
          {
            shortName: "melodic minor ascending",
            fullName: "Ascending melodic minor scale",
            aliases: ["jazz minor scale"],
          },
          {
            fullName: "Dorian ♭2",
            aliases: ["Phrygian ♮6", "Assyrian", "Phrygidorian"],
          },
          {
            fullName: "Lydian augmented",
            aliases: ["Lydian #5"],
          },
          {
            fullName: "Lydian dominant",
            aliases: [
              "Lydian ♭7",
              "Acoustic scale",
              "Overtone scale",
              "Bartok scale",
            ],
          },
          {
            fullName: "Mixolydian ♭6",
            aliases: [
              "Mixolydian ♭13",
              "Aeolian dominant scale",
              "Aeolian major",
              "melodic major scale",
              "Hindu scale",
            ],
          },
          {
            fullName: "Locrian ♮2",
            aliases: ["half-diminished scale", "Aeolocrian"],
          },
          {
            shortName: "altered",
            fullName: "Altered scale",
            aliases: ["altered dominant scale", "Super Locrian"],
          },
        ],
      },
      {
        shortName: "harmonic minor",
        fullName: "Harmonic minor scale",
        semitonesFromRoot: [0, 2, 3, 5, 7, 8, 11],
        modes: [
          { shortName: "harmonic minor", fullName: "Harmonic minor scale" },
          { fullName: "Locrian ♮6", aliases: ["Locrian ♮13"] },
          { fullName: "Ionian ♯5" },
          {
            shortName: "Dorian altered",
            fullName: "Altered Dorian scale",
            aliases: ["Ukrainian Dorian scale", "Romanian minor scale"],
          },
          {
            shortName: "Phrygian dominant",
            fullName: "Phrygian dominant scale",
            aliases: [
              "Altered Phrygian scale",
              "dominant ♭2 ♭6",
              "Freygish scale",
            ],
          },
          { fullName: "Lydian ♯2" },
          {
            shortName: "altered diminished",
            fullName: "Altered Diminished scale",
          },
        ],
      },
      {
        shortName: "double harmonic",
        fullName: "Double harmonic scale",
        semitonesFromRoot: [0, 1, 4, 5, 7, 8, 11],
        modes: [
          {
            shortName: "double harmonic major",
            fullName: "Double harmonic major scale",
            aliases: ["Byzantine scale", "Gypsy major scale", "Arabic scale"],
          },
          { fullName: "Lydian ♯2 ♯6" },
          { fullName: "Ultraphrygian" },
          {
            shortName: "Hungarian minor",
            fullName: "Hungarian minor scale",
            aliases: ["Double harmonic minor scale", "Gypsy minor scale"],
          },
          { shortName: "Oriental", fullName: "Oriental scale" },
          { fullName: "Ionian ♯2 ♯5" },
          { fullName: "Locrian 𝄫3 𝄫7" },
        ],
      },
    ],
  },
  {
    category: "Pentatonic scales and derived",
    scales: [
      {
        shortName: "pentatonic major",
        fullName: "Pentatonic major scale",
        semitonesFromRoot: [0, 2, 4, 7, 9],
        displayIntervals: ["R", 2, 3, 5, 6],
        modes: [
          {
            shortName: "pentatonic major",
            fullName: "Pentatonic major scale",
            displayIntervals: ["R", 2, 3, 5, 6],
          },
          {
            shortName: "suspended pentatonic",
            fullName: "Suspended pentatonic",
            aliases: ["Egyptian pentatonic"],
            displayIntervals: ["R", 2, 4, 5, "♭7"],
          },
          {
            shortName: "blues minor pentatonic",
            fullName: "Blues minor pentatonic",
            displayIntervals: ["R", "♭3", 4, "♭6", "♭7"],
          },
          {
            shortName: "blues major pentatonic",
            fullName: "Blues major pentatonic",
            displayIntervals: ["R", 2, 4, 5, 6],
          },
          {
            shortName: "pentatonic minor",
            fullName: "Pentatonic minor scale",
            displayIntervals: ["R", "♭3", 4, 5, "♭7"],
          },
        ],
      },
      {
        shortName: "pentatonic minor",
        fullName: "Pentatonic minor scale",
        relatedTo: { name: "Pentatonic major scale", mode: 4 },
      },
      {
        shortName: "blues hexatonic",
        fullName: "Hexatonic blues scale",
        subtitle: "Pentatonic minor scale with blue note added",
        semitonesFromRoot: [0, 3, 5, 6, 7, 10],
        displayIntervals: ["R", "♭3", 4, "♭5", 5, "♭7"],
      },
    ],
  },
  {
    category: "Bebop scales",
    scales: [
      {
        shortName: "bebop dominant",
        fullName: "Bebop dominant scale",
        subtitle: "Mixolydian mode with major 7th added",
        semitonesFromRoot: [0, 2, 4, 5, 7, 9, 10, 11],
        displayIntervals: ["R", 2, 3, 4, 5, 6, "♭7", 7],
      },
      {
        shortName: "bebop Dorian",
        fullName: "Bebop Dorian scale",
        subtitle: "Dorian mode with major 3rd added",
        semitonesFromRoot: [0, 2, 3, 4, 5, 7, 9, 10],
        displayIntervals: ["R", 2, "♭3", 3, 4, 5, 6, "♭7"],
      },
      {
        shortName: "bebop Dorian (alt.)",
        fullName: "Alternate Bebop Dorian scale",
        subtitle: "Dorian mode with major 7th added",
        semitonesFromRoot: [0, 2, 3, 5, 7, 9, 10, 11],
        displayIntervals: ["R", 2, "♭3", 4, 5, 6, "♭7", 7],
      },
      {
        shortName: "bebop major",
        fullName: "Bebop major scale",
        subtitle: "Major scale with ♯5 added",
        semitonesFromRoot: [0, 2, 4, 5, 7, 8, 9, 11],
        displayIntervals: ["R", 2, 3, 4, 5, "♯5", 6, 7],
      },
      {
        shortName: "bebop melodic minor",
        fullName: "Bebop melodic minor scale",
        subtitle: "Melodic minor scale with ♯5 added",
        semitonesFromRoot: [0, 2, 3, 5, 7, 8, 9, 11],
        displayIntervals: ["R", 2, "♭3", 4, 5, "♯5", 6, 7],
      },
      {
        shortName: "bebop harmonic minor",
        fullName: "Bebop harmonic minor scale",
        subtitle: "Harmonic minor scale with ♭7 addeed",
        semitonesFromRoot: [0, 2, 3, 5, 7, 8, 10, 11],
        displayIntervals: ["R", 2, "♭3", 4, 5, "♭6", "♭7", 7],
      },
    ],
  },
  {
    category: "Hexatonic scales",
    scales: [
      {
        shortName: "whole tone",
        fullName: "Whole tone scale",
        aliases: ["Messiaen's first mode"],
        semitonesFromRoot: [0, 2, 4, 6, 8, 10],
        displayIntervals: ["R", "2", "3", "#4", "#5", "#6"],
      },
      {
        shortName: "augmented",
        fullName: "Augmented scale",
        semitonesFromRoot: [0, 3, 4, 7, 8, 11],
        displayIntervals: ["R", "♭3", 3, 5, "♯5", 7],
      },
      {
        shortName: "Prometheus",
        fullName: "Prometheus scale",
        semitonesFromRoot: [0, 2, 4, 6, 9, 10],
        displayIntervals: ["R", 2, 3, "♯4", 6, "♭7"],
      },
      {
        shortName: "tritone",
        fullName: "Tritone scale",
        semitonesFromRoot: [0, 1, 4, 6, 7, 10],
        displayIntervals: ["R", "♭2", 3, "♭5", 5, "♭7"],
      },
      {
        shortName: "two-semitone tritone",
        fullName: "Two-semitone tritone scale",
        semitonesFromRoot: [0, 1, 2, 6, 7, 8],
        displayIntervals: ["R", "♭2", 2, "♯4", 5, "♭6"],
      },
    ],
  },
  {
    category: "Heptatonic scales",
    scales: [
      {
        shortName: "Neapolitan minor",
        fullName: "Minor Neapolitan scale",
        semitonesFromRoot: [0, 1, 3, 5, 7, 8, 11],
      },
      {
        shortName: "Neapolitan major",
        fullName: "Major Neapolitan scale",
        semitonesFromRoot: [0, 1, 3, 5, 7, 9, 11],
      },
      {
        shortName: "enigmatic",
        fullName: "Enigmatic scale",
        semitonesFromRoot: [0, 1, 4, 6, 7, 10, 11],
      },
      {
        shortName: "Hungarian major",
        fullName: "Hungarian Major scale",
        semitonesFromRoot: [0, 3, 4, 6, 7, 9, 10],
      },
      {
        shortName: "Persian",
        fullName: "Persian scale",
        semitonesFromRoot: [0, 1, 4, 5, 6, 8, 11],
      },
    ],
  },
  {
    category: "Octatonic scales",
    scales: [
      {
        fullName: "Whole Half Diminished",
        aliases: ["Messiaen's second mode"],
        semitonesFromRoot: [0, 2, 3, 5, 6, 8, 9, 11],
        displayIntervals: ["R", 2, "♭3", 4, "♭5", "♯5", 6, 7],
      },
      {
        fullName: "Half Whole Diminished",
        semitonesFromRoot: [0, 1, 3, 4, 6, 7, 9, 10],
        displayIntervals: ["R", "♭9", "♯9", 3, "♯11", 5, 13, "♭7"],
      },
    ],
  },
];

const ScalePickerForm = ({ onPick }) => {
  const dispatch = useDispatch();
  const rootNote = useSelector((state) => state.notePicker.rootNote);
  const useFlats = useSelector((state) => state.notePicker.useFlats);
  //const scaleName = useSelector((state) => state.notePicker.scaleName);
  //const modeName = useSelector((state) => state.notePicker.scaleName);
  //const selected = useSelector((state) => state.notePicker.selected);
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
    <div className={classes.paper}>
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
