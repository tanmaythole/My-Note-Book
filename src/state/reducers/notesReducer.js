const reducer = (state=[], action) => {
    if(action.type==='setNotes'){
        return action.payload;
    }
    else {
        return state;
    }
}
export default reducer