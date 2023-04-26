import { userDataBase } from "../../Config/dataBase";

export const loginValidation = (usernameInput, passwordInput) => {
  const [existUserDataBase] = userDataBase.filter((user) => {
    if (user.username === usernameInput) {
      return user;
    }
  });
  console.log(existUserDataBase);
  if (existUserDataBase === undefined) {
    return false;
  } else if (existUserDataBase.password === passwordInput) {
    return existUserDataBase;
  }
  return false;
};
