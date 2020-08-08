import React, { useEffect } from "react";
import { sanitize } from "dompurify";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { hasNote } from "utility/intervals";

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

const seventhList = {
  none: {
    semitonesFromRoot: null,
    isAvailable: (selected) =>
      (hasNote(selected, 4, 3) ||
        hasNote(selected, 3, 3) ||
        hasNote(selected, 2, 2) ||
        hasNote(selected, 5, 4)) &&
      (hasNote(selected, 7, 5) ||
        hasNote(selected, 6, 5) ||
        hasNote(selected, 8, 5)),
    nameChord: () => null,
  },
  major: {
    semitonesFromRoot: 11,
    isAvailable: (selected) =>
      (hasNote(selected, 3, 3) && !hasNote(selected, 6, 5)) ||
      (hasNote(selected, 4, 3) && !hasNote(selected, 6, 5)) ||
      hasNote(selected, 2, 2) ||
      hasNote(selected, 5, 4),
    nameChord: (selected) => {
      if (hasNote(selected, 8, 5)) return "+<sup>M7</sup>";
      //else if (hasNote(selected, 4, 3) && hasNote(selected, 6, 5)) return "M7♭5";
      else if (hasNote(selected, 4, 3)) return "M7";
      else if (hasNote(selected, 5, 4)) return "M7sus4";
      else if (hasNote(selected, 2, 2)) return "M7sus2";
      else if (hasNote(selected, 3, 3)) return "m<sup>M7</sup>";
    },
  },
  minor: {
    semitonesFromRoot: 10,
    isAvailable: (selected) =>
      hasNote(selected, 3, 3) ||
      hasNote(selected, 4, 3) ||
      hasNote(selected, 2, 2) ||
      hasNote(selected, 5, 4),

    nameChord: (selected) => {
      if (hasNote(selected, 8, 5)) return "+7";
      else if (hasNote(selected, 3, 3) && hasNote(selected, 6, 5))
        return "<sup>ø</sup>7";
      else if (hasNote(selected, 4, 3) && hasNote(selected, 6, 5)) return "7♭5";
      else if (hasNote(selected, 4, 3)) return "7";
      else if (hasNote(selected, 3, 3)) return "m7";
      else if (hasNote(selected, 5, 4)) return "7sus4";
      else if (hasNote(selected, 2, 2)) return "7sus2";
    },
  },
  diminished: {
    semitonesFromRoot: 9,
    isAvailable: (selected) =>
      hasNote(selected, 3, 3) && hasNote(selected, 6, 5),
    nameChord: (selected) => {
      return "<sup>o</sup>7";
    },
  },
};

const SeventhForm = (props) => {
  const { rootName, selected, seventh, updateSeventh, setTmpChordName } = props;
  const classes = useStyles();

  useEffect(() => {
    if (
      seventh !== "" &&
      seventh !== "none" &&
      selected.filter((el) => el.degree > 5 && el.degree !== 7).length === 0
    ) {
      setTmpChordName(rootName + seventhList[seventh].nameChord(selected));
    }
  }, [seventh, rootName, selected, setTmpChordName]);

  const handleSeventh = (e) => {
    let seventh = e.target.value;
    //this.props.addSelected([ [semitonesFromRoot,{degree:7}] ])
    updateSeventh(seventh, seventhList[seventh].semitonesFromRoot);
  };

  const filteredSeventhList = Object.keys(seventhList)
    .filter((key) => seventhList[key].isAvailable(selected))
    .map((key) => (
      <MenuItem key={key} value={key}>
        {key}
        {seventhList[key].semitonesFromRoot !== null ? (
          <span
            dangerouslySetInnerHTML={{
              __html: sanitize(
                `&nbsp;(${rootName}${seventhList[key].nameChord(selected)})`
              ),
            }}
          />
        ) : (
          ""
        )}
      </MenuItem>
    ));
  return (
    filteredSeventhList.length > 0 && (
      <div className={classes.wrapper}>
        <FormControl variant='outlined' className={classes.formControl}>
          <TextField
            variant='outlined'
            id='seventh-note'
            select
            label='Seventh note'
            className={classes.textField}
            value={seventh}
            onChange={handleSeventh}
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
            {filteredSeventhList}
          </TextField>
        </FormControl>
      </div>
    )
  );
};

export default SeventhForm;
