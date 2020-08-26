import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import MainMenu from "components/Navigation/MainMenu";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import logo from "assets/logo.svg";

const Header = ({ toggleDrawer }) => {
  return (
    <Toolbar id='Header'>
      <div className='Logo'>
        <img src={logo} alt='fretxplorer' />
      </div>
      <IconButton
        className='MenuButton'
        color='inherit'
        aria-label='menu'
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <div className='MainMenu'>
        <MainMenu orientation='horizontal' onClickLink={() => {}} />
      </div>
    </Toolbar>
  );
};

export default Header;
