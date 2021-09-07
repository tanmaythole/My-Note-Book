import React from 'react'
import { useContext } from 'react';
import { Row } from 'react-bootstrap';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Home = () => {
    const context = useContext(NoteContext);
    const {notes} = context;
    return (
        <div>
            <h1>My Notes</h1>
            <Row className="py-2">
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note} />
            })}
            </Row>
        </div>
    )
}

export default Home
