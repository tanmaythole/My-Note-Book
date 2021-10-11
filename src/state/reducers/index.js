import { combineReducers } from "redux";
import notesReducer from "./notesReducer";

const reducers = combineReducers({
    notes: notesReducer,
})
export default reducers