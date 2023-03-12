import {SIGNIN ,SIGNOUT,NEW_ACCOUNT,ERRORMESSAGE} from '../actions/type';

const Auth = (state={isSignedIn:false,userId:null,userName:null,errormessage:' '},action)=>{
    switch(action.type){
        case SIGNIN : 
            return {...state,isSignedIn:true,userId:action.payload.id,userName:action.payload.username,errormessage:' '}
        case NEW_ACCOUNT : 
            return {...state,isSignedIn:true,userId:action.payload.id,userName:action.payload.username,errormessage:' '}
        case SIGNOUT : 
            return {...state,isSignedIn:false,userId:null,userName:null}
        case ERRORMESSAGE :
            return {...state,errormessage:action.payload}
        default :
            return state
    }
}

export default Auth