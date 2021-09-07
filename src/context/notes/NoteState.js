import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const siteURL = 'http://localhost:5000/'
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes)

  // Fetching all notes
  const getNotes = async ()=>{
    const response = await fetch(`${siteURL}api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNGFjNWM5ZDlkZDBlZTEyZmEyMjE3In0sImlhdCI6MTYzMDg0Njg2OX0.UX5fueMNU8r496nzHs8apQFmnw9vQRhXaFxGbO3mtUc'
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a new Note
  const addNote = async ({title, description, tag}) => {
    const response = await fetch(`${siteURL}api/notes/add`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNGFjNWM5ZDlkZDBlZTEyZmEyMjE3In0sImlhdCI6MTYzMDg0Njg2OX0.UX5fueMNU8r496nzHs8apQFmnw9vQRhXaFxGbO3mtUc'
      },
      body: JSON.stringify({title, description, tag})
    });
  }

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${siteURL}api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNGFjNWM5ZDlkZDBlZTEyZmEyMjE3In0sImlhdCI6MTYzMDg0Njg2OX0.UX5fueMNU8r496nzHs8apQFmnw9vQRhXaFxGbO3mtUc'
      }
    });
    // const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if(element._id===id){
        newNotes.splice(index,1);
        break;
      }
    }
    setNotes(newNotes);
  }

  // Edit a Note
  const editNote = async (enote) => {
    const response = await fetch(`${siteURL}api/notes/update/${enote._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzNGFjNWM5ZDlkZDBlZTEyZmEyMjE3In0sImlhdCI6MTYzMDg0Njg2OX0.UX5fueMNU8r496nzHs8apQFmnw9vQRhXaFxGbO3mtUc'
      },
      body: JSON.stringify({"title":enote.title, "description":enote.description, "tag":enote.tag})
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      if(newNotes[index]._id===enote._id){
        newNotes[index]=json.note;
        break;
      }
    }
    setNotes(newNotes);
  }

  return(
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
          {props.children}
      </NoteContext.Provider>
  )
}

export default NoteState;