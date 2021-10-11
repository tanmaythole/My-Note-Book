import React from 'react'
import { Card, Button, Badge } from 'react-bootstrap';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';

const NoteItem = ({ note, updateNote, handleDelete }) => {

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
                    <Button variant="danger" size="sm" onClick={() => handleDelete(note.id)}><FaTrashAlt /></Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NoteItem
