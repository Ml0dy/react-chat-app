import { createStore } from "redux";
import loggedUserReducer from "./Redux/Reducers/loggedUserReducer";

export const store = createStore(
  loggedUserReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
