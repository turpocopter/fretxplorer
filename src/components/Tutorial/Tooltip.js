import React, { useState, useEffect } from "react";
import { sanitize } from "dompurify";

import ErrorMarker from "./ErrorMarker";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { getDeviceType } from "utility/common";
import { computePosition } from "utility/tutorial";

const Tooltip = ({
	isVisible,
	step,
	stepData: {
		tutorialLength,
		main,
		small,
		selector,
		boxSettings,
		tipSettings,
		blockNext = null,
		hidePrevious = false,
		autoDiscard = false,
		jumpActions = [],
		extraName = null,
	},
	decrementStep,
	incrementStep,
	jumpToStep,
	validateExtraStep,
	markAsDone,
	shouldFadeIn,
	shouldFadeOut,
	mainTutorialDone,
	closeTutorials,
}) => {
	const [position, setPosition] = useState(null);
	const [showError, setShowError] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [shouldUpdate, setShouldUpdate] = useState(false);

	// jump actions effect
	useEffect(() => {
		console.log("MOUNT", shouldFadeIn);
	}, [shouldFadeIn]);
	useEffect(() => {
		const jaCopy = [...jumpActions];
		const uniqueEvents = [...new Set(jaCopy.map((ja) => ja.event))];
		const listenToJumpActions = (e) => {
			let target = e.target;
			for (const { selector, step } of jaCopy.filter(
				(ja) => ja.event === e.type
			)) {
				while (target !== null) {
					if (target.matches(selector())) {
						e.stopPropagation();
						setIsClosing(true);
						setTimeout(() => {
							e.target.dispatchEvent(e);
							jumpToStep(step);
						}, 300);
						break;
					}
					target = target.parentElement;
				}
			}
		};
		for (const uniqueEvent of uniqueEvents) {
			document.body.addEventListener(uniqueEvent, listenToJumpActions, true);
		}
		return () => {
			for (const uniqueEvent of uniqueEvents) {
				document.body.removeEventListener(
					uniqueEvent,
					listenToJumpActions,
					true
				);
			}
		};
	}, [jumpActions, jumpToStep]);

	useEffect(() => {
		const domElt = document.querySelector(selector());
		let intervalID = null;
		let initPos = () => {};
		// if tooltip is "auto discarded" increment step when element associated to step is clicked
		let discardHandler = (e) => {
			e.stopPropagation();
			setIsClosing(true);
			setTimeout(() => {
				domElt.removeEventListener("click", discardHandler);
				domElt.dispatchEvent(e);
				if (extraName === null) incrementStep();
				else validateExtraStep(extraName);
			}, 300);
			return false;
		};
		if (autoDiscard && domElt) {
			domElt.addEventListener("click", discardHandler);
		}
		// if tooltip is supposed to be visible but element associated to step is absent, wait for element to be there to rerender
		if (isVisible && domElt === null) {
			intervalID = setInterval(() => {
				const newDomElt = document.querySelector(selector());
				if (newDomElt !== null) {
					clearInterval(intervalID);
					intervalID = null;
					setShouldUpdate(!shouldUpdate);
				}
			}, 100);
		}
		// compute tooltip position on mount and on each resize
		if (domElt) {
			const boxSettingsCopy = boxSettings
				? JSON.parse(JSON.stringify(boxSettings))
				: {};
			const tipSettingsCopy = tipSettings
				? JSON.parse(JSON.stringify(tipSettings))
				: {};
			initPos = (e) => {
				console.log(e.type);
				setPosition(computePosition(domElt, boxSettingsCopy, tipSettingsCopy));
			};
			setPosition(computePosition(domElt, boxSettingsCopy, tipSettingsCopy));
			window.addEventListener(
				getDeviceType() === "desktop" ? "resize" : "orientationchange",
				initPos
			);
		}
		return () => {
			if (intervalID !== null) {
				clearInterval(intervalID);
			}
			window.removeEventListener(
				getDeviceType() === "desktop" ? "resize" : "orientationchange",
				initPos
			);
		};
	}, [
		autoDiscard,
		selector,
		boxSettings,
		tipSettings,
		isVisible,
		incrementStep,
		shouldUpdate,
		extraName,
		validateExtraStep,
	]);

	const prevBtnClasses = ["btn prevBtn"];
	const nextBtnClasses = ["btn nextBtn"];
	if (step === 0 || hidePrevious) prevBtnClasses.push("hidden");
	const tooltipClasses = ["tooltipPopover"];
	if (isClosing || shouldFadeOut) tooltipClasses.push("closed");
	else if (isVisible && shouldFadeIn) tooltipClasses.push("open");
	const onPrev = () => {
		setIsClosing(true);
		setTimeout(decrementStep, 300);
	};
	const onNext = () => {
		if (blockNext !== null && blockNext()) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 1000);
		} else {
			setIsClosing(true);
			setTimeout(
				extraName !== null
					? () => validateExtraStep(extraName)
					: step === tutorialLength - 1
					? markAsDone
					: incrementStep,
				300
			);
		}
	};
	const onClose = () => {
		setIsClosing(true);
		setTimeout(closeTutorials, 300);
	};
	return (
		position !== null && (
			<>
				<div className={tooltipClasses.join(" ")} style={{ ...position }}>
					<div className='tooltipContent'>
						<button className='closeBtn' onClick={onClose}>
							<CloseIcon />
						</button>
						<p
							className='main'
							dangerouslySetInnerHTML={{
								__html: sanitize(main()),
							}}
						/>
						<p
							className='small'
							dangerouslySetInnerHTML={{
								__html: sanitize(small()),
							}}
						/>
					</div>
					{!mainTutorialDone && (
						<div className='progressBar'>
							<div className='bar'>
								<div
									className='done'
									style={{
										width:
											(100 * (extraName !== null ? step : step + 1)) /
												tutorialLength +
											"%",
									}}></div>
							</div>

							<div className='counter'>
								{extraName === null ? step + 1 : step}/{tutorialLength}
							</div>
						</div>
					)}
					{!mainTutorialDone ? (
						<div className='tooltipButtons'>
							<button className={prevBtnClasses.join(" ")} onClick={onPrev}>
								<ChevronLeftIcon />
								Previous&nbsp;&nbsp;
							</button>
							<button className={nextBtnClasses.join(" ")} onClick={onNext}>
								&nbsp;&nbsp;
								{step === tutorialLength - 1 && extraName === null ? (
									<>
										Done&nbsp;&nbsp;
										<DoneIcon />
									</>
								) : (
									<>
										Next
										<ChevronRightIcon />
									</>
								)}
							</button>
						</div>
					) : (
						<div className='tooltipButtons extra'>
							<button className='btn' onClick={onNext}>
								OK&nbsp;&nbsp;
								<DoneIcon />
							</button>
						</div>
					)}
					<div
						className={`tip ${position.side}`}
						style={{
							[position.side === "top" || position.side === "bottom"
								? "left"
								: "top"]: position.tip,
						}}></div>
				</div>
				{showError && <ErrorMarker selector={selector()} />}
			</>
		)
	);
};

export default Tooltip;
