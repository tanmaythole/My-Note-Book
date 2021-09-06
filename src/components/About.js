import React, {useContext, useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
    const a = useContext(NoteContext)
    useEffect(() => {
        a.update()
    }, [])
    return (
        <div>
            <h1>About Page - {a.state.name}</h1>
        </div>
    )
}

export default About
