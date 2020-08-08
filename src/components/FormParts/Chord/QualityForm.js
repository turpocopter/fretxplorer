import React, { useEffect } from "react";
import { sanitize } from "dompurify";
import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
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
    "@media (min-height: 768px) and (max-width: 1589px) and (orientation: landscape)": {
      "& > .MuiTextField-root": {
        margin: "8px 0",
      },
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
    "@media (min-height: 768px) and (max-width: 1589px) and (orientation: landscape)": {
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
    "@media (min-height: 768px) and (max-width: 1589px) and (orientation: landscape)": {
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
    "@media (min-height: 768px) and (max-width: 1589px) and (orientation: landscape)": {
      "& li": {
        fontSize: "1em!important",
      },
    },
  },
}));

const chordQualities = {
  major: {
    symbol: "",
    notes: [
      { semitonesFromRoot: 4, degree: 3 },
      { semitonesFromRoot: 7, degree: 5 },
    ],
  },
  minor: {
    symbol: "m",
    notes: [
      { semitonesFromRoot: 3, degree: 3 },
      { semitonesFromRoot: 7, degree: 5 },
    ],
  },
  augmented: {
    symbol: "+",
    notes: [
      { semitonesFromRoot: 4, degree: 3 },
      { semitonesFromRoot: 8, degree: 5 },
    ],
  },
  diminished: {
    symbol: "<sup>o</sup>",
    notes: [
      { semitonesFromRoot: 3, degree: 3 },
      { semitonesFromRoot: 6, degree: 5 },
    ],
  },
  sus2: {
    symbol: "sus2",
    notes: [
      { semitonesFromRoot: 2, degree: 2 },
      { semitonesFromRoot: 7, degree: 5 },
    ],
  },
  sus4: {
    symbol: "sus4",
    notes: [
      { semitonesFromRoot: 5, degree: 4 },
      { semitonesFromRoot: 7, degree: 5 },
    ],
  },
  "major ♭5": {
    symbol: "♭5",
    notes: [
      { semitonesFromRoot: 4, degree: 3 },
      { semitonesFromRoot: 6, degree: 5 },
    ],
  },
  powerchord: {
    symbol: "5",
    notes: [{ semitonesFromRoot: 7, degree: 5 }],
  },
};
const QualityForm = (props) => {
  const { rootName, quality, selected, updateQuality, setTmpChordName } = props;
  const classes = useStyles();

  useEffect(() => {
    if (quality !== "" && selected.filter((el) => el.degree > 5).length === 0) {
      setTmpChordName(rootName + chordQualities[quality].symbol);
    }
  }, [quality, rootName, selected, setTmpChordName]);

  const handleQuality = (e) => {
    updateQuality(e.target.value, chordQualities[e.target.value].notes);
  };
  const qualityList = Object.keys(chordQualities).map((key) => (
    <MenuItem key={key} value={key}>
      <span
        dangerouslySetInnerHTML={{
          __html: sanitize(`${key} (${rootName}${chordQualities[key].symbol})`),
        }}
      />
    </MenuItem>
  ));

  return (
    <div className={classes.wrapper}>
      <FormControl variant='outlined' className={classes.formControl}>
        <TextField
          variant='outlined'
          id='chord-quality'
          select
          label='Chord Quality'
          className={classes.textField}
          value={quality}
          onChange={handleQuality}
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
          {qualityList}
        </TextField>
      </FormControl>
    </div>
  );
};

export default QualityForm;
