import { userDataBase } from "../../Config/dataBase"

export const registerValidation = (usernameInput) => {
  for (let i = 0; i < userDataBase.length; i++) {
    if (userDataBase[i].username === usernameInput) {
      return true
    }
  }
}
