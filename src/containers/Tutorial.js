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
	const tutorialExtras = useSelector(
		(state) => state.settings.tutorialsProgress.extras
	);
	const noteNaming = useSelector((state) => state.settings.noteNaming);
	const leftHanded = useSelector((state) => state.settings.leftHanded);
	const rootNote = useSelector((state) => state.notePicker.rootNote);
	const useFlats = useSelector((state) => state.notePicker.useFlats);
	const selected = useSelector((state) => state.notePicker.selected);
	const tuning = useSelector((state) => state.settings.tuning);
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
	useEffect(() => {
		const loadTutorial = async (tutorialName) => {
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
				tuning,
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
				tuning,
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
			if (data) {
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
				if (!extraData) {
					setStepData(data);
				} else {
					extraData = {
						...extraData,
						tutorialLength: data.tutorialLength,
						jumpActions: data.jumpActions,
					};
					setStepData(extraData);
				}
				setShowTooltip(true);
				if (isLoaded.current && tooltipShouldFadeIn)
					setTimeout(() => setTooltipShouldFadeIn(false), 300);
			}
		});
	}, [
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
					validateExtraStep={onValidateExtraStep}
					shouldFadeIn={tooltipShouldFadeIn}
				/>
			</Portal>
		)
	);
};

export default Tutorial;
