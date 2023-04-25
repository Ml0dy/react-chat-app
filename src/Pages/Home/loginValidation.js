import { userDataBase } from "../../Config/dataBase";

export const loginValidation = (usernameInput, passwordInput) => {
  const existUserDataBase = userDataBase.filter((user) => {
    if (user.username === usernameInput) {
      return user;
    }
  });
  console.log(existUserDataBase);
  if (existUserDataBase[0].password === passwordInput) {
    return true;
  }
  return false;
};
