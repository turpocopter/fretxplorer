import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import RootForm from "components/FormParts/RootForm";
import QualityForm from "components/FormParts/Chord/QualityForm";
import SeventhForm from "components/FormParts/Chord/SeventhForm";
import ExtensionForm from "components/FormParts/Chord/ExtensionForm";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import useNoteNames from "hooks/noteNames";

const ChordPickerForm = () => {
	const [quality, setQuality] = useState("");
	const [seventh, setSeventh] = useState("");
	const [extension, setExtension] = useState("");
	const [tmpChordName, setTmpChordName] = useState("");

	const dispatch = useDispatch();
	const rootNote = useSelector((state) => state.notePicker.rootNote);
	const useFlats = useSelector((state) => state.notePicker.useFlats);
	const selected = useSelector((state) => state.notePicker.selected);
	const noteNaming = useSelector((state) => state.settings.noteNaming);
	const { getNoteName } = useNoteNames(noteNaming);

	const onUpdateRoot = (rootNote) => {
		return dispatch(actions.updateRoot(rootNote, noteNaming));
	};
	const onUpdateQuality = (name, notes) => {
		setQuality(name);
		setSeventh("");
		setExtension("");
		return dispatch(actions.updateQuality(notes));
	};
	const onUpdateSeventh = (name, semitonesFromRoot) => {
		setSeventh(name);
		setExtension("");
		return dispatch(actions.updateSeventh(semitonesFromRoot));
	};
	const onUpdateExtension = (name, notes) => {
		setExtension(name);
		return dispatch(actions.updateExtension(notes));
	};
	const onToggleFlats = () => dispatch(actions.toggleFlats(noteNaming));
	const onPickChord = () => {
		return dispatch(actions.updateChordName(tmpChordName));
	};

	const rootName = getNoteName(rootNote, useFlats);
	return (
		<div
			className='paper pickerForm chordPickerForm'
			data-test='chord-picker-form'>
			<div className='paperInner'>
				<Typography
					className='title'
					component='h2'
					variant='h5'
					align='center'>
					Pick a chord!
				</Typography>
				<RootForm
					rootNote={rootNote}
					useFlats={useFlats}
					noteNaming={noteNaming}
					updateRoot={onUpdateRoot}
					toggleFlats={onToggleFlats}
				/>
				<QualityForm
					rootName={rootName}
					quality={quality}
					selected={selected}
					updateQuality={onUpdateQuality}
					setTmpChordName={setTmpChordName}
					className='quality'
					isDisabled={rootNote === ""}
				/>
				<SeventhForm
					rootName={rootName}
					seventh={seventh}
					selected={selected}
					updateSeventh={onUpdateSeventh}
					setTmpChordName={setTmpChordName}
					isDisabled={quality === ""}
				/>
				<ExtensionForm
					rootName={rootName}
					selected={selected}
					extension={extension}
					updateExtension={onUpdateExtension}
					setTmpChordName={setTmpChordName}
					isDisabled={seventh === ""}
				/>
				<Fade in={quality !== ""} mountOnEnter unmountOnExit timeout={700}>
					<div>
						<FormControl className='buttonWrapper'>
							<Button
								className='submitButton'
								variant='contained'
								color='primary'
								size='large'
								onClick={onPickChord}>
								PICK&nbsp;
								<span
									dangerouslySetInnerHTML={{ __html: rootName + tmpChordName }}
								/>
							</Button>
						</FormControl>
					</div>
				</Fade>
			</div>
		</div>
	);
};

export default ChordPickerForm;
