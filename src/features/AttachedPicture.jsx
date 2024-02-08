import { useState } from "react"
import { View, StyleSheet, Image, TouchableHighlight, Text } from "react-native"

export const AttachedPicture = ({
  src,
  onDeletePicture,
  isActive,
  setIsActive,
}) => {
  const handlerImagePress = () => {
    setIsActive((prevState) => !prevState)
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          display: isActive ? "flex" : "none",
        }}>
        <TouchableHighlight
          style={{
            position: "absolute",
            zIndex: 200,
            top: 34,
            left: 28,
          }}
          onPress={() => {
            onDeletePicture()
            handlerImagePress()
          }}>
          <Image source={require("./delete.png")}></Image>
        </TouchableHighlight>
        <TouchableHighlight onPress={handlerImagePress}>
          <View style={isActive ? styles.isActive : styles.isNotActive}></View>
        </TouchableHighlight>
      </View>
      <TouchableHighlight style={styles.pictureCnt} onPress={handlerImagePress}>
        <Image
          src={src}
          style={[
            {
              width: 90,
              height: 100,
              borderRadius: 20,
            },
          ]}
        />
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    height: 100,
    width: 90,
    borderRadius: 25,
  },
  isActive: {
    width: 90,
    height: 100,
    position: "absolute",
    zIndex: 20,
    opacity: 0.5,
    borderRadius: 25,
    backgroundColor: "black",
  },
  isNotActive: {
    display: "none",
  },

  pictureCnt: {
    position: "relative",
  },
})
