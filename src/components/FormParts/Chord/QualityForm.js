import React, { useEffect } from "react";
import { sanitize } from "dompurify";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

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

  useEffect(() => {
    if (quality !== "" && selected.filter((el) => el.degree > 5).length === 0) {
      setTmpChordName(chordQualities[quality].symbol);
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
    <div className='subFormWrapper'>
      <FormControl variant='outlined' className='formControl'>
        <TextField
          variant='outlined'
          id='chord-quality'
          select
          label='Chord Quality'
          className='textField'
          value={quality}
          onChange={handleQuality}
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
          {qualityList}
        </TextField>
      </FormControl>
    </div>
  );
};

export default QualityForm;
