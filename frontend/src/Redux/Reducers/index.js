import loggedUserReducer from "./loggedUserReducer"
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
  loggedUserReducer,
})
