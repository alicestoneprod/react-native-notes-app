import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
} from "react-native"

export const Tag = ({ onSetActiveTag, tag, activeTag }) => {
  return (
    <View>
      <TouchableHighlight
        onPress={() => {
          onSetActiveTag(tag)
        }}
        style={[activeTag === tag && styles.isActive, styles.default]}>
        <Text style={styles.button}>{tag}</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    fontSize: 20,
  },
  default: {
    height: 50,
    width: "auto",
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    marginRight: 30,
  },
  isActive: {
    backgroundColor: "#CFFF47",
  },
})
