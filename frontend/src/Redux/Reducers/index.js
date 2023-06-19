import { chatsDatabaseReducer } from "./chatsDatabaseReducer"
import { currentChatReducer } from "./currentChatReducer"
import loggedUserReducer from "./loggedUserReducer"
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
  loggedUserReducer,
  chatsDatabaseReducer,
  currentChatReducer,
})
