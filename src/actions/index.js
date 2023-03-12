import {
    SIGNIN,
    SIGNOUT,
    NEW_ACCOUNT, 
    FETCH_STREAMS,
    CREATE_STREAM,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
    ERRORMESSAGE
} from '../actions/type'
import stream from '../apis/stream'
import { useNavigate } from "react-router-dom";


export const signIn = formValue => async dispatch => {
    const response = await stream.get(`/accounts?username=${formValue.username}&&password=${formValue.password}`)
    if(response.data!=0){
        dispatch({type:SIGNIN,payload:response.data[0]})
    }
    else{
        dispatch({type:ERRORMESSAGE,payload:'Incorrect username or password'})
    }
}

export const newAccount = formValue => async dispatch => {
    const resname = await stream.get(`/accounts?username=${formValue.username}`)
    
    if(resname.data==0){
         const response = await stream.post('/accounts',formValue)
         dispatch({type:NEW_ACCOUNT,payload:response.data})}
    else{
        dispatch({type:ERRORMESSAGE,payload:'Change the username'})
    }
}

export const signOut = () => {
    return {
        type: SIGNOUT
    }
}

export const createStream = formValue => async (dispatch,getState) => {
    const response = await stream.post('/streams', {...formValue,userId:getState().auth.userId});

    dispatch ({type:CREATE_STREAM,payload:response.data})
}

export const fetchStream = id => async dispatch => {
    const response = await  stream.get(`/streams/${id}`)

    dispatch({type:FETCH_STREAM,payload:response.data})
}

export const fetchStreams = ()=> async (dispatch,getState) =>{
    const response = await stream.get('/streams')
    dispatch({type:FETCH_STREAMS,payload:{
        response:response.data,
        streamsCount:response.data.length
    }})
}

export const editStream = (id,formValue)=> async dispatch =>{
    const response = await stream.patch(`/streams/${id}`,formValue);

    dispatch({type:EDIT_STREAM,payload:response.data})
}

export const deleteStream = id => async dispatch =>{
  await stream.delete(`/streams/${id}`)
  
  dispatch({type:DELETE_STREAM,payload:id})
}