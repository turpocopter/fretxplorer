import React from "react";
import PropTypes from "prop-types";

import FretMarker from "./FretMarker";

const FretMarkerList = (props) => {
  const fretMarkerList = [...Array(props.nbFrets)].map((_, v) => (
    <FretMarker
      data-test='fret-marker-component'
      key={`fretMarker${v + 1}`}
      position={v + 1}
      isLeftHanded={props.isLeftHanded}
    />
  ));
  const fretMarkerClasses = ["FretMarkerList"];
  if (props.isLeftHanded) fretMarkerClasses.push("leftHanded");
  return (
    <div data-test='fret-marker-list' className={fretMarkerClasses.join(" ")}>
      {fretMarkerList}
    </div>
  );
};

FretMarkerList.propTypes = {
  nbFrets: PropTypes.number.isRequired,
  isLeftHanded: PropTypes.bool.isRequired,
};

export default FretMarkerList;
