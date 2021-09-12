import NoteContext from "./NoteContext";
import { useState } from "react";



const NoteState = (props) => {
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const BackendURL = process.env.REACT_APP_BACKEND_URL;
  const authToken = localStorage.getItem('auth-token');

  // Fetching all notes
  const getNotes = async ()=>{
    const response = await fetch(`${BackendURL}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'auth-token':authToken
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a new Note
  const addNote = async ({title, description, tag}) => {
    const response = await fetch(`${BackendURL}/api/notes/add`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'auth-token':authToken
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    if(json.status==='ok'){
      return true;
    }
    return false;
  }

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${BackendURL}/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
        'auth-token':authToken
      }
    });
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if(element._id===id){
        newNotes.splice(index,1);
        break;
      }
    }
    setNotes(newNotes);
    if(json.success){
      return true;
    }
    return false;
  }

  // Edit a Note
  const editNote = async (enote) => {
    const response = await fetch(`${BackendURL}/api/notes/update/${enote._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'auth-token':authToken
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
    if(json.status==='ok'){
      return true;
    }
    return false;
  }

  return(
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
          {props.children}
      </NoteContext.Provider>
  )
}

export default NoteState;