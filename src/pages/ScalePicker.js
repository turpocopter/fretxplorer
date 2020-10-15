import React, { /*useState,*/ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import NoteIntervalSwitch from "components/FormParts/NoteIntervalSwitch";
import ScalePickerForm from "containers/ScalePickerForm";
import Fretboard from "containers/Fretboard";
import Selection from "containers/Selection";
import Tuning from "containers/Tuning";
import Fader from "react-fader";
import Modes from "components/Selection/Modes";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const ScalePicker = () => {
  const dispatch = useDispatch();
  const scaleName = useSelector((state) => state.notePicker.scaleName);
  const showIntervals = useSelector((state) => state.settings.showIntervals);
  const scaleInfo = useSelector((state) => state.notePicker.scaleInfo);
  const modeIndex = useSelector((state) => state.notePicker.modeIndex);
  const parallelModes = useSelector((state) => state.settings.parallelModes);
  const selected = useSelector((state) => state.notePicker.selected);
  const namingConvention = useSelector((state) => state.settings.noteNaming);

  const refForExtraInfo =
    modeIndex > 0 ? scaleInfo.modes[modeIndex] : scaleInfo;
  const extraInfo =
    refForExtraInfo !== null
      ? refForExtraInfo.hasOwnProperty("aliases")
        ? `also known as: ${refForExtraInfo.aliases.join(", ")}`
        : refForExtraInfo.hasOwnProperty("subtitle")
        ? refForExtraInfo.subtitle
        : null
      : null;

  const onChangeMode = (newModeIndex) => {
    return dispatch(actions.updateMode(newModeIndex, parallelModes));
  };
  const onPreviousMode = () => {
    return dispatch(
      actions.updateMode(
        modeIndex > 0 ? modeIndex - 1 : selected.length - 1,
        parallelModes
      )
    );
  };
  const onNextMode = () => {
    return dispatch(
      actions.updateMode(
        modeIndex === selected.length - 1 ? 0 : modeIndex + 1,
        parallelModes
      )
    );
  };
  const onToggleParallelModes = () => {
    return dispatch(actions.toggleParallelModes());
  };

  const onToggleNotesIntervals = () => {
    return dispatch(actions.toggleNotesIntervals());
  };

  const isBigScreen = useMediaQuery(
    "(min-height: 680px) and (orientation: landscape)"
  );
  useEffect(() => {
    dispatch(actions.reinitSelection());
  }, [dispatch]);

  const pickerContainerClasses = ["pickerContainer"];
  const fretboardContainerClasses = ["fretboardContainer"];
  if (scaleName !== null) {
    pickerContainerClasses.push("hasContent");
    fretboardContainerClasses.push("hasContent");
  }

  const modesComponent = scaleInfo !== null &&
    scaleInfo.hasOwnProperty("modes") &&
    scaleInfo.modes !== null && (
      <Modes
        modes={scaleInfo.modes}
        current={modeIndex}
        setCurrent={onChangeMode}
        pickPrevious={onPreviousMode}
        pickNext={onNextMode}
        selected={selected}
        parallelModes={parallelModes}
        toggleParallelModes={onToggleParallelModes}
        namingConvention={namingConvention}
      />
    );
  return (
    <div className='pickerPage scalePicker'>
      <div key='pickerContainer' className={pickerContainerClasses.join(" ")}>
        <div>
          <Fader
            fadeInTransitionDuration={300}
            fadeOutTransitionDuration={scaleName === null ? 0 : 300}
            shouldTransition={(oldChildren, newChildren) => {
              return isBigScreen && oldChildren.key !== newChildren.key;
            }}
          >
            {scaleName === null ? (
              <ScalePickerForm key='picker' />
            ) : (
              <Selection key='selection' type='scale' extraInfo={extraInfo}>
                {isBigScreen && modesComponent}
              </Selection>
            )}
          </Fader>
        </div>
        <div className='persistentTuner'>
          <Tuning alwaysOpen={true} doNotFlipOver={true} />
          <div className='switchUnderTuner'>
            <NoteIntervalSwitch
              showIntervals={showIntervals}
              toggleNotesIntervals={onToggleNotesIntervals}
            />
          </div>
        </div>
      </div>
      {!isBigScreen && <div className='modesContainer'>{modesComponent}</div>}
      <div
        key='fretboardContainer'
        className={fretboardContainerClasses.join(" ")}
      >
        <Fretboard />
      </div>
    </div>
  );
};

export default ScalePicker;
