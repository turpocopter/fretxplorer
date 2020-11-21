import { combineReducers } from "redux";
import settingsReducer from "./settings";
import notePickerReducer from "./notePicker";
import authReducer from "./auth";

export const reducersObject = {
  settings: settingsReducer,
  notePicker: notePickerReducer,
  auth: authReducer,
};

const reducer = combineReducers(reducersObject);

export default reducer;
