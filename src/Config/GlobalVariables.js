export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const adminMenu = ["Admin panel", "Chat List", "User List"]

export const usersMenu = ["User Profile", "Chat List", "Users"]

const today = new Date()

export const currentTime = () => {
  const hours = () => {
    if (today.getHours() > 9) return today.getHours()
    return "0" + today.getHours()
  }

  const minutes = () => {
    if (today.getMinutes() > 9) return today.getMinutes()
    return "0" + today.getMinutes()
  }

  const month = today.getMonth()

  const day = () => {
    if (today.getDate() <= 9) return "0" + today.getDate()
    return today.getDate()
  }
  return hours() + ":" + minutes() + ", " + day() + " of " + monthNames[month]
}
