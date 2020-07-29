import React from "react";
import { NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
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
      <List>
        <ListItem
          button
          component={NavLink}
          to='/chordpicker'
          exact
          onClick={props.toggle(false)}
        >
          <ListItemText primary='Pick a Chord' />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to='/scalepicker'
          exact
          onClick={props.toggle(false)}
        >
          <ListItemText primary='Pick a Scale' />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to='/chordguesser'
          exact
          onClick={props.toggle(false)}
        >
          <ListItemText primary='Name a Chord' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={NavLink}
          to='/settings'
          exact
          onClick={props.toggle(false)}
        >
          <ListItemText primary='Settings' />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to='/about'
          exact
          onClick={props.toggle(false)}
        >
          <ListItemText primary='About' />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideDrawer;
