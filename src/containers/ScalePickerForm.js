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

import scales from "data/scales";

const ScalePickerForm = ({ onPick }) => {
  const dispatch = useDispatch();
  const rootNote = useSelector((state) => state.notePicker.rootNote);
  const useFlats = useSelector((state) => state.notePicker.useFlats);
  const noteNaming = useSelector((state) => state.settings.noteNaming);
  const [tmpScaleInfo, setTmpScaleInfo] = useState(null);
  const { getNoteName } = useNoteNames(noteNaming);

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
          className='option'
          data-category={cat.category}
        >
          {el.fullName.replace(" scale", "")}
          {el.fullName.includes(" scale") && <span>&nbsp;scale</span>}
        </MenuItem>
      );
    });
    return [
      <ListSubheader key={cat.category} className='group' disableSticky>
        {cat.category}
        {cat.hasOwnProperty("subtitle") && (
          <span>&nbsp;{`(${cat.subtitle})`}</span>
        )}
      </ListSubheader>,
      catItems,
    ];
  });
  const scaleListDisabled = rootNote === "";
  const scaleListClasses = ["textField", "scaleList"];
  if (scaleListDisabled) scaleListClasses.push("isDisabled");
  return (
    <div className='paper pickerForm scalePickerForm'>
      <div className='paperInner'>
        <Typography
          className='title'
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

        <FormControl variant='outlined' className='formControl'>
          <TextField
            variant='outlined'
            id='scale'
            select
            label='Scale'
            className={scaleListClasses.join(" ")}
            required
            value={tmpScaleInfo !== null ? tmpScaleInfo.fullName : ""}
            onChange={(e) => {
              if (e.target.value !== undefined) {
                onUpdateScale(e.target.value, e.currentTarget.dataset.category);
              } else {
                e.preventDefault();
              }
            }}
            SelectProps={{
              className: "select",
              MenuProps: {
                classes: { list: "menu menuScale" },
              },
              disabled: scaleListDisabled,
            }}
            InputLabelProps={{
              className: "label",
            }}
            margin='normal'
          >
            {scaleListContents}
          </TextField>
        </FormControl>

        <Fade
          in={tmpScaleInfo !== null}
          mountOnEnter
          unmountOnExit
          timeout={700}
        >
          <div>
            <FormControl className='buttonWrapper'>
              <Button
                className='submitButton'
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
