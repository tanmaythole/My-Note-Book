export const setNotes = (notes) => {
    return (dispatch) => {
        dispatch({
            type:"setNotes",
            payload:notes
        })
    }
}