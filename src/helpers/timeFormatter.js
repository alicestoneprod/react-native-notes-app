export const timeFormatter = (time) => {
  const dateObject = new Date(time)

  const hours = dateObject.getHours()
  const minutes = dateObject.getMinutes()

  const isDigit = (value) => {
    return value >= 10 ? "" : "0"
  }

  return `${isDigit(hours)}${hours}:${isDigit(minutes)}${minutes}`
}
