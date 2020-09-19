import React, { Suspense, useEffect } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "store/actions";

import Layout from "hoc/Layout";
import Spinner from "components/UI/Spinner";
import Welcome from "pages/Welcome";
import TransitionSwitch from "react-router-transition-switch";
import Fader from "react-fader";

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.checkLocalSettings());
  }, [dispatch]);
  return (
    <div className='appRoot'>
      {
        <>
          <Suspense fallback={<Spinner />}>
            <TransitionSwitch component={Fader}>
              <Route exact path='/' component={Welcome} />
              <RouteWithLayout
                path='/chordpicker'
                component={ChordPicker}
                exact
              />
              <RouteWithLayout
                path='/scalepicker'
                component={ScalePicker}
                exact
              />
              <RouteWithLayout
                path='/chordguesser'
                component={ChordGuesser}
                exact
              />
              <RouteWithLayout path='/settings' component={Settings} exact />
              <RouteWithLayout path='/about' component={About} exact />
              <Redirect to='/' />
            </TransitionSwitch>
          </Suspense>
        </>
      }
    </div>
  );
}

function RouteWithLayout({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

export default withRouter(App);
