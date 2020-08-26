import React from "react";
import Drawer from "@material-ui/core/Drawer";
import MainMenu from "components/Navigation/MainMenu";
import logo from "assets/logo.svg";

const SideDrawer = (props) => {
  return (
    <Drawer open={props.isOpened} onClose={props.toggle(false)}>
      <div className='SideDrawerLogo'>
        <img src={logo} alt='fretxplorer' />
      </div>
      <MainMenu orientation='vertical' onClickLink={props.toggle(false)} />
    </Drawer>
  );
};

export default SideDrawer;
