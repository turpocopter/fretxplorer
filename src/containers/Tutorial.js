import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import Portal from "hoc/Portal";
import Tooltip from "components/Tutorial/Tooltip";
import Invite from "components/Tutorial/Invite";
import DisableNotice from "components/Tutorial/DisableNotice";
import RotateNotice from "components/Tutorial/RotateNotice";

const Tutorial = ({ tutorialName, mainTutorialDone, isClosing }) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [showInvite, setShowInvite] = useState(false);
	const [showNotice, setShowNotice] = useState(false);
	const [tooltipShouldFadeIn, setTooltipShouldFadeIn] = useState(true);
	const [tooltipShouldFadeOut, setTooltipShouldFadeOut] = useState(false);
	const [inviteShouldFadeIn, setInviteShouldFadeIn] = useState(true);
	const [noticeShouldFadeIn, setNoticeShouldFadeIn] = useState(true);
	const [stepData, setStepData] = useState(null);
	const dispatch = useDispatch();
	const isNewUser = useSelector((state) => state.settings.isNewUser);
	const tutorialStep = useSelector(
		(state) => state.settings.tutorialsProgress[tutorialName].step
	);
	const tutorialExtras = useSelector(
		(state) => state.settings.tutorialsProgress.extras
	);
	const noteNaming = useSelector((state) => state.settings.noteNaming);
	const leftHanded = useSelector((state) => state.settings.leftHanded);
	const rootNote = useSelector((state) => state.notePicker.rootNote);
	const useFlats = useSelector((state) => state.notePicker.useFlats);
	const selected = useSelector((state) => state.notePicker.selected);
	const chordName = useSelector((state) => state.notePicker.chordName);
	const scaleName = useSelector((state) => state.notePicker.scaleName);
	const scaleInfo = useSelector((state) => state.notePicker.scaleInfo);
	const modeIndex = useSelector((state) => state.notePicker.modeIndex);
	const tuning = useSelector((state) => state.settings.tuning);
	const parallelModes = useSelector((state) => state.settings.parallelModes);
	const isLoaded = useRef(false);
	const onDecrementStep = () => {
		return dispatch(actions.decrementTutorialStep(tutorialName));
	};
	const onIncrementStep = () => {
		return dispatch(actions.incrementTutorialStep(tutorialName));
	};
	const onJumpToStep = (step) => {
		return dispatch(actions.jumpToTutorialStep(tutorialName, step));
	};
	const onFinishTutorial = () => {
		return dispatch(actions.finishTutorial(tutorialName));
	};
	const onValidateExtraStep = (extraName) => {
		return dispatch(actions.validateExtraTutorialStep(extraName));
	};
	const enableTutorials = () => {
		return dispatch(actions.enableTutorials());
	};
	const closeTutorials = () => {
		return dispatch(actions.closeTutorials());
	};
	const disableTutorials = () => {
		return dispatch(actions.disableTutorials());
	};
	useEffect(() => {
		setTooltipShouldFadeIn(true);
		let i = setTimeout(() => {
			clearInterval(i);
			i = null;
			setTooltipShouldFadeIn(false);
		}, 300);
		return () => {
			if (i !== null) {
				clearInterval(i);
			}
		};
	}, [tutorialStep, tutorialName]);
	useEffect(() => {
		const loadTutorial = async (tutorialName) => {
			if (mainTutorialDone) return null;
			const tutorialPromise = await import(
				`../data/tutorials/${tutorialName}.js`
			);
			const getTutorialSteps = tutorialPromise[`${tutorialName}Tutorial`];
			const tutorialSteps = getTutorialSteps({
				noteNaming,
				leftHanded,
				rootNote,
				useFlats,
				selected,
				chordName,
				scaleName,
				tuning,
			});
			let jumpActions = [];
			tutorialSteps.forEach(({ selector, autoJumpAction = null }, i) => {
				if (autoJumpAction !== null && i > tutorialStep) {
					jumpActions.push({ selector, event: autoJumpAction, step: i + 1 });
				}
			});
			return tutorialSteps.length > tutorialStep &&
				tutorialSteps[tutorialStep].condition()
				? {
						...tutorialSteps[tutorialStep],
						tutorialLength: tutorialSteps.length,
						jumpActions,
				  }
				: null;
		};
		const loadTutorialExtras = async (
			tutorialExtras,
			tutorialName,
			tutorialStep
		) => {
			const extrasPromise = await import(`../data/tutorials/extras.js`);
			const getExtraSteps = extrasPromise.extrasTutorial;
			const extraSteps = getExtraSteps({
				noteNaming,
				leftHanded,
				rootNote,
				useFlats,
				selected,
				scaleName,
				scaleInfo,
				tuning,
				parallelModes,
				modeIndex,
				tutorialName,
				tutorialStep,
			});
			for (const step in extraSteps) {
				if (tutorialExtras[step] === true) delete extraSteps[step];
			}
			return extraSteps;
		};
		Promise.all([
			loadTutorial(tutorialName),
			loadTutorialExtras(tutorialExtras, tutorialName, tutorialStep),
		]).then(([data, extrasData]) => {
			let extraData = null;
			for (const extraName in extrasData) {
				if (extrasData[extraName].condition()) {
					extraData = extrasData[extraName];
					delete extraData.condition;
					extraData.extraName = extraName;
					break;
				}
			}
			isLoaded.current = true;
			let newStepData = null;
			if (!extraData) {
				newStepData = data;
			} else if (!data) {
				newStepData = extraData;
			} else {
				newStepData = {
					...extraData,
					tutorialLength: data.tutorialLength,
					jumpActions: data.jumpActions,
				};
			}
			setStepData(newStepData);
			setShowTooltip(true);
			if (isLoaded.current && tooltipShouldFadeIn) {
				setTimeout(() => setTooltipShouldFadeIn(false), 300);
			}
		});
	}, [
		showInvite,
		tutorialName,
		tutorialStep,
		tutorialExtras,
		leftHanded,
		noteNaming,
		rootNote,
		useFlats,
		selected,
		tuning,
		tooltipShouldFadeIn,
		mainTutorialDone,
		modeIndex,
		parallelModes,
		scaleInfo,
		scaleName,
		chordName,
	]);
	useEffect(() => {
		if (isNewUser) {
			setShowInvite(true);
			if (inviteShouldFadeIn) {
				setTimeout(() => setInviteShouldFadeIn(false), 1800);
			}
		}
	}, [isNewUser, inviteShouldFadeIn]);
	useEffect(() => {
		if (isClosing) {
			setShowNotice(true);
			if (noticeShouldFadeIn) {
				setTimeout(() => setNoticeShouldFadeIn(false), 500);
			}
		}
	}, [isClosing, noticeShouldFadeIn]);
	useEffect(() => {
		const startFadeOut = () => {
			setTooltipShouldFadeOut(true);
		};
		const links = document.querySelectorAll(".MainMenu .Link:not(.activeLink)");
		links.forEach((el) => {
			el.addEventListener("click", startFadeOut);
		});
		return () => {
			links.forEach((el) => {
				el.removeEventListener("click", startFadeOut);
			});
		};
	}, []);
	return (
		stepData !== null && (
			<Portal>
				{isNewUser ? (
					<Invite
						isVisible={showInvite}
						shouldFadeIn={inviteShouldFadeIn}
						enableTutorials={enableTutorials}
						closeTutorials={closeTutorials}
					/>
				) : isClosing ? (
					<DisableNotice
						isVisible={showNotice}
						shouldFadeIn={noticeShouldFadeIn}
						disableTutorials={disableTutorials}
					/>
				) : (
					<Tooltip
						isVisible={showTooltip}
						step={tutorialStep}
						stepData={stepData}
						decrementStep={onDecrementStep}
						incrementStep={onIncrementStep}
						jumpToStep={onJumpToStep}
						markAsDone={onFinishTutorial}
						validateExtraStep={onValidateExtraStep}
						shouldFadeIn={tooltipShouldFadeIn}
						shouldFadeOut={tooltipShouldFadeOut}
						mainTutorialDone={mainTutorialDone}
						closeTutorials={closeTutorials}
					/>
				)}
				<RotateNotice />
			</Portal>
		)
	);
};

export default Tutorial;
