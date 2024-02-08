import { months } from "../utils/months"

export const daySplitter = (time) => {
  const dateObject = new Date(time)

  const dateFormatter = (dateObj) => {
    const date = dateObj.toLocaleDateString("RU")
    const splittedDate = date.split(".")
    const monthByNumber = months.find(
      (el, index) => index + 1 === parseInt(splittedDate[1])
    )
    return `${splittedDate[0]} ${monthByNumber}`
  }

  const dateToday = new Date(Date.now())
  const splittedToday = dateFormatter(dateToday).split(" ")
  const splittedNote = dateFormatter(dateObject).split(" ")

  if (
    dateToday.getDate() - dateObject.getDate() === 1 &&
    splittedToday[1] === splittedNote[1]
  ) {
    return "вчера"
  } else if (
    dateToday.getDate() === dateObject.getDate() &&
    dateToday.getMonth() === dateObject.getMonth() &&
    dateToday.getFullYear() === dateObject.getFullYear()
  ) {
    return "сегодня"
  } else {
    return dateFormatter(dateObject)
  }
}
