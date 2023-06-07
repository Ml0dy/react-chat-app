export const registerValidation = (usernameInput, userDataBase) => {
  for (let i = 0; i < userDataBase.length; i++) {
    if (userDataBase[i].username === usernameInput) {
      return true
    }
  }
}
