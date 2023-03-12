import { combineReducers } from "redux";
import { reducer as  formReducer } from "redux-form";
import Auth from './auth'
import Stream_Reducer from './StreamReducer'
export default combineReducers({
    auth:Auth,
    form:formReducer,
    Streams:Stream_Reducer
})
