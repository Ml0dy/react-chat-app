import { chatsDatabaseReducer } from "./chatsDatabaseReducer"
import { currentChatReducer } from "./currentChatReducer"
import loggedUserReducer from "./loggedUserReducer"
import { userDatabaseReducer } from "./usersDatabaseReducer"
import { combineReducers } from "redux"

export const rootReducer = combineReducers({
  loggedUserReducer,
  userDatabaseReducer,
  chatsDatabaseReducer,
  currentChatReducer,
})
