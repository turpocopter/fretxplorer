import React, { useState, useEffect } from "react";
import { sanitize } from "dompurify";

import ErrorMarker from "./ErrorMarker";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
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
		autoDiscard = false,
		jumpActions,
	},
	decrementStep,
	incrementStep,
	jumpToStep,
}) => {
	const [position, setPosition] = useState(null);
	const [showError, setShowError] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [shouldUpdate, setShouldUpdate] = useState(false);

	// jump actions effect
	useEffect(
		() => {
			const jaCopy = JSON.parse(JSON.stringify(jumpActions));
			const jaHandler = (e, step) => {
				e.stopPropagation();
				setIsClosing(true);
				setTimeout(() => {
					e.target.dispatchEvent(e);
					jumpToStep(step);
				}, 300);
			};
			for (const ja of jaCopy) {
				const el = document.querySelector(ja.selector);
				if (el !== null) {
					ja.handler = (e) => {
						jaHandler(e, ja.step);
					};
					el.addEventListener(ja.event, ja.handler);
				}
			}
			return () => {
				//if (intervalID !== null) {
				for (const ja of jaCopy) {
					if (ja.hasOwnProperty("handler")) {
						document
							.querySelector(ja.selector)
							.removeEventListener(ja.event, ja.handler);
					}
				}
				//}
			};
		} /*, [jumpActions, jumpToStep]*/
	);

	useEffect(() => {
		const domElt = document.querySelector(selector);
		let intervalID = null;
		// if tooltip is "auto discarded" increment step when element associated to step is clicked
		let discardHandler = (e) => {
			e.stopPropagation();
			setIsClosing(true);
			setTimeout(() => {
				domElt.removeEventListener("click", discardHandler);
				domElt.dispatchEvent(e);
				incrementStep();
			}, 300);
			return false;
		};
		if (autoDiscard && domElt) {
			domElt.addEventListener("click", discardHandler);
		}
		// if tooltip is supposed to be visible but element associated to step is absent, wait for element to be there to rerender
		if (isVisible && domElt === null) {
			intervalID = setInterval(() => {
				const newDomElt = document.querySelector(selector);
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
			setPosition(computePosition(domElt, boxSettingsCopy, tipSettingsCopy));
			window.addEventListener("resize", () => {
				setPosition(computePosition(domElt, boxSettingsCopy, tipSettingsCopy));
			});
		}
		return () => {
			if (intervalID !== null) {
				clearInterval(intervalID);
			}
		};
	}, [
		autoDiscard,
		selector,
		boxSettings,
		tipSettings,
		isVisible,
		incrementStep,
		shouldUpdate,
	]);

	const prevBtnClasses = ["btn prevBtn"];
	const nextBtnClasses = ["btn nextBtn"];
	if (step === 0) prevBtnClasses.push("hidden");
	if (step === tutorialLength - 1) nextBtnClasses.push("hidden");
	const tooltipClasses = ["tooltipPopover"];
	if (isClosing) tooltipClasses.push("closed");
	else if (isVisible) tooltipClasses.push("open");
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
			setTimeout(incrementStep, 300);
		}
	};
	return (
		position !== null && (
			<>
				<div className={tooltipClasses.join(" ")} style={{ ...position }}>
					<div className='tooltipContent'>
						<button className='closeBtn'>
							<CloseIcon />
						</button>
						<p
							className='main'
							dangerouslySetInnerHTML={{
								__html: sanitize(main),
							}}
						/>
						<p
							className='small'
							dangerouslySetInnerHTML={{
								__html: sanitize(small),
							}}
						/>
					</div>
					<div className='progressBar'>
						<div className='bar'>
							<div
								className='done'
								style={{
									width: (100 * (step + 1)) / tutorialLength + "%",
								}}></div>
						</div>

						<div className='counter'>
							{step + 1}/{tutorialLength}
						</div>
					</div>
					<div className='tooltipButtons'>
						<button className={prevBtnClasses.join(" ")} onClick={onPrev}>
							<ChevronLeftIcon />
							Previous&nbsp;&nbsp;
						</button>
						<button className={nextBtnClasses.join(" ")} onClick={onNext}>
							&nbsp;&nbsp;Next
							<ChevronRightIcon />
						</button>
					</div>

					<div
						className={`tip ${position.side}`}
						style={{
							[position.side === "top" || position.side === "bottom"
								? "left"
								: "top"]: position.tip,
						}}></div>
				</div>
				{showError && <ErrorMarker selector={selector} />}
			</>
		)
	);
};

export default Tooltip;
