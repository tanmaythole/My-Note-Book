export const setNotes = (notes) => {
    return (dispatch) => {
        dispatch({
            type:"setNotes",
            payload:notes
        })
    }
}

export const setProgress = (progress) => {
    return (dispatch) => {
        dispatch({
            type: 'progress',
            payload: progress
        })
    }
}