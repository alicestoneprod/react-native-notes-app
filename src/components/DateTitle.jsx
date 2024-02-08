import { StyleSheet, View, Text } from "react-native"

export const DateTitle = ({ text, display }) => {
  if (!text) {
    return null
  }

  return (
    <View
      style={[
        styles.container,
        {
          display: display,
        },
      ]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 20,
    color: "#949494",
    fontFamily: "Mont-Regular",
    marginBottom: 20,
  },
})
