import React from "react";

const ErrorMarker = ({ selector }) => {
	let pos, dims;
	dims = document.querySelector(selector).getBoundingClientRect();
	pos = {
		left: dims.left,
		top: dims.top,
		height: dims.height,
		width: dims.width,
	};
	return <div className='errorMarker' style={{ ...pos }}></div>;
};

export default ErrorMarker;
