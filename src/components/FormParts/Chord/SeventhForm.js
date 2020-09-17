import React, { useEffect } from "react";
import { sanitize } from "dompurify";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import seventhList from "data/chords/seventh";

import PropTypes from "prop-types";

const SeventhForm = (props) => {
  const { rootName, selected, seventh, updateSeventh, setTmpChordName } = props;

  useEffect(() => {
    if (
      seventh !== "" &&
      seventh !== "none" &&
      selected.filter((el) => el.degree > 5 && el.degree !== 7).length === 0
    ) {
      setTmpChordName(seventhList[seventh].nameChord(selected));
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
      <div data-test='seventh-form' className='wrapper'>
        <FormControl variant='outlined' className='formControl'>
          <TextField
            variant='outlined'
            id='seventh-note'
            select
            label='Seventh note'
            className='textField'
            value={seventh}
            onChange={handleSeventh}
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
            {filteredSeventhList}
          </TextField>
        </FormControl>
      </div>
    )
  );
};

SeventhForm.propTypes = {
  rootName: PropTypes.string.isRequired,
  seventh: PropTypes.string,
  selected: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.number.isRequired,
      displayInterval: PropTypes.string.isRequired,
      semitonesFromRoot: PropTypes.number.isRequired,
      displayName: PropTypes.shape({
        alt: PropTypes.string,
        id: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
  updateSeventh: PropTypes.func.isRequired,
  setTmpChordName: PropTypes.func.isRequired,
};

export default SeventhForm;
