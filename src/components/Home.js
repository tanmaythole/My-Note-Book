import React, { useState } from 'react'
import { useEffect } from 'react';
import { Row, Modal, Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from './Loader';
import NoteItem from './NoteItem';
import axiosInstance from '../axios';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

const Home = ({showAlert}) => {
    
    const notes = useSelector(state => state.notes);
    const dispatch = useDispatch();
    const { setNotes } = bindActionCreators(actionCreators, dispatch);
    
    const [show, setShow] = useState(false);
    const [currNote, setCurrNote] = useState({ "id": "", "title": "", "description": "", "tag": "" });
    const [loading, setLoading] = useState(true);
    
    // Fetch all notes
    useEffect(() => {
        axiosInstance
            .get(`notes`)
            .then((res) => {
                setNotes(res.data);
                setLoading(false);
            })
        // eslint-disable-next-line
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
    const handleEditNote = async (e) => {
        e.preventDefault();
        await axiosInstance
            .put(`notes/${currNote.id}/`, {
                title: currNote.title,
                description: currNote.description,
                tag: currNote.tag
            })
            .then((res) => {
                let newNotes = JSON.parse(JSON.stringify(notes));

                for (let index = 0; index < newNotes.length; index++) {
                    if(newNotes[index].id===currNote.id){
                        newNotes[index]=res.data.data;
                        break;
                    }
                }
                setNotes(newNotes);
                showAlert("Note Updated Successfully", "success");
            })
            .catch((err) => {
                showAlert(err.response.data.detail, "danger");
            })
        toggleModal();
    }

    // delete a note
    const handleDelete = (id) => {
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
                showAlert("Note Deleted Successfully", "success");
            })
            .catch((err) => {
                showAlert(err.response.data.detail, "danger");
            })
        }

    if(!localStorage.getItem('access_token')){
        return (
            <Redirect to="/login" />
        );
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
                            <Form.Control type="text" id="title" name="title" value={currNote.title} onChange={onchange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} id="description" name="description" value={currNote.description} onChange={onchange} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tag</Form.Label>
                            <Form.Control type="text" id="tag" name="tag" value={currNote.tag} onChange={onchange} />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>
                            Close
                        </Button>
                        <Button disabled={currNote.title.length===0 || currNote.description.length===0} variant="success" onClick={handleEditNote}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <h1>My Notes</h1>
            {loading? <Loader key="loader" />:(
                <>
                {notes.length===0 && "No Items to display"}
                <Row className="py-2">
                    {notes.map((note) => {
                        return <NoteItem key={note.id} updateNote={updateNote} handleDelete={handleDelete} note={note} />
                    })}
                </Row>
                </>
            )}
        </div>
    )
}

export default Home
