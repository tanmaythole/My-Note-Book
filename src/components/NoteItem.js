import React from 'react'
import { Card, Button } from 'react-bootstrap';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className="col-md-3 mb-4">
            <Card>
                <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                        {note.description}
                    </Card.Text>
                    <Button variant="primary" size="sm"><FaEdit /></Button>{' '}
                    <Button variant="danger" size="sm"><FaTrashAlt /></Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default NoteItem
