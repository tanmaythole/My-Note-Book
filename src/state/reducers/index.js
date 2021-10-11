import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import progressReducer from "./progressReducer";


const reducers = combineReducers({
    notes: notesReducer,
    progress: progressReducer,
})
export default reducers