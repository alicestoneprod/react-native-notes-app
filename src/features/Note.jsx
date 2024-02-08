import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableHighlight,
} from "react-native"
import { timeFormatter } from "../helpers/timeFormatter"
import { colorPicker } from "./../helpers/colorPicker"
export const Note = ({ time, title, tag, description, uri, editOnOpen }) => {
  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.time}>{timeFormatter(time)}</Text>
      <View style={styles.lineCnt}></View>
      <View
        style={[
          styles.noteContainer,
          {
            backgroundColor: colorPicker(time, "background"),
          },
        ]}>
        <Text style={styles.title}>{title}</Text>
        <TouchableHighlight
          onPress={() => editOnOpen(time)}
          style={styles.editTextCnt}>
          <Text style={styles.editText}>ред.</Text>
        </TouchableHighlight>
        <Text
          style={[
            styles.tag,
            {
              color: colorPicker(time, "text"),
              fontWeight: "bold",
            },
          ]}>
          {tag}
        </Text>
        <Text style={styles.description}>{description}</Text>
        {uri && <Image src={uri} style={styles.img}></Image>}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: 30,
    flexDirection: "row",
    position: "relative",
    marginBottom: 40,
  },
  lineCnt: {
    width: 10,
    height: "100%",
    borderRadius: 15,
    backgroundColor: "#f4f4f4",
    zIndex: 2,
    marginRight: 15,
  },
  noteContainer: {
    borderRadius: 30,
    padding: 20,
    width: "90%",
  },
  title: {
    fontSize: 24,
    fontFamily: "Mont-Bold",
    fontWeight: "400",
    marginBottom: 10,
  },
  tag: {
    fontFamily: "Mont-Regular",
    marginBottom: 30,
    fontSize: 18,
  },
  description: {
    fontFamily: "Mont-Regular",
    fontSize: 24,
  },
  time: {
    position: "absolute",
    fontFamily: "Mont-Regular",
    color: "#949494",
    fontSize: 18,
    marginBottom: 10,
  },
  img: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    resizeMode: "cover",
  },
  editTextCnt: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  editText: {
    fontSize: 18,
  },
})
