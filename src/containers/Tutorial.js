import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

import { Transition } from "react-transition-group";

import Portal from "hoc/Portal";
import Tooltip from "components/Tutorial/Tooltip";

const Tutorial = ({ tutorialName }) => {
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
	useEffect(() => {
		async function loadTutorial(tutorialName) {
			const tutorialPromise = await import(
				`../data/tutorials/${tutorialName}.js`
			);
			const tutorialSteps = tutorialPromise[`${tutorialName}Tutorial`];
			return tutorialSteps.length > tutorialStep
				? {
						...tutorialSteps[tutorialStep],
						tutorialLength: tutorialSteps.length,
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
				/>
			</Portal>
		)
	);
};

export default Tutorial;
