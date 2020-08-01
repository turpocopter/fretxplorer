import React, { Suspense, useEffect } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "store/actions";

import Layout from "hoc/Layout";
import Spinner from "components/UI/Spinner";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main,
    minHeight: "100vh",
  },
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
const Login = React.lazy(() => {
  return import("pages/Login");
});

function App(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.checkLocalSettings());
  }, [dispatch]);
  return (
    <div className={classes.root}>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Route path='/login' render={() => <Login />} />
          <Route path='/' exact>
            <Welcome />
          </Route>
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
          <Redirect to='/' />
        </Suspense>
      </Layout>
    </div>
  );
}

export default withRouter(App);
