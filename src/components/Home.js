import React, { useState } from 'react'
import { useContext, useEffect } from 'react';
import { Row, Modal, Button, Form } from 'react-bootstrap';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Home = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    const [show, setShow] = useState(false);
    const [currNote, setCurrNote] = useState({ "id": "", "title": "", "description": "", "tag": "" });

    // Fetch all notes
    useEffect(() => {
        getNotes();
    }, [])

    // Get Data of selected note
    const updateNote = async (note) => {
        await setCurrNote(note);
        setShow(true);
    }

    // Toggle Modal
    const toggleModal = () => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    // Set on change function
    const onchange = (e) => {
        setCurrNote({ ...currNote, [e.target.name]:e.target.value });
    }

    // handle edit note function
    const handleEditNote = async () => {
        editNote(currNote);
        toggleModal();
    }
    return (
        <div>
            <Modal show={show} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" id="title" name="title" value={currNote.title} onChange={onchange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} id="description" name="description" value={currNote.description} onChange={onchange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tages</Form.Label>
                            <Form.Control type="text" id="tag" name="tag" value={currNote.tag} onChange={onchange} />
                            <Form.Text className="text-muted"> Write tags seprated by commas. </Form.Text>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleEditNote}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <h1>My Notes</h1>
            <Row className="py-2">
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </Row>
        </div>
    )
}

export default Home
