import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableHighlight,
} from "react-native"

export const StartPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>лучшее</Text>
      <Text style={styles.textLarge}>приложение</Text>
      <Text style={styles.textDefault}>для твоих</Text>
      <Text style={styles.textLargeLast}>заметок</Text>
      <Image source={require("./new.png")} style={styles.startImage} />
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("Main")
        }}
        style={{
          height: 50,
          width: "100%",
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text style={styles.button}>начать</Text>
      </TouchableHighlight>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    backgroundColor: "#CFFF47",
    height: "100%",
    position: "relative",
    paddingTop: 60,
  },
  title: {
    zIndex: 100,
    marginTop: 40,
    marginLeft: 20,
    fontFamily: "Mont-Regular",
    fontSize: 80,
    letterSpacing: 2,
  },
  textDefault: {
    marginLeft: 20,
    zIndex: 100,
    fontSize: 90,
    fontFamily: "Mont-Regular",
  },
  textLarge: {
    marginLeft: 20,
    fontSize: 50,
    letterSpacing: -3,
    zIndex: 100,
    fontFamily: "Mont-Regular",
  },
  textLargeLast: {
    textDecorationLine: "underline",
    marginLeft: 20,
    fontSize: 60,
    letterSpacing: -3,
    zIndex: 100,
    marginBottom: 20,
    fontFamily: "Mont-Regular",
  },
  startImage: {
    right: -20,
    position: "absolute",
    top: 20,
    zIndex: 1,
  },
  button: {
    width: "100%",
    backgroundColor: "white",
    height: 60,
    width: "95  %",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    textAlign: "center",
    paddingTop: 10,
    fontSize: 30,
    fontFamily: "Mont-Regular",
  },
})
