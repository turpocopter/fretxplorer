import React, { Suspense, useEffect } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "store/actions";

import Layout from "hoc/Layout";
import Spinner from "components/UI/Spinner";
import TransitionSwitch from "react-router-transition-switch";
import Fader from "react-fader";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    html: {
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        fontSize: "140%",
      },
      [`${theme.breakpoints.up("md")} and (orientation: landscape)`]: {
        fontSize: "130%",
      },
      "@media (min-width: 1590px)": {
        fontSize: "140%",
      },
      "@media (min-width: 1024px) and (orientation: portrait)": {
        fontSize: "180%",
      },
      "@media (min-width: 1590px) and (max-aspect-ratio: 8/5)": {
        fontSize: "160%",
      },
      "@media (min-width: 1780px)": {
        fontSize: "160%",
      },
      "@media (min-width: 1780px) and (max-aspect-ratio: 8/5)": {
        fontSize: "180%",
      },
    },
  },
  root: {
    backgroundColor: theme.palette.background.main,
    minHeight: "100vh",
  },
  active: {},
}));

const Welcome = React.lazy(() => {
  return import("pages/Welcome");
});
const ChordPicker = React.lazy(() => {
  return import("pages/ChordPicker");
});
const ScalePicker = React.lazy(() => {
  return import("pages/ScalePicker");
});
const ChordGuesser = React.lazy(() => {
  return import("pages/ChordGuesser");
});
const Settings = React.lazy(() => {
  return import("pages/Settings");
});
const About = React.lazy(() => {
  return import("pages/About");
});

function App(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.checkLocalSettings());
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <Route exact path='/'>
        <Suspense fallback={<Spinner />}>
          <Route path='/' exact>
            <Welcome />
          </Route>
        </Suspense>
      </Route>
      <Route
        path={[
          "/chordpicker",
          "/scalepicker",
          "/chordguesser",
          "/settings",
          "/about",
        ]}
      >
        <Layout>
          <Suspense fallback={<Spinner />}>
            <TransitionSwitch component={Fader}>
              <Route path='/chordpicker' exact>
                <ChordPicker />
              </Route>
              <Route path='/scalepicker' exact>
                <ScalePicker />
              </Route>
              <Route path='/chordguesser' exact>
                <ChordGuesser />
              </Route>
              <Route path='/settings' exact>
                <Settings />
              </Route>
              <Route path='/about' exact>
                <About />
              </Route>
            </TransitionSwitch>
          </Suspense>
        </Layout>
      </Route>
      <Redirect to='/' />
    </div>
  );
}

export default withRouter(App);
