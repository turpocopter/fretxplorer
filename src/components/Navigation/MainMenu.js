import React from "react";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const MainMenu = (props) => {
  const navigationClasses = ["Navigation"];
  if (props.orientation === "horizontal") navigationClasses.push("horizontal");
  return (
    <nav className={navigationClasses.join(" ")}>
      <List className='NavList' component='div'>
        <ListItem
          button
          component={NavLink}
          to='/chordpicker'
          exact
          className='Link'
          onClick={props.onClickLink}
          activeClassName='activeLink'
        >
          <ListItemText
            primary={
              props.orientation === "horizontal" ? "Chords" : "Pick a Chord"
            }
            classes={{ primary: "linkContent" }}
          />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to='/scalepicker'
          exact
          className='Link'
          onClick={props.onClickLink}
          activeClassName='activeLink'
        >
          <ListItemText
            primary={
              props.orientation === "horizontal" ? "Scales" : "Pick a Scale"
            }
            classes={{ primary: "linkContent" }}
          />
        </ListItem>
      </List>
      <Divider
        orientation={
          props.orientation === "horizontal" ? "vertical" : "horizontal"
        }
      />
      <List className='NavList' component='div'>
        <ListItem
          button
          size='small'
          component={NavLink}
          to='/settings'
          exact
          className='Link'
          onClick={props.onClickLink}
          activeClassName='activeLink'
        >
          <ListItemText
            primary='Settings'
            classes={{ primary: "linkContent" }}
          />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to='/about'
          exact
          className='Link'
          onClick={props.onClickLink}
          activeClassName='activeLink'
        >
          <ListItemText primary='About' classes={{ primary: "linkContent" }} />
        </ListItem>
      </List>
    </nav>
  );
};

export default MainMenu;
