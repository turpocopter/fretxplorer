const defaultBoxSettings = { x: { side: "left" }, y: { side: "top" } };
const defaultTipSettings = { x: { side: "center" }, y: { side: "center" } };

export const computePosition = (domElt, boxSettings, tipSettings) => {
	boxSettings = { ...defaultBoxSettings, ...boxSettings };
	tipSettings = { ...defaultTipSettings, ...tipSettings };
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
		let left = "auto",
			right = "auto",
			tip = 0;
		switch (boxSettings.x.side) {
			case "right":
				right = eltBoundingRect.right - window.innerWidth;
				break;
			case "center":
				left = eltBoundingRect.left;
				right = eltBoundingRect.right - window.innerWidth;
				break;
			case "screencenter":
				left = (window.innerWidth - popoverWidth) / 2;
				break;
			default:
				left = eltBoundingRect.left;
		}

		// centrer sur mobile
		if (window.innerWidth <= 375) {
			left = (window.innerWidth - popoverWidth) / 2;
			right = "auto";
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
				tip =
					eltBoundingRect.width > popoverWidth
						? popoverWidth / 2 - 12
						: eltBoundingRect.left + eltBoundingRect.width / 2 - left - 12;
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
