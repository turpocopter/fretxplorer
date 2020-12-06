import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
const RotateNotice = () => {
	return (
		<Backdrop open={true} className='rotateBackdrop'>
			<div className='notice'>
				<p className='main'>
					Please rotate your device to watch the interactive tutorial.
				</p>
			</div>
		</Backdrop>
	);
};

export default RotateNotice;
