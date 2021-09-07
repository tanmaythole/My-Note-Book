import React, { useContext } from 'react'
import { Card, Button } from 'react-bootstrap';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3 mb-4">
            <Card>
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                        {note.description}
                    </Card.Text>
                    <p>Last Updated on {new Date(note.date).toLocaleString()}</p>
                    <Button variant="primary" size="sm" onClick={()=>updateNote(note)}><FaEdit /></Button>{' '}
                    <Button variant="danger" size="sm" onClick={()=>deleteNote(note._id)}><FaTrashAlt /></Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NoteItem
