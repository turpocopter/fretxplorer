import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
const Invite = ({
	isVisible,
	shouldFadeIn,
	enableTutorials,
	closeTutorials,
}) => {
	const [isClosing, setIsClosing] = useState(false);
	const backdropClasses = ["inviteBackdrop"];
	if (isClosing) backdropClasses.push("closed");
	else if (isVisible && shouldFadeIn) backdropClasses.push("open");
	const validate = () => {
		setIsClosing(true);
		setTimeout(enableTutorials, 500);
	};
	const discard = () => {
		setIsClosing(true);
		setTimeout(closeTutorials, 500);
	};
	return (
		<Backdrop open={true} className={backdropClasses.join(" ")}>
			<div className='invite'>
				<p className='main'>Hi, looks like you're new here!</p>
				<p className='small'>
					{window.innerWidth < 768 && window.innerHeight < window.innerWidth
						? `Would you like to follow an interactive tutorial? You will have to flip over your screen. You can discard the tutorial
					at any point.`
						: `Would you like to follow an interactive tutorial? You can discard it
					at any point.`}
				</p>
				<div className='inviteButtons'>
					<button className='btn noBtn' onClick={discard}>
						<CloseIcon />
						&nbsp;&nbsp;No
					</button>
					<button className='btn yesBtn' onClick={validate}>
						Yes&nbsp;&nbsp;
						<DoneIcon />
					</button>
				</div>
			</div>
		</Backdrop>
	);
};

export default Invite;
