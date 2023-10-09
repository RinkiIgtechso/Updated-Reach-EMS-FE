import * as types from './actionType';

const initialState = {
    isLoading:false,
    error:false,
    isError:false,
    create:false,
    text:'',
    data:[],
    activeData:[],
    inActiveData:[],
    archivedData:[],
    recentEvent:[],
    upcomingEvent:[],
    checkIn:[],
    checkedIn: false,
    eventById:[],
    influencer:[],
    influencerId:[],
    updated:false,
    findPerson:[],
    companyList:[]
}
 
export const reducer = (state = initialState, action) =>{
    const {type, payload} = action;

    switch(type){
        // ---------- all request for events (to get, post, delete and edit)
        case types.GET_EVENT_REQUEST:
            return{
                ...state,
                isLoading:payload,
            }
        case types.GET_EVENT_SUCCESS:
            return{
                ...state,
                isLoading:false,
                data:payload.data,
                activeData:payload.activeData,
                inActiveData:payload.inActiveData,
                archivedData:payload.archivedData,
                recentEvent:payload.recents,
                upcomingEvent:payload.upcomings
            }
        case types.GET_EVENT_BY_ID_SUCCESS:
            return{
                ...state,
                isLoading:false,
                eventById:payload
            }
        case types.GET_EVENT_ERROR:
            return{
                ...state,
                isLoading:false,
                isError:true,
                text:payload
            }
        // ---------- all request for influencers (to get, post, delete and edit)
        case types.GET_INFLUENCER_REQUEST:
            return{
                ...state,
                isLoading:payload,
            }
        case types.GET_INFLUENCER_SUCCESS:
            return{
                ...state,
                isLoading:false,
                influencer:payload.data,
                checkIn:payload.arr
            }
        case types.GET_INFLUENCER_ID_SUCCESS:
            return {
                ...state,
                isLoading:false,
                influencerId:payload
            }
        case types.POST_INFLUENCER_REQUEST:
            return{
                ...state,
                isLoading:payload,
                isError:false,
            }
        case types.POST_INFLUENCER_SUCCESS:
            return{
                 ...state,
                isLoading:false,
                updated:true,
                text:payload
            }
        case types.POST_INFLUENCER_ERROR:
            return{
                ...state,
                isError:true,
                error:true,
                isLoading:false,
                text:payload
            }
        case types.FIND_INFLUENCER_SUCCESS:
            return{
                ...state,
                isLoading:false,
                findPerson:payload
            }
        case types.GET_INFLUENCER_ERROR:
            return{
                ...state,
                isLoading:false,
                isError:true
            }
        // ---------- all request for company (to get and post) ---------
        case types.GET_COMPANY_REQUEST:
            return{
                ...state,
                isLoading:true,
            }
        case types.GET_COMPANY_SUCCESS:
            return{
                ...state,
                companyList:payload,
                isLoading:false,
                isError: false
            }
        case types.GET_COMPANY_EDIT_SUCCESS:
            return{
                ...state,
                text:payload,
                isLoading:false
            }
        case types.DELETE_COMPANY_SUCCESS:
            return{
                ...state,
                isLoading:false,
                text:payload
            }
        case types.GET_COMPANY_ERROR:
            return{
                ...state,
                isLoading:false,
                isError:true,
                text:payload
            }
        case types.SHOW_MESSAGE:
            return{
                ...state,
                text:payload
            }
        // --------- checkIn ---------
        case types.CHECK_IN_REQUEST:
            return{
                ...state, 
                isLoading:payload,
                isError:false,
                text:''
            }
        case types.CHECK_IN_SUCCESS:
            return{
                ...state,
                isLoading:true,
                checkedIn: true,
            }
        case types.CHECK_IN_ERROR:

            return{
                ...state,
                isLoading:false, 
                checkedIn: false,
                isError:true,
                text:payload
            }
        case types.CHECK_IN_FINALLY:
            return{
                ...state,
                isError: payload,
                checkedIn: payload
            }
        // -------- show create event -------
        case types.SHOW_CREATE_EVENT:
            return{
                ...state,
                create:payload
            }
        case "HIDE_ERROR":
            return {
                ...state,
                isError:false
            }
        default:
            return{
                ...state
               
            }
    }
    
}
