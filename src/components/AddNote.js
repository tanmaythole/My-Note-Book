import React, {useContext, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import NoteContext from '../context/notes/NoteContext'
import { useHistory } from "react-router";

const AddNote = () => {
    const context = useContext(NoteContext);
    const history = useHistory();
    const {addNote} = context;

    const [formData, setFormData] = useState({"title":"","description":"", "tags":""});

    // On change form data
    const onchange = (e)=> {
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    // handle add note form
    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(formData);
        history.push('/');
    }
    return (
        <div className="col-md-6 m-auto">
            <h1>Add New Note</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" id="title" name="title" onChange={onchange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} id="description" name="description" onChange={onchange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tages</Form.Label>
                    <Form.Control type="text" id="tag" name="tag" onChange={onchange} />
                </Form.Group>

                <Button disabled={formData.title.length<1 || formData.description.length<1} variant="success" type="submit" onClick={handleAddNote}>
                    Add Note
                </Button>
            </Form>
        </div>
    )
}

export default AddNote
