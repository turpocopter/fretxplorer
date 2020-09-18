import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import tuningPresets from "data/tuningPresets";

import PropTypes from "prop-types";

const Presets = ({ preset, selectPreset, isOpening, isClosing }) => {
  const listContents = tuningPresets.map((cat) => {
    const catItems = cat.tunings.map((el) => (
      <MenuItem
        key={el.id}
        value={el.id}
        data-cat={cat.cat_name}
        className='option'
      >
        {el.id}&nbsp;<span>({el.name})</span>
      </MenuItem>
    ));
    return [
      <ListSubheader key={cat.cat_name} className='group' disableSticky>
        {cat.cat_name}
      </ListSubheader>,
      catItems,
    ];
  });
  const onChangePreset = (e) => {
    if (e.currentTarget.dataset.hasOwnProperty("cat")) {
      const cat = tuningPresets.find(
        (cat) => cat.cat_name === e.currentTarget.dataset.cat
      );
      const preset = cat.tunings.find((tuning) => tuning.id === e.target.value);
      selectPreset(preset.id, preset.tuning);
    } else {
      e.preventDefault();
    }
  };
  const formClasses = ["formControl"];
  if (isOpening || isClosing) formClasses.push("hidden");
  return (
    <div className='presets'>
      <FormControl variant='outlined' className={formClasses.join(" ")}>
        <TextField
          variant='outlined'
          id='tuningPreset'
          select
          label='Tuning presets'
          value={preset}
          onChange={onChangePreset}
          className='textField'
          SelectProps={{
            className: "select",
            MenuProps: {
              className: "menu",
            },
          }}
          InputLabelProps={{
            className: "label",
          }}
          margin='normal'
          size='small'
        >
          {listContents}
        </TextField>
      </FormControl>
    </div>
  );
};

Presets.propTypes = {
  preset: PropTypes.string,
  selectPreset: PropTypes.func.isRequired,
  isOpening: PropTypes.bool,
  isClosing: PropTypes.bool,
};

export default Presets;
