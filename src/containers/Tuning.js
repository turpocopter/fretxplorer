import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import Presets from "components/Tuning/Presets";
import Peg from "components/Tuning/Peg";
import useNoteNames from "hooks/noteNames";
import withMidiSounds from "hoc/withMidiSounds";
import { tuningPresetsSimpleList as allPresets } from "data/tuningPresets";

import fork from "assets/fork.svg";
import SettingsIcon from "@material-ui/icons/Settings";
import CancelIcon from "@material-ui/icons/Cancel";
import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

let intervalID = null;

const Tuning = ({
	playNote,
	playMelody,
	getNoteVal,
	alwaysOpen = false,
	doNotFlipOver = false,
}) => {
	const dispatch = useDispatch();
	const tuning = useSelector((state) => state.settings.tuning);
	const preset = useSelector((state) => state.settings.tuningPreset);
	const useFlats = useSelector((state) => state.settings.useFlats);
	const noteNaming = useSelector((state) => state.settings.noteNaming);
	const isLeftHanded = useSelector((state) => state.settings.leftHanded);
	const { getNoteName } = useNoteNames(noteNaming);
	const [isOpen, setIsOpen] = useState(alwaysOpen);
	const [activePeg, setActivePeg] = useState(null);
	const [isLinked, setIsLinked] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isOpening, setIsOpening] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isLandscape, setIsLandscape] = useState(
		window.innerWidth / window.innerHeight
	);

	useEffect(() => {
		return () => {
			if (intervalID !== null) {
				clearInterval(intervalID);
			}
		};
	}, []);

	useEffect(() => {
		if (!alwaysOpen) {
			window.addEventListener("resize", (event) => {
				const isNowLandscape = window.innerWidth / window.innerHeight;
				if (isNowLandscape !== isLandscape) {
					setIsOpen(false);
					setIsLinked(false);
					setIsLandscape(isNowLandscape);
				}
			});
		}
	}, [alwaysOpen, isLandscape]);

	// set correct preset if the right notes have been manually selected
	useEffect(() => {
		if (preset === "") {
			const currentPreset = allPresets.find((p) => {
				return Array.from(Array(6).keys()).reduce((acc, cur) => {
					return (
						acc &&
						p.tuning[cur].note === tuning[cur].note &&
						p.tuning[cur].octave === tuning[cur].octave
					);
				}, true);
			});
			if (Boolean(currentPreset) && preset !== currentPreset) {
				dispatch(
					actions.setTuningPreset(currentPreset.tuning, currentPreset.id)
				);
			}
		}
	}, [preset, tuning, dispatch]);

	const onTuneUpString = (stringId) => {
		return dispatch(actions.tuneUpString(stringId));
	};
	const onTuneDownString = (stringId) => {
		return dispatch(actions.tuneDownString(stringId));
	};
	const onTuneUpAll = () => {
		return dispatch(actions.tuneUpAll());
	};
	const onTuneDownAll = () => {
		return dispatch(actions.tuneDownAll());
	};
	const onClickPeg = (stringId, note, octave) => {
		if (!activePeg) {
			setActivePeg(stringId);
			playNote(note, octave);
			setTimeout(() => {
				setActivePeg(null);
			}, 1000);
		}
	};
	const onClickPlay = () => {
		if (!activePeg) {
			setIsPlaying(true);
			playMelody(
				tuning.map((el) => ({ n: el.note, o: el.octave })),
				1,
				null,
				true
			);
			let stringCounter = 6;
			setActivePeg(6);
			intervalID = setInterval(() => {
				stringCounter--;
				setActivePeg(stringCounter);
				if (stringCounter === 1) {
					clearInterval(intervalID);
					setTimeout(() => {
						setActivePeg(null);
						setIsPlaying(false);
					}, 1000);
				}
			}, 1000);
		}
	};
	const onSelectPreset = (id, tuning) => {
		//setPreset(id);
		return dispatch(actions.setTuningPreset(tuning, id));
	};
	const isGlobalTuningEnabled = (isDown = false) =>
		tuning.every((el) =>
			isDown
				? el.reference - getNoteVal(el.note, el.octave) < 9
				: getNoteVal(el.note, el.octave) - el.reference < 9
		);
	const onOpen = () => {
		setIsOpening(true);
		setTimeout(() => {
			setIsOpen(true);
		}, 100);
		setTimeout(() => {
			setIsOpening(false);
		}, 300);
	};
	const onClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsOpen(false);
		}, 200);
		setTimeout(() => {
			setIsClosing(false);
			setIsLinked(false);
		}, 400);
	};
	const pegList = tuning.map((el) => (
		<Peg
			key={el.stringId}
			stringId={el.stringId}
			tuning={{ n: el.note, o: el.octave }}
			noteNaming={noteNaming}
			useFlats={useFlats}
			getNoteName={getNoteName}
			isActive={activePeg === el.stringId}
			isLinked={isLinked}
			isOpening={isOpening}
			isClosing={isClosing}
			onClickPeg={() => onClickPeg(el.stringId, el.note, el.octave)}
			isOpen={isOpen || isOpening}
			alwaysOpen={alwaysOpen}
			tuneUp={onTuneUpString}
			tuneDown={onTuneDownString}
			tuneUpDisabled={getNoteVal(el.note, el.octave) - el.reference === 9}
			tuneDownDisabled={el.reference - getNoteVal(el.note, el.octave) === 9}
		/>
	));
	const wrapperClasses = ["tuning"];
	const pegsClasses = ["pegs"];
	const discardClasses = ["discard"];
	const playBtnClasses = ["playBtnOpen"];
	const linkStringsClasses = ["linkStrings"];
	const settingClasses = ["settings"];
	const forkClasses = ["forkWrapper"];
	if (alwaysOpen) {
		wrapperClasses.push("alwaysOpen");
		pegsClasses.push("alwaysOpen");
		settingClasses.push("alwaysOpen");
	}
	if (isOpening) {
		wrapperClasses.push("opening");
	}
	if (isOpen || isOpening) {
		wrapperClasses.push("active");
		pegsClasses.push("active");
	}
	if (isLeftHanded && !doNotFlipOver) {
		pegsClasses.push("reversed");
	}
	if (isPlaying) {
		playBtnClasses.push("active");
	}
	if (isLinked) {
		linkStringsClasses.push("active");
	}
	if (isOpening || isClosing) {
		settingClasses.push("hidden");
		forkClasses.push("hidden");
		discardClasses.push("hidden");
		playBtnClasses.push("hidden");
		linkStringsClasses.push("hidden");
	}
	return (
		<>
			<div className={wrapperClasses.join(" ")}>
				{isOpen && (
					<Presets
						preset={preset}
						isOpening={isOpening}
						isClosing={isClosing}
						selectPreset={onSelectPreset}
						getNoteName={getNoteName}
						noteNaming={noteNaming}
					/>
				)}

				<div className={pegsClasses.join(" ")}>
					{!isOpen && (
						<div className={forkClasses.join(" ")} onClick={onClickPlay}>
							<img className='fork' src={fork} alt='Tuning' />
						</div>
					)}
					{isOpen && isLinked && (
						<div className='tuneBtnWrapper tuneBtnDownWrapper'>
							<button
								className='tuneBtn'
								onClick={onTuneDownAll}
								disabled={!isGlobalTuningEnabled(true)}>
								<RemoveCircleIcon />
							</button>
						</div>
					)}
					{pegList}
					{isOpen && isLinked && (
						<div className='tuneBtnWrapper tuneBtnUpWrapper'>
							<button
								className='tuneBtn'
								onClick={onTuneUpAll}
								disabled={!isGlobalTuningEnabled()}>
								<AddCircleIcon />
							</button>
						</div>
					)}
					{!isOpen && (
						<div className={settingClasses.join(" ")} onClick={onOpen}>
							<SettingsIcon fontSize='inherit' />
						</div>
					)}
				</div>

				{isOpen && !alwaysOpen && (
					<div className={discardClasses.join(" ")} onClick={onClose}>
						<CancelIcon fontSize='inherit' />
					</div>
				)}

				{isOpen && (
					<>
						<div className={playBtnClasses.join(" ")} onClick={onClickPlay}>
							<PlayArrowIcon fontSize='inherit' />
						</div>
						<div
							className={linkStringsClasses.join(" ")}
							onClick={() => setIsLinked(!isLinked)}>
							{isLinked ? (
								<LinkOffIcon fontSize='inherit' />
							) : (
								<LinkIcon fontSize='inherit' />
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default withMidiSounds(Tuning);
