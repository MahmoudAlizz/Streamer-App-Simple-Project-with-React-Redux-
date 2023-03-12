import {
    FETCH_STREAMS,
    CREATE_STREAM,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/type'
import _ from 'lodash'

const Stream_Reducer =  (state={stream:null,streamsCount:null},action) =>{
    switch(action.type){
        case FETCH_STREAM :
            return {...state,[action.payload.id]:action.payload}
        case CREATE_STREAM :
            return {...state,[action.payload.id]:action.payload}
        case EDIT_STREAM :
            return {...state,[action.payload.id]:action.payload}
        case DELETE_STREAM : 
            return _.omit(state,action.payload)
        case FETCH_STREAMS :
            return {stream:_.mapKeys(action.payload.response,'id'),streamsCount:action.payload.streamsCount}
        default : 
            return state;
    }
}

// List
// const Stream_Reducer1 =  (state=[],action) =>{
//     switch(action.type){
//         case FETCH_STREAM :
//             return [...state,action.payload];
//         case CREATE_STREAM :
//             return [...state,action.payload];
//         case EDIT_STREAM :
//             return state.map(str=>{
//                 if(str.id==action.payload.id)
//                     {return action.payload}
//                 else {
//                     return str
//                 }
//             }) 
//         case DELETE_STREAM : 
//             return state.filter(str=>{
//                 if(str.id != action.payload){
//                     return str;
//                 }
//             })
//         case FETCH_STREAMS : 
//             return action.payload
//         default : 
//             return state;
//     }
// }

export default Stream_Reducer;