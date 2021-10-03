import React, { useContext } from 'react'
import { Card, Button, Badge } from 'react-bootstrap';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const { note, updateNote, showAlert } = props;
    const handleDelete = () => {
        if(deleteNote(note.id)){
            showAlert("Note Deleted Successfully", "success");
        } else {
            showAlert("Something Went Wrong", "danger");
        }
    }
    return (
        <div className="col-md-3 mb-4">
            <Card>
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                        {note.description}
                    </Card.Text>
                    <Card.Text className="text-muted" style={{fontSize:'14px'}} >
                        Last Updated on {new Date(note.date).toLocaleString()}
                    </Card.Text>
                    <div style={{top:0,right:0, position:'absolute', margin:0}}>
                        <Badge bg="success">{note.tag}</Badge>
                    </div>
                    <Button variant="primary" size="sm" onClick={()=>updateNote(note)}><FaEdit /></Button>{' '}
                    <Button variant="danger" size="sm" onClick={handleDelete}><FaTrashAlt /></Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NoteItem
