import React, { useEffect } from "react";
import { sanitize } from "dompurify";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import chordQualities from "data/chords/qualities";

import PropTypes from "prop-types";

const QualityForm = (props) => {
  const {
    rootName,
    quality,
    selected,
    updateQuality,
    setTmpChordName,
    isDisabled,
  } = props;

  useEffect(() => {
    if (quality !== "" && selected.filter((el) => el.degree > 5).length === 0) {
      setTmpChordName(chordQualities[quality].symbol);
    }
  }, [quality, rootName, selected, setTmpChordName]);

  const handleQuality = (e) => {
    updateQuality(e.target.value, chordQualities[e.target.value].notes);
  };
  const qualityList = Object.keys(chordQualities).map((key) => (
    <MenuItem className='qualityItem' key={key} value={key}>
      {key}
      <span
        dangerouslySetInnerHTML={{
          __html: sanitize(`&nbsp;(${rootName}${chordQualities[key].symbol})`),
        }}
      />
    </MenuItem>
  ));
  const textFieldClasses = ["textField"];
  if (isDisabled) textFieldClasses.push("isDisabled");
  return (
    <div data-test='quality-form' className='subFormWrapper qualityForm'>
      <FormControl variant='outlined' className='formControl'>
        <TextField
          variant='outlined'
          id='chord-quality'
          select
          label='Chord Quality'
          className={textFieldClasses.join(" ")}
          value={quality}
          onChange={handleQuality}
          required
          SelectProps={{
            className: "select",
            MenuProps: {
              classes: { list: "menu pickerSubMenu" },
            },
            disabled: isDisabled,
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

QualityForm.propTypes = {
  rootName: PropTypes.string.isRequired,
  quality: PropTypes.string,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.number.isRequired,
      displayInterval: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      semitonesFromRoot: PropTypes.number.isRequired,
      displayName: PropTypes.shape({
        alt: PropTypes.string,
        id: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
  updateQuality: PropTypes.func.isRequired,
  setTmpChordName: PropTypes.func.isRequired,
};

export default QualityForm;
