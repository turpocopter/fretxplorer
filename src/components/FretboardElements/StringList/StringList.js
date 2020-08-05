import React from "react";

import String from "./String";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  stringList: {
    display: "flex",
    flexFlow: (props) => `${props.isLeftHanded ? "row-reverse" : "row"} nowrap`,
    paddingRight: "2em",
    "@media (orientation: landscape)": {
      flexFlow: "column-reverse nowrap!important",
      paddingRight: 0,
    },
  },
}));

export default function StringList(props) {
  const classes = useStyles(props);
  const stringList = props.tuning.map((el) => (
    <String
      {...props}
      key={el.stringId}
      name={el.stringId}
      isLeftHanded={props.isLeftHanded}
      tuning={el}
    />
  ));
  return <div className={classes.stringList}>{stringList}</div>;
}
