import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
//import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import {
  createStore,
  combineReducers /*applyMiddleware, compose*/,
} from "redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import settingsReducer from "./store/reducers/settings";
import notePickerReducer from "./store/reducers/notePicker";
import authReducer from "./store/reducers/auth";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

/*const composeEnhancers =
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : null || compose;
*/

const reducer = combineReducers({
  settings: settingsReducer,
  notePicker: notePickerReducer,
  auth: authReducer,
});

//const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //composeEnhancers(applyMiddleware(sagaMiddleware))
);

// TODO : run sagas

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 590,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: `'M PLUS 1p', sans-serif`,
  },
  palette: {
    primary: {
      main: "#468189",
    },
    secondary: {
      main: "#e54b4b",
    },
    background: {
      main: "#f8f7f9",
    },
    gray: {
      dark: "#222222",
      main: "#999999",
      light: "#cccccc",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
