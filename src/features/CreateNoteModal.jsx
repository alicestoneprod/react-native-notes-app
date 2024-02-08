import { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  Image,
} from "react-native"
import { AttachedPicture } from "./AttachedPicture"

import * as ImagePicker from "expo-image-picker"

export const CreateNoteModal = ({ createOnClose, handleAddNote }) => {
  const [currentNote, setCurrentNote] = useState({})
  const [isActive, setIsActive] = useState(false)
  const valuesIsOk =
    currentNote?.tag?.length > 1 &&
    currentNote?.title?.length &&
    currentNote?.description?.length

  const handleOnChangeTitle = (value) => {
    setCurrentNote(() => {
      return { ...currentNote, title: value }
    })
  }
  const handleOnChangeTag = (value) => {
    setCurrentNote(() => {
      return { ...currentNote, tag: value }
    })
  }
  const handleOnChangeDesc = (value) => {
    setCurrentNote(() => {
      return { ...currentNote, description: value }
    })
  }

  const saveImage = async (image) => {
    try {
      setCurrentNote(() => {
        return { ...currentNote, image }
      })
    } catch (e) {
      console.log("err")
    }
  }

  const uploadImage = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync()
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
      })
      if (!result?.canceled) {
        saveImage(result?.assets[0]?.uri)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleCloseModal = () => {
    if (
      currentNote?.tag?.length > 1 ||
      currentNote?.title?.length ||
      currentNote?.description?.length
    ) {
      Alert.alert(
        "Предупреждение",
        "У вас имеются несохраненные изменения. Вы и правда хотите выйти?",
        [
          {
            text: "Нет",
            onPress: () => console.log("Cancel Pressed"),
          },
          {
            text: "Да",
            onPress: () => {
              setCurrentNote({})
              createOnClose()
            },
          },
        ]
      )
      return
    }

    createOnClose()
  }

  const handleDeletePicture = () => {
    Alert.alert(
      "Предупреждение",
      "Вы действительно хотите удалить прикрепленное фото?",
      [
        {
          text: "Нет",
        },
        {
          text: "Да",
          onPress: () => {
            setCurrentNote(() => {
              return { ...currentNote, image: "" }
            })
            setIsActive(false)
          },
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.textCnt}>
        <TextInput
          style={[styles.input, styles.titleInput]}
          placeholder='заголовок'
          onChangeText={(value) => handleOnChangeTitle(value)}
          value={currentNote?.title}></TextInput>
        <TextInput
          style={[styles.input, styles.tagInput]}
          placeholder='хештэг'
          onChangeText={(value) => handleOnChangeTag(value)}
          defaultValue='#'
          value={currentNote?.tag}></TextInput>
        <TextInput
          multiline
          style={[styles.input, styles.descriptionInput]}
          placeholder='текст'
          onChangeText={(value) => handleOnChangeDesc(value)}
          value={currentNote?.description}></TextInput>
        <AttachedPicture
          src={currentNote?.image}
          onDeletePicture={handleDeletePicture}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </View>
      <View style={styles.additionalButtonsCnt}>
        <TouchableHighlight
          onPress={() => {
            uploadImage()
          }}
          style={[styles.addImgBtnCnt]}>
          <Image
            style={[styles.addImgCnt]}
            source={require("./add.png")}></Image>
        </TouchableHighlight>
      </View>
      <View style={styles.buttonsCnt}>
        <TouchableHighlight
          onPress={() => {
            handleCloseModal()
          }}
          style={[styles.btnCnt]}>
          <Text style={[styles.button, styles.cancelBtn]}>отменить</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            if (valuesIsOk) {
              handleAddNote({
                ...currentNote,
                datetime: Date.now(),
              })
              setCurrentNote({})
              return
            }

            Alert.alert(
              "Предупреждение",
              "Вы не заполнили информацию о заметке, все поля обязательны.",
              [
                {
                  text: "Ок",
                },
              ]
            )
            return
          }}
          style={[styles.btnCnt]}>
          <Text style={[styles.button, styles.saveBtn]}>сохранить</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1000,
    width: "110%",
    height: "100%",
    left: 20,
    top: 60,
    backgroundColor: "white",
  },
  textCnt: {
    padding: 20,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    flexDirection: "column",
    borderRadius: 40,
    width: "90%",
    height: "65%",
    zIndex: 10000,
    marginBottom: "20%",
  },
  input: {
    color: "black",
    fontFamily: "Mont-Regular",
  },
  titleInput: {
    fontSize: 35,
    letterSpacing: 1.2,
    fontFamily: "Mont-Bold",
  },
  descriptionInput: {
    fontSize: 20,
    maxHeight: "78%",
    letterSpacing: 1.5,
    borderTopColor: "black",
    borderTopWidth: 1,
    borderStyle: "solid",
    paddingTop: 20,
  },
  tagInput: {
    fontSize: 20,
    marginBottom: 10,
    letterSpacing: 1.2,
  },
  buttonsCnt: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    fontSize: 24,
    width: 150,
    height: 60,
    paddingTop: "9%",
    textAlign: "center",
  },
  saveBtn: {
    fontSize: 24,
    display: "flex",
    width: 150,
    height: 60,
    paddingTop: "9%",
    textAlign: "center",
    backgroundColor: "#CFFF47",
  },
  btnCnt: {
    width: 150,
    height: 60,
    marginRight: 40,
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
  },
  additionalButtonsCnt: {
    alignSelf: "center",
    backgroundColor: "black",
    width: "70%",
    height: "6%",
    borderRadius: 20,
    marginRight: "10%",
    marginBottom: "10%",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  addImgBtnCnt: {
    height: 20,
    position: "relative",
    paddingTop: 4,
  },
  addImgBtn: {
    position: "absolute",
    maxWidth: 20,
    height: 20,
  },
})
