const reducer = (state=0, action) => {
    if(action.type==='progress'){
        return action.payload;
    }
    else {
        return state;
    }
}
export default reducer