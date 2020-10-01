import {
  createStore,
  /*applyMiddleware, compose*/
} from "redux";
import reducer from "./reducers";

/*const composeEnhancers =
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : null || compose;
*/

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //composeEnhancers(applyMiddleware(sagaMiddleware))
);
export default store;
