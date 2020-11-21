import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import "./index.scss";
import App from "./App";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
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
