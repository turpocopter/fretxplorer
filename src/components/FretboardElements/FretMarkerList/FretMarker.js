import React from "react";
import PropTypes from "prop-types";

const FretMarker = ({ position, isLeftHanded }) => {
  const fretMarkerClasses = ["FretMarker", `fret-${position}`];
  if (isLeftHanded) fretMarkerClasses.push("leftHanded");
  return (
    <div data-test='fret-marker' className={fretMarkerClasses.join(" ")}>
      <small>{position}</small>
    </div>
  );
};

FretMarker.propTypes = {
  position: PropTypes.number.isRequired,
  isLeftHanded: PropTypes.bool.isRequired,
};

export default FretMarker;
