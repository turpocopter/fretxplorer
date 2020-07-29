import React, { Suspense } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
//import * as actions from "store/actions";

import Layout from "hoc/Layout";
import Spinner from "components/UI/Spinner";

const Welcome = React.lazy(() => {
  //return import("pages/Welcome/Welcome");
  return import("components/Navigation/SignInSide");
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
const Login = React.lazy(() => {
  return import("pages/Login");
});

function App(props) {
  /*const dispatch = useDispatch();
  const mode = useSelector((state) => state.settings.mode);
  const onUpdateMode = (mode) => {
    return dispatch(actions.updateMode(mode));
  };*/
  return (
    <div style={{ backgroundColor: "#f8f7f9", minHeight: "100vh" }}>
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
          <Redirect to='/' />
        </Suspense>
        {/*<p>{props.isAuthenticated ? "connecté" : "pas connecté"}</p>*/}
      </Layout>
    </div>
  );
}

export default withRouter(App);
