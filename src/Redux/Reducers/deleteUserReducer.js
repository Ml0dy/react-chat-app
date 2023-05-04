import { userDataBase } from "../../Config/dataBase"

const initialState = userDataBase

export const deleteUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_USER":
      return state.filter((user) => user.id !== action.payload)

    default:
      return state
  }
}
