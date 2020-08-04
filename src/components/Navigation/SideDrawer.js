import React from "react";
import Drawer from "@material-ui/core/Drawer";
import MainMenu from "components/Navigation/MainMenu";
import logo from "assets/logo.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  logo: {
    width: 210,
    margin: "30px 40px 40px 0",
    "& img": {
      width: "100%",
    },
  },
}));

const SideDrawer = (props) => {
  const classes = useStyles();
  return (
    <Drawer open={props.isOpened} onClose={props.toggle(false)}>
      <div className={classes.logo}>
        <img src={logo} alt='fretxplorer' />
      </div>
      <MainMenu orientation='vertical' onClickLink={props.toggle(false)} />
    </Drawer>
  );
};

export default SideDrawer;
