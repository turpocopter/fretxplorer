import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
//import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import logo from "assets/logo.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  header: {
    flexGrow: 1,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  logo: {
    marginLeft: -16,
    width: 150,
    "& img": {
      width: "100%",
      display: "block",
    },
  },
  menuButton: {
    position: "absolute",
    top: 4,
    right: 4,
  },
  title: {
    flexGrow: 1,
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
      {/*<Typography variant='h6' className={classes.title}>
          Chord picker
  </Typography>*/}
    </Toolbar>
  );
};

export default Header;
