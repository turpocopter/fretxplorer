import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import NoteIntervalSwitch from "components/FormParts/NoteIntervalSwitch";
import Tuning from "containers/Tuning";
import FretMarkerList from "components/FretboardElements/FretMarkerList/FretMarkerList";
import StringList from "components/FretboardElements/StringList/StringList";
import withMidiSounds from "hoc/withMidiSounds";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const Fretboard = (props) => {
	const dispatch = useDispatch();
	const rootNote = useSelector((state) => state.notePicker.rootNote);
	const selectedNotes = useSelector((state) => state.notePicker.selected);
	const noteNaming = useSelector((state) => state.settings.noteNaming);
	const isLeftHanded = useSelector((state) => state.settings.leftHanded);
	const tuning = useSelector((state) => state.settings.tuning);
	const showIntervals = useSelector((state) => state.settings.showIntervals);
	const useFlats = useSelector((state) => state.notePicker.useFlats);

	const onToggleNotesIntervals = () => {
		return dispatch(actions.toggleNotesIntervals());
	};
	const fullFretboard = useMediaQuery("(min-width: 1024px)");
	const nbFrets = fullFretboard ? 24 : 16;
	const wrapperClasses = ["fretboardWrapper"];
	const scrollerClasses = ["fretboardScroller"];
	const switchClasses = ["noteIntervalSwitch"];

	if (isLeftHanded) {
		wrapperClasses.push("leftHanded");
		scrollerClasses.push("leftHanded");
		switchClasses.push("leftHanded");
	}
	return (
		<div className='fretboardRoot'>
			<div className={switchClasses.join(" ")}>
				<NoteIntervalSwitch
					showIntervals={showIntervals}
					toggleNotesIntervals={onToggleNotesIntervals}
				/>
			</div>
			<div className={wrapperClasses.join(" ")}>
				<div className={scrollerClasses.join(" ")}>
					<Tuning alwaysOpen={false} />
					<div className='fretboardInner'>
						<FretMarkerList nbFrets={nbFrets} isLeftHanded={isLeftHanded} />
						<StringList
							tuning={tuning}
							rootNote={rootNote}
							selectedNotes={selectedNotes}
							showIntervals={showIntervals}
							nbFrets={nbFrets}
							noteNaming={noteNaming}
							playNote={props.playNote}
							isLeftHanded={isLeftHanded}
							useFlats={useFlats}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withMidiSounds(Fretboard);
