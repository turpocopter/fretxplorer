import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import Portal from "hoc/Portal";
import Tooltip from "components/Tutorial/Tooltip";

const Tutorial = ({ tutorialName }) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipShouldFadeIn, setTooltipShouldFadeIn] = useState(true);
	const [stepData, setStepData] = useState(null);
	const dispatch = useDispatch();
	const tutorialStep = useSelector(
		(state) => state.settings.tutorialsProgress[tutorialName].step
	);
	const noteNaming = useSelector((state) => state.settings.noteNaming);
	const leftHanded = useSelector((state) => state.settings.leftHanded);
	const rootNote = useSelector((state) => state.notePicker.rootNote);
	const useFlats = useSelector((state) => state.notePicker.useFlats);
	const selected = useSelector((state) => state.notePicker.selected);
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
	useEffect(() => {
		async function loadTutorial(tutorialName) {
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
			});
			let jumpActions = [];
			tutorialSteps.forEach(({ selector, autoJumpAction = null }, i) => {
				if (autoJumpAction !== null && i > tutorialStep) {
					jumpActions.push({ selector, event: autoJumpAction, step: i + 1 });
				}
			});
			return tutorialSteps.length > tutorialStep
				? {
						...tutorialSteps[tutorialStep],
						tutorialLength: tutorialSteps.length,
						jumpActions,
				  }
				: null;
		}
		loadTutorial(tutorialName).then((data) => {
			if (data) {
				isLoaded.current = true;
				setStepData(data);
				setShowTooltip(true);
				if (isLoaded.current && tooltipShouldFadeIn)
					setTimeout(() => setTooltipShouldFadeIn(false), 300);
			}
		});
	}, [
		tutorialName,
		tutorialStep,
		leftHanded,
		noteNaming,
		rootNote,
		useFlats,
		selected,
		tooltipShouldFadeIn,
	]);

	return (
		stepData !== null && (
			<Portal>
				<Tooltip
					isVisible={showTooltip}
					step={tutorialStep}
					stepData={stepData}
					decrementStep={onDecrementStep}
					incrementStep={onIncrementStep}
					jumpToStep={onJumpToStep}
					markAsDone={onFinishTutorial}
					shouldFadeIn={tooltipShouldFadeIn}
				/>
			</Portal>
		)
	);
};

export default Tutorial;
