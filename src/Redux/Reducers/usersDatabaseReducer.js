import { userDataBase } from "../../Config/dataBase";

const initialState = userDataBase;

export const userDatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERDATABASE":
      return state;
    default:
      return state;
  }
};
