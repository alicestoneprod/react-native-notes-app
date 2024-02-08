import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { daySplitter } from "../helpers/daySplitter"
import { NotesGroup } from "./NotesGroup"
import { DateTitle } from "../components/DateTitle"

export const NotesList = ({ notes, activeTag, editOnOpen }) => {
  const [days, setDays] = useState([])
  useEffect(() => {
    let daysToSet = []
    notes
      .sort((a, b) => b.datetime - a.datime)
      .forEach((note) => {
        const splitted = daySplitter(note?.datetime)
        if (!daysToSet.includes(splitted)) {
          return daysToSet.push(splitted)
        }
      })
    console.log(daysToSet)
    setDays(daysToSet)
  }, [notes])

  return days.map((day) => {
    let filteredNotes =
      activeTag === "#all"
        ? notes.filter((note) => daySplitter(note?.datetime) === day)
        : notes.filter(
            (note) =>
              daySplitter(note?.datetime) === day && note?.tag === activeTag
          )
    console.log(filteredNotes)
    return activeTag === "#all" ? (
      <>
        <DateTitle text={day} />
        <NotesGroup
          notes={filteredNotes}
          activeTag={activeTag}
          editOnOpen={editOnOpen}
        />
      </>
    ) : (
      <>
        <DateTitle
          text={day}
          display={
            filteredNotes?.length >= 1 &&
            filteredNotes.filter((note) => note?.tag === activeTag)
              ? "flex"
              : "none"
          }
        />
        <NotesGroup
          notes={filteredNotes}
          activeTag={activeTag}
          editOnOpen={editOnOpen}
        />
      </>
    )
  })
}

const styles = StyleSheet.create({})
