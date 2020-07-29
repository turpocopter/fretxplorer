/***********************************************
 *                                             *
 *  TODO : EXTENSIONS D'ACCORDS DEMI-DIMINUES  *
 *                                             *
 ***********************************************/

import React, { useEffect } from "react";
import { sanitize } from "dompurify";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { hasNote } from "utility/intervals";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: 250,
  },
}));

const extensionsList = {
  none: {
    symbol: "none",
    notes: [],
    isAvailable: (selected) => true,
    nameChord: (selected) => null,
  },

  /* AJOUTER b6 ? b6/9 ? */

  e6: {
    symbol: "6",
    notes: [{ semitonesFromRoot: 9, degree: 6 }],
    isAvailable: (selected) =>
      !hasNote(selected, 10, 7) &&
      !hasNote(selected, 11, 7) &&
      !hasNote(selected, 9, 7),
    nameChord: (selected) => {
      if (hasNote(selected, 6, 5)) return "o6";
      if (hasNote(selected, 8, 5)) return "+6";
      else if (hasNote(selected, 4, 3)) return "6";
      else if (hasNote(selected, 3, 3)) return "m6";
      else if (hasNote(selected, 5, 4)) return "6sus4";
      else if (hasNote(selected, 2, 2)) return "6sus2";
    },
  },
  "e6/9": {
    symbol: "6/9",
    notes: [
      { semitonesFromRoot: 9, degree: 6 },
      { semitonesFromRoot: 2, degree: 9 },
    ],
    isAvailable: (selected) =>
      (hasNote(selected, 4, 3) || hasNote(selected, 3, 3)) &&
      !hasNote(selected, 10, 7) &&
      !hasNote(selected, 11, 7) &&
      !hasNote(selected, 9, 7),
    nameChord: (selected) => {
      if (hasNote(selected, 6, 5)) return "o6/9";
      else if (hasNote(selected, 8, 5)) return "+6/9";
      else if (hasNote(selected, 4, 3)) return "6/9";
      else return "m6/9";
    },
  },
  e9: {
    symbol: "9",
    notes: [{ semitonesFromRoot: 2, degree: 9 }],
    isAvailable: (selected) =>
      (hasNote(selected, 10, 7) ||
        hasNote(selected, 11, 7) ||
        hasNote(selected, 9, 7)) &&
      !hasNote(selected, 2, 2),
    nameChord: (selected) => {
      if (hasNote(selected, 9, 7)) return "o9";
      else if (hasNote(selected, 8, 5) && hasNote(selected, 10, 7)) return "+9";
      else if (hasNote(selected, 8, 5) && hasNote(selected, 11, 7))
        return "+<sup>M9</sup>";
      else if (hasNote(selected, 11, 7) && hasNote(selected, 4, 3)) return "M9";
      else if (hasNote(selected, 11, 7) && hasNote(selected, 3, 3))
        return "m<sup>M9</sup>";
      else if (hasNote(selected, 11, 7) && hasNote(selected, 5, 4))
        return "M9sus4";
      else if (hasNote(selected, 10, 7) && hasNote(selected, 4, 3)) return "9";
      else if (hasNote(selected, 10, 7) && hasNote(selected, 3, 3)) return "m9";
      else if (hasNote(selected, 10, 7) && hasNote(selected, 5, 4))
        return "9sus4";
    },
  },
  add9: {
    symbol: "add9",
    notes: [{ semitonesFromRoot: 2, degree: 9 }],
    isAvailable: (selected) =>
      (hasNote(selected, 4, 3) ||
        hasNote(selected, 3, 3) ||
        hasNote(selected, 5, 4)) &&
      !hasNote(selected, 10, 7) &&
      !hasNote(selected, 11, 7) &&
      !hasNote(selected, 9, 7),
    nameChord: (selected) => {
      if (hasNote(selected, 6, 5)) return "o<sup>add9</sup>";
      else if (hasNote(selected, 8, 5)) return "+<sup>add9</sup>";
      else if (hasNote(selected, 4, 3)) return "<sup>add9</sup>";
      else if (hasNote(selected, 3, 3)) return "m<sup>add9</sup>";
      else if (hasNote(selected, 5, 4)) return "sus4<sup>add9</sup>";
    },
  },
  e11: {
    symbol: "11",
    notes: [
      { semitonesFromRoot: 2, degree: 9 },
      { semitonesFromRoot: 5, degree: 11 },
    ],
    isAvailable: (selected) =>
      (hasNote(selected, 10, 7) ||
        hasNote(selected, 11, 7) ||
        hasNote(selected, 9, 7)) &&
      !hasNote(selected, 2, 2) &&
      !hasNote(selected, 5, 4),
    nameChord: (selected) => {
      if (hasNote(selected, 9, 7)) return "o11";
      else if (hasNote(selected, 8, 5) && hasNote(selected, 10, 7))
        return "+11";
      else if (hasNote(selected, 8, 5) && hasNote(selected, 11, 7))
        return "+<sup>M11</sup>";
      else if (hasNote(selected, 11, 7) && hasNote(selected, 4, 3))
        return "M11";
      else if (hasNote(selected, 11, 7) && hasNote(selected, 3, 3))
        return "m<sup>M11</sup>";
      else if (hasNote(selected, 10, 7) && hasNote(selected, 4, 3)) return "11";
      else if (hasNote(selected, 10, 7) && hasNote(selected, 3, 3))
        return "m11";
    },
  },
  add11: {
    symbol: "add11",
    notes: [{ semitonesFromRoot: 5, degree: 11 }],
    isAvailable: (selected) =>
      !hasNote(selected, 2, 2) && !hasNote(selected, 5, 4),
    nameChord: (selected) => {
      if (hasNote(selected, 8, 5)) {
        if (hasNote(selected, 10, 7)) return "+7<sup>add11</sup>";
        else if (hasNote(selected, 11, 7)) return "+<sup>M7add11</sup>";
        return "+<sup>add11</sup>";
      } else if (hasNote(selected, 4, 3)) {
        if (hasNote(selected, 10, 7)) return "7<sup>add11</sup>";
        else if (hasNote(selected, 11, 7)) return "M7<sup>add11</sup>";
        return "<sup>add11</sup>";
      } else if (hasNote(selected, 10, 7)) return "m7<sup>add11</sup>";
      else if (hasNote(selected, 11, 7)) return "m<sup>M7add11</sup>";
      else if (hasNote(selected, 9, 7)) return "o7<sup>add11</sup>";
      else if (hasNote(selected, 6, 5)) return "o<sup>add11</sup>";
      return "m<sup>add11</sup>";
    },
  },
  e13: {
    symbol: "13",
    notes: [
      { semitonesFromRoot: 2, degree: 9 },
      { semitonesFromRoot: 5, degree: 11 },
      { semitonesFromRoot: 9, degree: 13 },
    ],
    isAvailable: (selected) =>
      (hasNote(selected, 10, 7) || hasNote(selected, 11, 7)) &&
      !hasNote(selected, 2, 2) &&
      !hasNote(selected, 5, 4),
    nameChord: (selected) => {
      if (hasNote(selected, 8, 5) && hasNote(selected, 10, 7)) return "+13";
      else if (hasNote(selected, 8, 5) && hasNote(selected, 11, 7))
        return "+<sup>M13</sup>";
      else if (hasNote(selected, 11, 7) && hasNote(selected, 4, 3))
        return "M13";
      else if (hasNote(selected, 11, 7) && hasNote(selected, 3, 3))
        return "m<sup>M13</sup>";
      else if (hasNote(selected, 10, 7) && hasNote(selected, 4, 3)) return "13";
      else if (hasNote(selected, 10, 7) && hasNote(selected, 3, 3))
        return "m13";
    },
  },
  add13: {
    symbol: "add13",
    notes: [{ semitonesFromRoot: 9, degree: 13 }],
    isAvailable: (selected) =>
      !hasNote(selected, 6, 5) &&
      !hasNote(selected, 2, 2) &&
      !hasNote(selected, 5, 4),
    nameChord: (selected) => {
      if (hasNote(selected, 8, 5)) {
        if (hasNote(selected, 10, 7)) return "+7<sup>add13</sup>";
        else if (hasNote(selected, 11, 7)) return "+<sup>M7add13</sup>";
        return "+<sup>add13</sup>";
      }
      if (hasNote(selected, 4, 3)) {
        if (hasNote(selected, 10, 7)) return "7<sup>add13</sup>";
        else if (hasNote(selected, 11, 7)) return "M7<sup>add13</sup>";
        return "<sup>add13</sup>";
      } else if (hasNote(selected, 10, 7)) return "m7<sup>add13</sup>";
      else if (hasNote(selected, 11, 7)) return "m<sup>M7add13</sup>";
      return "m<sup>add13</sup>";
    },
  },

  /* gérer 6add11 9add13 M9add13 ? */
  e6add11: {
    symbol: "6add11",
    notes: [
      { semitonesFromRoot: 9, degree: 6 },
      { semitonesFromRoot: 5, degree: 11 },
    ],
    isAvailable: (selected) =>
      !hasNote(selected, 10, 7) &&
      !hasNote(selected, 11, 7) &&
      !hasNote(selected, 9, 7) &&
      !hasNote(selected, 2, 2) &&
      !hasNote(selected, 5, 4),
    nameChord: (selected) => {
      if (hasNote(selected, 8, 5)) return "+6<sup>add11</sup>";
      else if (hasNote(selected, 4, 3)) return "6<sup>add11</sup>";
      else if (hasNote(selected, 6, 5)) return "o6<sup>add11</sup>";
      else if (hasNote(selected, 3, 3)) return "m6<sup>add11</sup>";
    },
  },
  e9add13: {
    symbol: "9add13",
    notes: [
      { semitonesFromRoot: 2, degree: 9 },
      { semitonesFromRoot: 9, degree: 13 },
    ],
    isAvailable: (selected) =>
      (hasNote(selected, 4, 3) || hasNote(selected, 3, 3)) &&
      (hasNote(selected, 10, 7) || hasNote(selected, 11, 7)) &&
      !hasNote(selected, 6, 5),
    nameChord: (selected) => {
      if (hasNote(selected, 8, 5)) {
        if (hasNote(selected, 10, 7)) return "+9<sup>add13</sup>";
        return "+<sup>M9add13</sup>";
      } else if (hasNote(selected, 4, 3)) {
        if (hasNote(selected, 10, 7)) return "9<sup>add13</sup>";
        return "M9<sup>add13</sup>";
      } else if (hasNote(selected, 11, 7)) return "m<sup>M9add13</sup>";
      return "m9<sup>add13</sup>";
    },
  },
};

const ExtensionForm = (props) => {
  const {
    rootName,
    selected,
    extension,
    updateExtension,
    setTmpChordName,
  } = props;

  const classes = useStyles();

  useEffect(() => {
    if (extension !== "" && extension !== "none") {
      setTmpChordName(rootName + extensionsList[extension].nameChord(selected));
    }
  }, [extension, rootName, selected, setTmpChordName]);

  const handleExtension = (e) => {
    updateExtension(e.target.value, extensionsList[e.target.value].notes);
  };

  const filteredExtensionsList = Object.keys(extensionsList).map((key) =>
    extensionsList[key].isAvailable(selected) ? (
      <MenuItem key={key} value={key}>
        {extensionsList[key].symbol}
        {key !== "none" ? (
          <span
            dangerouslySetInnerHTML={{
              __html: sanitize(
                `&nbsp;(${rootName}${extensionsList[key].nameChord(selected)})`
              ),
            }}
          />
        ) : (
          ""
        )}
      </MenuItem>
    ) : null
  );
  return (
    <div>
      <FormControl variant='outlined' className={classes.formControl}>
        <TextField
          variant='outlined'
          id='extension'
          select
          label='Extension'
          className={classes.textField}
          value={extension}
          onChange={handleExtension}
          SelectProps={{
            className: classes.select,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin='normal'
        >
          {filteredExtensionsList}
        </TextField>
      </FormControl>
    </div>
  );
};

export default ExtensionForm;
