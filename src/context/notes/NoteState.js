import NoteContext from "./NoteContext";
import { useState } from "react";
import axiosInstance from "../../axios";



const NoteState = (props) => {
  
  const [notes, setNotes] = useState([]);

  // Fetching all notes
  const getNotes = async (setLoading)=>{
    
    axiosInstance
      .get(`notes`)
      .then((res) => {
        setNotes(res.data);
        setLoading(false);
      })
  }

  // Add a new Note
  const addNote = async ({title, description, tag}) => {
    
    axiosInstance
      .post(`notes`, {
        title: title,
        description: description,
        tag: tag
      })
      .then((res) => {
        return true;
      })
    
  }

  // Delete a Note
  const deleteNote = async (id) => {

    axiosInstance
      .delete(`notes/${id}`)
      .then((res) => {
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          const element = notes[index];
          if(element.id===id){
            newNotes.splice(index,1);
            break;
          }
        }
        setNotes(newNotes);
        return true;
      })

  }

  // Edit a Note
  const editNote = async (enote) => {
    
    axiosInstance
      .put(`notes/${enote.id}/`, {
        title: enote.title,
        description: enote.description,
        tag: enote.tag
      })
      .then((res) => {
        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
          if(newNotes[index].id===enote.id){
            newNotes[index]=res.data.data;
            break;
          }
        }
        setNotes(newNotes);
      })

  }

  return(
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
          {props.children}
      </NoteContext.Provider>
  )
}

export default NoteState;