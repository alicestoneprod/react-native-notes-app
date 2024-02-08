import { StyleSheet, ScrollView } from "react-native"
import { Tag } from "./Tag"
import { useEffect } from "react"

export const TagsList = ({
  tags,
  notes,
  activeTag,
  onSetActiveTag,
  setTags,
}) => {
  if (!notes) {
    return <></>
  }

  useEffect(() => {
    const tagsForSet = ["#all"]
    notes
      .sort((a, b) => a.datetime - b.datetime)
      .forEach((note) => {
        if (!tagsForSet?.includes(note?.tag)) {
          tagsForSet.push(note?.tag)
        }
      })

    if (!tagsForSet?.includes(activeTag)) {
      onSetActiveTag("#all")
    }
    setTags(tagsForSet)
  }, [notes])

  return (
    <ScrollView horizontal style={styles.tagsList}>
      {tags.map((tag) => {
        return (
          <Tag
            tag={tag}
            onSetActiveTag={onSetActiveTag}
            activeTag={activeTag}
            key={tag}
          />
        )
      })}
    </ScrollView>
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
  tagsList: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  paginationBtn: {},
  nextBtn: {
    top: 50,
    right: "30%",
    position: "absolute",
    zIndex: 20,
  },
  prevBtn: {
    top: 50,
    left: "30%",
    position: "absolute",
  },
})
