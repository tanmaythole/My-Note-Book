import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const initialNotes = [
        {
          "_id": "61350b92ada084e3945ae696",
          "user": "6134ac5c9d9dd0ee12fa2217",
          "title": "My Title",
          "description": "My Description",
          "tag": "",
          "date": "2021-09-05T18:25:22.852Z",
          "__v": 0
        },
        {
          "_id": "6136f75425ad26da0cd451f8",
          "user": "6134ac5c9d9dd0ee12fa2217",
          "title": "My Title2",
          "description": "My Description2",
          "tag": "General",
          "date": "2021-09-07T05:23:32.015Z",
          "__v": 0
        }
    ];
    const [notes, setNotes] = useState(initialNotes)

    // Add a new Note
    const addNote = ({title, description, tags}) => {
      setNotes(notes.concat({title, description, tags}));
      console.log("object");
      return
    }

    // Delete a Note
    const deleteNote = () => {

    }

    // Edit a Note
    const editNote = () => {

    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;