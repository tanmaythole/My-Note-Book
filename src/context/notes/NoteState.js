import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const s1 = {
        "name": "Tanmay",
        "age": "21"
    }
    const [state, setstate] = useState(s1);
    const update = () => {
        setTimeout(()=>{
            setstate({
                "name": "Tanmay Thole",
                "age": "21"
            })
        }, 1000);
    }
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;