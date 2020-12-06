import React, { useState, useEffect } from "react";

const DisableNotice = ({ isVisible, shouldFadeIn, disableTutorials }) => {
	const [isClosing, setIsClosing] = useState(false);

	const noticeClasses = ["disableNotice"];
	if (isClosing) noticeClasses.push("closed");
	else if (isVisible && shouldFadeIn) noticeClasses.push("open");
	useEffect(() => {
		let intervalID = null;
		const closeNotice = () => {
			if (intervalID !== null) clearInterval(intervalID);
			setIsClosing(true);
			intervalID = setTimeout(disableTutorials, 500);
			document.body.removeEventListener("click", closeNotice);
		};
		intervalID = setTimeout(closeNotice, 5000);
		document.body.addEventListener("click", closeNotice);
		return () => {
			if (intervalID !== null) {
				clearInterval(intervalID);
				document.body.removeEventListener("click", closeNotice);
			}
		};
	}, [disableTutorials]);
	return (
		<div className={noticeClasses.join(" ")}>
			<p className='main'>Tutorial discarded!</p>
			<p className='small'>
				Go to the Settings page if you want to start it over again.
			</p>
		</div>
	);
};

export default DisableNotice;
