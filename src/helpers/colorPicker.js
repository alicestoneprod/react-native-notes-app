export const colorPicker = (time, type) => {
  const lastDigit = time % 10

  switch (lastDigit) {
    case 0:
    case 1:
    case 2:
      return type === "background" ? "#D4B4FE" : "#4B0082"
    case 3:
    case 4:
    case 5:
      return type === "background" ? "#ceebff" : "#4ba0f3"
    case 6:
    case 7:
      return type === "background" ? "#e3ffa3" : "#006400"
    case 8:
    case 9:
      return type === "background" ? "#ffdba2" : "#eb8519"
    default:
      return "#FFFFFF"
  }
}
