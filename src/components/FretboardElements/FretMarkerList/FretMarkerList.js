import React from "react";

import FretMarker from "./FretMarker";

const FretMarkerList = (props) => {
  const fretMarkerList = [...Array(props.nbFrets)].map((_, v) => (
    <FretMarker
      key={`fretMarker${v + 1}`}
      position={v + 1}
      isLeftHanded={props.isLeftHanded}
    />
  ));
  const fretMarkerClasses = ["FretMarkerList"];
  if (props.isLeftHanded) fretMarkerClasses.push("leftHanded");
  return <div className={fretMarkerClasses.join(" ")}>{fretMarkerList}</div>;
};

export default FretMarkerList;
