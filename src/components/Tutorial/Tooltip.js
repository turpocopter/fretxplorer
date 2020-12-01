import React, { useState, useEffect } from "react";
import { sanitize } from "dompurify";

import ErrorMarker from "./ErrorMarker";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";

const computePosition = (domElt, tipSettings) => {
	const tipMargin = 22;
	const tipBasePos = 10;
	const emptyMargin = 20;
	const eltBoundingRect = domElt.getBoundingClientRect();
	const availableSpace = [
		["top", eltBoundingRect.top],
		["bottom", window.innerHeight - eltBoundingRect.bottom],
		["left", eltBoundingRect.left],
		["right", window.innerWidth - eltBoundingRect.right],
	].sort((a, b) => b[1] - a[1]);
	if (
		availableSpace[0][0] === "left" &&
		availableSpace[1][0] === "right" &&
		availableSpace[0][1] === availableSpace[1][1]
	) {
		availableSpace[0][0] = "right";
		availableSpace[1][0] = "left";
	}
	let popoverWidth = 300;
	if (window.innerWidth >= 590) {
		popoverWidth = 420;
	}
	const adaptHorizontalPosition = () => {
		let left = eltBoundingRect.left,
			right = "auto",
			tip = 0;
		// centrer sur mobile
		if (window.innerWidth <= 375) {
			left = (window.innerWidth - popoverWidth) / 2;
		}
		// si dépassement à droite
		else if (left + popoverWidth > window.innerWidth - emptyMargin) {
			left = window.innerWidth - popoverWidth - emptyMargin;
		}
		// [TODO] si dépassement à gauche
		switch (tipSettings.x.side) {
			case "left":
				tip = eltBoundingRect.left - left - 12;
				if (tipSettings.x.hasOwnProperty("offset")) tip += tipSettings.x.offset;
				tip = Math.max(tip, tipBasePos);
				break;
			case "right":
				tip = eltBoundingRect.right - left - 12;
				if (tipSettings.x.hasOwnProperty("offset")) tip -= tipSettings.x.offset;
				break;
			case "center":
				tip = eltBoundingRect.left + eltBoundingRect.width / 2 - left - 12;
				break;
			default:
		}
		return [left, right, tip];
	};
	const adaptVerticalPosition = () => {
		let top = eltBoundingRect.top,
			bottom = "auto",
			tip = 0;
		// [TODO] si dépassement en bas
		/*if (top + ppvH > window.innerHeight - emptyMargin) {
      top = window.innerHeight - ppvH - emptyMargin;
    }*/
		// [TODO] si dépassement en haut
		switch (tipSettings.y.side) {
			case "top":
				tip = eltBoundingRect.top - top - 12;
				if (tipSettings.y.hasOwnProperty("offset")) tip += tipSettings.y.offset;
				tip = Math.max(tip, tipBasePos);
				break;
			case "right":
				tip = eltBoundingRect.bottom - top - 12;
				if (tipSettings.y.hasOwnProperty("offset")) tip -= tipSettings.y.offset;
				break;
			case "center":
				tip = eltBoundingRect.top + eltBoundingRect.height / 2 - top - 12;
				break;
			default:
		}
		return [top, bottom, tip];
	};
	let side = availableSpace[0][0];
	let top = "auto",
		bottom = "auto",
		left = "auto",
		right = "auto",
		tip = tipBasePos;
	switch (side) {
		case "top":
			bottom = window.innerHeight - eltBoundingRect.top + tipMargin;
			[left, right, tip] = adaptHorizontalPosition();
			break;
		case "bottom":
			top = eltBoundingRect.bottom + tipMargin;
			[left, right, tip] = adaptHorizontalPosition();
			break;
		case "left":
			right = window.innerWidth - eltBoundingRect.left + tipMargin;
			[top, bottom, tip] = adaptVerticalPosition();
			break;
		case "right":
			left = eltBoundingRect.right + tipMargin;
			[top, bottom, tip] = adaptVerticalPosition();
			break;
		default:
	}

	return { top, bottom, left, right, side, tip };
};

const Tooltip = ({
	isVisible,
	step,
	stepData,
	decrementStep,
	incrementStep,
}) => {
	const [position, setPosition] = useState(null);
	const [showError, setShowError] = useState(false);
	useEffect(() => {
		const domElt = document.querySelector(stepData.selector);
		if (domElt) {
			setPosition(computePosition(domElt, stepData.position));
		}
	}, [stepData.selector, stepData.position]);
	const prevBtnClasses = ["btn prevBtn"];
	const nextBtnClasses = ["btn nextBtn"];
	if (step === 0) prevBtnClasses.push("hidden");
	if (step === stepData.tutorialLength - 1) nextBtnClasses.push("hidden");
	const tooltipClasses = ["tooltipPopover", isVisible ? "open" : "closed"];
	const onPrev = () => {
		decrementStep();
	};
	const onNext = () => {
		if (stepData.hasOwnProperty("blockNext") && stepData.blockNext()) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 1000);
		} else incrementStep();
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
								__html: sanitize(stepData.main),
							}}
						/>
						<p
							className='small'
							dangerouslySetInnerHTML={{
								__html: sanitize(stepData.small),
							}}
						/>
					</div>
					<div className='progressBar'>
						<div className='bar'>
							<div
								className='done'
								style={{
									width: (100 * (step + 1)) / stepData.tutorialLength + "%",
								}}></div>
						</div>

						<div className='counter'>
							{step + 1}/{stepData.tutorialLength}
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
				{showError && <ErrorMarker selector={stepData.selector} />}
			</>
		)
	);
};

export default Tooltip;
