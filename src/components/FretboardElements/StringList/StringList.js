import React from "react";

import String from "./String";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  stringList: {
    display: "flex",
    flexFlow: "row nowrap",
    paddingRight: "2em",
  },
}));

export default function StringList(props) {
  const classes = useStyles(props);
  const stringList = props.tuning.map((el) => (
    <String {...props} key={el.stringId} name={el.stringId} tuning={el} />
  ));
  return <div className={classes.stringList}>{stringList}</div>;
}
