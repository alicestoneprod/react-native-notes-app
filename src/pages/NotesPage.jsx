import { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableHighlight,
  ScrollView,
} from "react-native"
import { TagsList } from "../features/TagsList"
import { CreateNoteModal } from "../features/CreateNoteModal"
import { useModal } from "../hooks/useModal"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NotesList } from "../features/NotesList"
import { EditNoteModal } from "../features/EditNoteModal"

export const NotesPage = ({}) => {
  const [tags, setTags] = useState(["#all"])
  const [editingNote, setEditingNote] = useState()

  const {
    isOpen: createIsOpen,
    onClose: createOnClose,
    onOpen: createOnOpen,
  } = useModal()
  const [activeTag, setActiveTag] = useState("#all")
  const [notes, setNotes] = useState([])
  const {
    isOpen: editIsOpen,
    onClose: editOnClose,
    onOpen: editOnOpen,
  } = useModal()
  useEffect(() => {
    AsyncStorage.getItem("notes", (error, result) => {
      result && setNotes(JSON.parse(result))
    })
  }, [])

  useEffect(() => {
    AsyncStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const handleAddNote = (note) => {
    setNotes((prevState) => [...prevState, note])
    createOnClose()
  }

  const handleEditNote = (id) => {
    setEditingNote(() => {
      return notes.find((note) => note?.datetime === id)
    })
    editOnOpen()
  }

  const handleSaveEditedNote = (id) => {
    setNotes((prevState) => {
      return [...prevState.filter((note) => note?.datetime !== id), editingNote]
    })
    editOnClose()
  }

  const handleDeleteNote = (id) => {
    setNotes((prevState) => {
      return [...prevState.filter((note) => note?.datetime !== id)]
    })
    editOnClose()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.modalCnt, createIsOpen && styles.modalIsOpen]}>
        <CreateNoteModal
          createOnClose={createOnClose}
          handleAddNote={handleAddNote}
        />
      </View>
      <View style={[styles.modalCnt, editIsOpen && styles.modalIsOpen]}>
        <EditNoteModal
          editOnClose={editOnClose}
          editOnOpen={handleEditNote}
          currentNote={editingNote}
          setCurrentNote={setEditingNote}
          handleSaveEditedNote={handleSaveEditedNote}
          handleDeleteNote={handleDeleteNote}
        />
      </View>
      <View style={styles.titleBtnCnt}>
        <Text style={styles.title}>твои заметки</Text>
        <TouchableHighlight onPress={createOnOpen} style={styles.addNewNoteBtn}>
          <Text style={styles.button}>+</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.tagsCnt}>
        <TagsList
          setTags={setTags}
          tags={tags}
          style={styles.tagsCnt}
          notes={notes}
          activeTag={activeTag}
          onSetActiveTag={setActiveTag}
        />
      </View>
      <ScrollView>
        <NotesList
          activeTag={activeTag}
          notes={notes}
          editOnOpen={handleEditNote}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
    height: "100%",
    position: "relative",
  },
  titleBtnCnt: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: "Mont-Regular",
    marginRight: 60,
  },
  button: {
    width: "100%",
    fontSize: 30,
    textAlign: "center",
  },
  tagsCnt: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    marginBottom: 50,
    position: "relative",
    minWidth: "100%",
  },
  modalIsOpen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modalCnt: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "none",
  },
  addNewNoteBtn: {
    height: 50,
    width: 50,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
})
