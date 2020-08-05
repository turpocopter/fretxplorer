import React from "react";

import FretMarker from "./FretMarker";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  fretMarkerList: {
    marginTop: "2.5em",
    width: "2em",
    textAlign: "right",
    "@media (orientation: landscape)": {
      marginTop: 0,
      marginLeft: (props) => (props.isLeftHanded ? 0 : "2.5em"),
      marginRight: (props) => (props.isLeftHanded ? "2.5em" : 0),
      display: "flex",
      flexFlow: (props) =>
        `${props.isLeftHanded ? "row-reverse" : "row"} nowrap`,
      width: "auto",
      height: "2em",
    },
  },
}));

const FretMarkerList = (props) => {
  const classes = useStyles(props);
  const fretMarkerList = [...Array(props.nbFrets)].map((_, v) => (
    <FretMarker
      key={`fretMarker${v + 1}`}
      position={v + 1}
      isLeftHanded={props.isLeftHanded}
    />
  ));
  return <div className={classes.fretMarkerList}>{fretMarkerList}</div>;
};

export default FretMarkerList;
