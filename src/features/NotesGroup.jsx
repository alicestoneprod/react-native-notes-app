import { StyleSheet, View, Text, ScrollView } from "react-native"
import { Note } from "./Note"

export const NotesGroup = ({ notes, activeTag, editOnOpen }) => {
  if (!notes) {
    return (
      <View>
        <Text style={styles.listIsEmptyText}>Лист заметок пуст.</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {activeTag === "#all"
        ? notes
            .sort((a, b) => b.datetime - a.datetime)
            .map((note) => {
              return (
                <Note
                  time={note?.datetime}
                  title={note?.title}
                  tag={note?.tag}
                  description={note?.description}
                  uri={note?.image}
                  editOnOpen={editOnOpen}
                  key={note?.title}
                />
              )
            })
        : notes
            .filter((note) => note?.tag === activeTag)
            .sort((a, b) => b.datetime - a.datetime)
            .map((note) => {
              return (
                <Note
                  time={note?.datetime}
                  title={note?.title}
                  tag={note?.tag}
                  description={note?.description}
                  uri={note?.image}
                  editOnOpen={editOnOpen}
                  key={note?.title}
                />
              )
            })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
  },
  listIsEmptyText: {
    fontSize: 30,
    fontFamily: "Mont-Regular",
  },
})
