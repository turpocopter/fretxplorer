import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import NoteIntervalSwitch from "components/FormParts/NoteIntervalSwitch";
import ChordPickerForm from "containers/ChordPickerForm";
import Fretboard from "containers/Fretboard";
import Selection from "containers/Selection";
import Tuning from "containers/Tuning";
import Fader from "react-fader";
import Tutorial from "containers/Tutorial";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const ChordPicker = () => {
	const dispatch = useDispatch();
	const chordName = useSelector((state) => state.notePicker.chordName);
	const showIntervals = useSelector((state) => state.settings.showIntervals);
	const tutorialEnabled = useSelector(
		(state) => state.settings.tutorialsEnabled
	);
	const tutorialDone = useSelector(
		(state) => state.settings.tutorialsProgress.chords.done
	);
	const onToggleNotesIntervals = () => {
		return dispatch(actions.toggleNotesIntervals());
	};
	const isBigScreen = useMediaQuery(
		"(min-height: 680px) and (orientation: landscape)"
	);
	const pickerContainerClasses = ["pickerContainer"];
	const fretboardContainerClasses = ["fretboardContainer"];
	if (chordName !== null) {
		pickerContainerClasses.push("hasContent");
		fretboardContainerClasses.push("hasContent");
	}
	useEffect(() => {
		dispatch(actions.reinitSelection());
	}, [dispatch]);
	return (
		<>
			<div className='pickerPage chordPicker'>
				<div key='pickerContainer' className={pickerContainerClasses.join(" ")}>
					<div>
						<Fader
							fadeInTransitionDuration={300}
							fadeOutTransitionDuration={chordName === null ? 0 : 300}
							shouldTransition={(oldChildren, newChildren) => {
								return isBigScreen && oldChildren.key !== newChildren.key;
							}}>
							{chordName === null ? (
								<ChordPickerForm key='picker' />
							) : (
								<Selection key='chord' type='chord' />
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
				<div
					key='fretboardContainer'
					className={fretboardContainerClasses.join(" ")}>
					<Fretboard />
				</div>
			</div>
			{tutorialEnabled && (
				/*!tutorialDone &&*/ <Tutorial
					tutorialName='chords'
					mainTutorialDone={tutorialDone}
				/>
			)}
		</>
	);
};

export default ChordPicker;
