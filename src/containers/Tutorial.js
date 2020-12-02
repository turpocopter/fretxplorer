import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import Portal from "hoc/Portal";
import Tooltip from "components/Tutorial/Tooltip";

const Tutorial = ({ tutorialName, tutorialRefs }) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const [stepData, setStepData] = useState(null);
	const dispatch = useDispatch();
	const tutorialStep = useSelector(
		(state) => state.settings.tutorialsProgress[tutorialName].step
	);
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
			const tutorialSteps = tutorialPromise[`${tutorialName}Tutorial`];
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
				setStepData(data);
				setShowTooltip(true);
			}
		});
	}, [tutorialName, tutorialStep]);

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
				/>
			</Portal>
		)
	);
};

export default Tutorial;
