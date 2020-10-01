import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";
import { sanitize } from "dompurify";
import Notes from "components/Selection/Notes";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import useNoteNames from "hooks/noteNames";

const Selection = ({ children, type, extraInfo }) => {
  const dispatch = useDispatch();
  const chordName = useSelector((state) => state.notePicker.chordName);
  const scaleName = useSelector((state) => state.notePicker.scaleName);
  const rootNote = useSelector((state) => state.notePicker.rootNote);
  const selected = useSelector((state) => state.notePicker.selected);
  const namingConvention = useSelector((state) => state.settings.noteNaming);
  const biggerButton = useMediaQuery("(min-width: 600px)");
  const { translateNote } = useNoteNames(namingConvention);

  const rootNoteValue = rootNote + (rootNote >= 4 ? 36 : 48); // we want it at 3rd octave (or 4th if between C and D#)
  const selectedWithValues = selected.map((el) => ({
    ...el,
    midiValue: rootNoteValue + el.semitonesFromRoot + (el.degree > 7 ? 12 : 0),
  }));

  const onDiscardSelection = () => {
    return dispatch(actions.reinitSelection());
  };
  return (
    selected.length > 0 && (
      <div className='selection' data-test='selection-component'>
        <div className='scaleInfo'>
          <div className='scaleHeader'>
            <div>
              <Typography
                className='title'
                variant='h5'
                component='h2'
                color='primary'
                dangerouslySetInnerHTML={{
                  __html: sanitize(
                    `${translateNote(selected[0].displayName)}${
                      type === "scale" ? " " + scaleName : chordName
                    }`
                  ),
                }}
              />
            </div>
            <div className='buttonWrapper'>
              <Button
                className='button'
                variant='contained'
                color='primary'
                size={biggerButton ? "medium" : "small"}
                onClick={onDiscardSelection}
              >
                Pick&nbsp;Another
              </Button>
            </div>
          </div>
          {extraInfo && <div className='extraInfo'>({extraInfo})</div>}
          <Notes
            selectionType={type}
            selectedWithValues={selectedWithValues}
            namingConvention={namingConvention}
          ></Notes>
        </div>
        {/* we might have an instance of Modes as child when selection is a scale */}
        {children}
      </div>
    )
  );
};

export default Selection;
