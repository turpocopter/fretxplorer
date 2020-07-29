import React from "react";

import FretMarker from "./FretMarker";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  fretMarkerList: {
    marginTop: "2.5em",
    width: "2em",
    textAlign: "right",
  },
}));

const FretMarkerList = (props) => {
  const classes = useStyles();
  const fretMarkerList = [...Array(props.nbFrets)].map((_, v) => (
    <FretMarker key={`fretMarker${v + 1}`} position={v + 1} />
  ));
  return <div className={classes.fretMarkerList}>{fretMarkerList}</div>;
};

export default FretMarkerList;
