import React from "react";

const FretMarker = ({ position, isLeftHanded }) => {
  const fretMarkerClasses = ["FretMarker", `fret-${position}`];
  if (isLeftHanded) fretMarkerClasses.push("leftHanded");
  return (
    <div className={fretMarkerClasses.join(" ")}>
      <small>{position}</small>
    </div>
  );
};

export default FretMarker;
