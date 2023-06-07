export const loginValidation = (
  usernameInput,
  passwordInput,
  USER_DATABASE
) => {
  const [existUserDataBase] = USER_DATABASE.filter((user) => {
    if (user.username !== usernameInput) {
      return false
    }
    return user
  })
  if (existUserDataBase === undefined) {
    return false
  } else if (existUserDataBase.password === passwordInput) {
    return existUserDataBase
  }
  return false
}
