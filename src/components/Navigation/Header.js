import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import MainMenu from "components/Navigation/MainMenu";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import logo from "assets/logo.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
    marginBottom: 8,
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      position: "sticky",
      top: 0,
      backgroundColor: theme.palette.background.main,
      marginBottom: 0,
      paddingBottom: 8,
      zIndex: 200,
    },
  },
  logo: {
    marginLeft: -16,
    width: 150,
    [theme.breakpoints.up("sm")]: {
      marginLeft: -24,
      width: 260,
    },
    "& img": {
      width: "100%",
      display: "block",
    },
  },
  menuButton: {
    position: "absolute",
    top: 4,
    right: 4,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  mainMenu: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const Header = ({ toggleDrawer }) => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} alt='fretxplorer' />
      </div>
      <IconButton
        className={classes.menuButton}
        color='inherit'
        aria-label='menu'
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <div className={classes.mainMenu}>
        <MainMenu orientation='horizontal' onClickLink={() => {}} />
      </div>
    </Toolbar>
  );
};

export default Header;
