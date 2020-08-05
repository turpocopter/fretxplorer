import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  fretMarker: {
    marginRight: "1em",
    boxSizing: "content-box",
    borderBottom: "0.25em solid transparent",
    height: (props) =>
      props.position === 0 ? "2.5em" : `${6 * 0.9438 ** props.position}em`,
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    "& small": {
      color: "#aaa",
    },
    "&:last-child": {
      borderBottom: "none",
    },
    "@media (orientation: landscape)": {
      height: "auto!important",
      textAlign: "center",
      marginRight: 0,
      borderBottom: 0,
      borderRight: (props) =>
        props.isLeftHanded ? 0 : "0.25em solid transparent",
      borderLeft: (props) =>
        props.isLeftHanded ? "0.25em solid transparent" : 0,
      width: (props) =>
        props.position === 0 ? "2.5em" : `${6 * 0.9438 ** props.position}em`,
    },
  },
}));

const FretMarker = ({ position, isLeftHanded }) => {
  const classes = useStyles({ position, isLeftHanded });
  return (
    <div className={classes.fretMarker}>
      <small>{position}</small>
    </div>
  );
};

export default FretMarker;
