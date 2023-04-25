import { userDataBase } from "../../Config/dataBase";

export const loginValidation = (usernameInput, passwordInput) => {
  const [existUserDataBase] = userDataBase.filter((user) => {
    if (user.username === usernameInput) {
      return user;
    }
  });
  console.log(existUserDataBase);
  if (existUserDataBase === undefined) {
    return alert("No user with this username");
  } else if (existUserDataBase.password === passwordInput) {
    return existUserDataBase;
  }
  return alert("Wrong login/password");
};
