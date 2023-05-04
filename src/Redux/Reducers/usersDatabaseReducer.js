import { userDataBase } from "../../Config/dataBase"

const initialState = userDataBase

export const userDatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERDATABASE":
      return state
    case "DELETE_USER":
      return state.filter((user) => (user.id !== action.payload ? user : false))

    default:
      return state
  }
}
