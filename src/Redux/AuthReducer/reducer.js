import * as types from './actionType';

const initialState = {
    isLoading:false,
    isError:false,
    loggedIn:false,
    user:[],
    influencer:[],
    upcoming:[],
    archived:[],
    show:true,
    text:'',
    auth:false,
}
 
export const reducer = (state = initialState, action)=>{
    const {type, payload} = action;

    switch(type){
        case types.USER_LOGIN_REQUEST:
           return{
            ...state,
            isLoading: payload,
           }
        case types.USER_LOGIN_SUCCESS:
            return{
                ...state,
                show: true,
                isLoading: false,
                auth: true,
                user: payload,
            }
        case types.USER_LOGIN_ERROR:
            return{
                ...state,
                isError: payload.bool,
                text: payload.error
            }
        case types.INFLUENCER_LOGIN_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case types.INFLUENCER_LOGIN_SUCCESS:
            return{
                ...state,
                isLoading: false,
                user: payload,
                auth: true
            }
        case types.INFLUENCER_LOGIN_ERROR:
            return{
                ...state,
                isError: true,
                text: payload.error
            }
        case types.USER_LOGOUT_REQUEST:
            return{
                ...state,
                auth:false
            }
        case types.SHOW_SUCCESS_MSG:
            return{
                ...state,
                show:false,
                isError:false
            }
        default:
            {
                return state;
            }
    }

}
