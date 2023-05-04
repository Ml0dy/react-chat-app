import { combineReducers } from "redux"
import loggedUserReducer from "./loggedUserReducer"
import { userDatabaseReducer } from "./usersDatabaseReducer"
import { chatsDatabaseReducer } from "./chatsDatabaseReducer"
import { currentChatReducer } from "./currentChatReducer"
import { deleteUserReducer } from "./deleteUserReducer"

export const rootReducer = combineReducers({
  loggedUserReducer,
  userDatabaseReducer,
  chatsDatabaseReducer,
  currentChatReducer,
  deleteUserReducer,
})
