import React from "react";
import { NavLink } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  nav: (props) =>
    props.orientation === "horizontal"
      ? {
          display: "flex",
          flexFlow: "row nowrap",
          marginRight: 0,
          "@media (min-width: 800px)": {
            fontSize: "1.4em",
          },
          [`${theme.breakpoints.up("md")}`]: {
            fontSize: "1.3em",
          },
          /*[`${theme.breakpoints.down("md")} and (orientation: landscape)`]: {
            fontSize: "1.em",
            marginRight: -16,
          },*/
        }
      : {},
  list: (props) =>
    props.orientation === "horizontal"
      ? {
          display: "flex",
          flexFlow: "row nowrap",
          paddingBottom: 0,
        }
      : {},
  link: (props) =>
    props.orientation === "horizontal"
      ? {
          whiteSpace: "nowrap",
          fontSize: "0.9em",
          textTransform: "uppercase",
          fontWeight: 500,
          /*[`${theme.breakpoints.up("sm")} and (orientation: landscape)`]: {
            fontSize: "1.1em",
          },*/
        }
      : {},
  activeLink: (props) =>
    props.orientation === "horizontal"
      ? {
          color: theme.palette.secondary.main,
        }
      : {},
}));

const MainMenu = (props) => {
  const classes = useStyles(props);
  return (
    <nav className={classes.nav}>
      <List className={classes.list} component='div'>
        <ListItem
          button
          component={NavLink}
          to='/chordpicker'
          exact
          onClick={props.onClickLink}
          activeClassName={classes.activeLink}
        >
          <ListItemText
            primary={
              props.orientation === "horizontal" ? "Chords" : "Pick a Chord"
            }
            classes={{ primary: classes.link }}
          />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to='/scalepicker'
          exact
          onClick={props.onClickLink}
          activeClassName={classes.activeLink}
        >
          <ListItemText
            primary={
              props.orientation === "horizontal" ? "Scales" : "Pick a Scale"
            }
            classes={{ primary: classes.link }}
          />
        </ListItem>
      </List>
      <Divider
        orientation={
          props.orientation === "horizontal" ? "vertical" : "horizontal"
        }
      />
      <List className={classes.list} component='div'>
        <ListItem
          button
          size='small'
          component={NavLink}
          to='/settings'
          exact
          onClick={props.onClickLink}
          activeClassName={classes.activeLink}
        >
          <ListItemText
            primary='Settings'
            classes={{ primary: classes.link }}
          />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to='/about'
          exact
          onClick={props.onClickLink}
          activeClassName={classes.activeLink}
        >
          <ListItemText primary='About' classes={{ primary: classes.link }} />
        </ListItem>
      </List>
    </nav>
  );
};

export default MainMenu;
