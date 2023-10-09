import * as types from './actionType';
import axios from 'axios';
import moment from 'moment/moment';

const currentTime = moment();

const getAllEvents = (dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.GET_EVENT_REQUEST,payload:true});
    // const token = : "same-origin" }
    axios.get(`${process.env.REACT_APP_APIURL}events/`, headers )
    .then((res)=>{
        let data = res.data.events;
        let activeData = data.filter((item)=>{
            return item.status === 'active'
        })
        let inActiveData = data.filter((item)=>{
            return item.status === 'inactive'
        })
        let archivedData = data.filter((item)=>{
            let x = item.date;
            let date = new Date(x).getDate();
            let month = new Date(x).getMonth() + 1;
            let year = new Date(x).getFullYear();
            let fullDate = year+"-"+month+"-"+date;
            let dateTime = fullDate+ " " + item.etime;
            const anotherTime = moment(dateTime);
            if(currentTime.isAfter(anotherTime) || item.status==='archived'){
              return item;
            } 
        })
        let recents = [];
        let upcomings = [];
        data.filter((item)=>{
            let date1 = new Date(item.date);
            let date2 = new Date(); 
            if(date1>=date2){
                upcomings.push(item);
            }else{
                recents.push(item);
            }
        })
        recents.sort((a, b)=>new Date(a.date).getTime() - 
        new Date(b.date).getTime()).reverse();
        upcomings.sort((a, b)=>new Date(a.date).getTime() - 
        new Date(b.date).getTime());
        data.sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime()).reverse();
        dispatch({type:types.GET_EVENT_SUCCESS,payload:{data, activeData, inActiveData, archivedData, recents, upcomings}});
    })
    .catch((err)=>{
        dispatch({type:types.GET_EVENT_ERROR,payload:'There is somthing wrong'})
    })
}

const createEvent = (data)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }

    axios.post(`${process.env.REACT_APP_APIURL}events/`,data,headers)
    .then((res)=>{getAllEvents(dispatch)})
    .catch((err)=>{ dispatch({type:types.GET_EVENT_ERROR,payload:'There is somthing wrong'})})
}

const deleteEvent = (id)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    axios.delete(`${process.env.REACT_APP_APIURL}events/id/${id}`,headers)
    .then((res)=>{
        dispatch({type:types.SHOW_MESSAGE, payload:res.data.msg})
        getAllEvents(dispatch);
    })
    .catch((err)=>alert(err.response.data.err))
}

const getEventById = (id)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.GET_INFLUENCER_REQUEST,payload:true});
    axios.get(`${process.env.REACT_APP_APIURL}events/id/${id}`,headers )
    .then((res)=>
        dispatch({type:types.GET_EVENT_BY_ID_SUCCESS,payload:res.data})
    )
    .catch((err)=>{
        dispatch({type:types.GET_EVENT_ERROR,payload:"There is something wrong"})
    })
}

const updateStatus = (id,data)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    axios.patch(`${process.env.REACT_APP_APIURL}events/id/${id}`,data,headers)
    .then((res)=>{
        // alert(res.data.msg);
        dispatch({type:types.SHOW_MESSAGE, payload:res.data.msg})
        getAllEvents(dispatch);
    })
    .catch((err)=>{
        alert(err.response.data.err);
    })
}

// ------ company -------
const getCompany = (dispatch) => {
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.GET_COMPANY_REQUEST,payload:true});
    axios.get(`${process.env.REACT_APP_APIURL}auth/company`,headers)
    .then((res)=>{
        dispatch({type:types.GET_COMPANY_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:types.GET_COMPANY_ERROR,payload:err.response.data.err})
    })
}
 
const createCompany = (data)=>(dispatch)=>{
    let token = localStorage.getItem("user");
// cons = {wi: true};
let headers = {
    headers:{
        "authorization" : `Bearer ${token}`
    }
}
    axios.post(`${process.env.REACT_APP_APIURL}auth/create`,data,headers)
    .then((res)=>{
        getCompany(dispatch);
        dispatch(showCreateEvent(false));
    })
    .catch((err)=>{
        dispatch(showCreateEvent(true));
        dispatch({type:types.GET_COMPANY_ERROR, payload:err.response.data})
    })
}

const editCompany = (data,id)=>(dispatch)=>{
    let token = localStorage.getItem("user");
// cons = {wi: true};
let headers = {
    headers:{
        "authorization" : `Bearer ${token}`
    }
}
    dispatch({type:types.GET_COMPANY_REQUEST, payload:true});
    axios.put(`${process.env.REACT_APP_APIURL}auth/id/${id}`,data,headers)
    .then((res)=>{
        dispatch({type:types.GET_COMPANY_EDIT_SUCCESS,payload:res.data.msg})
        getCompany(dispatch)
    })
    .catch((err)=>{console.log(err);
        dispatch({type:types.GET_COMPANY_ERROR,payload:err.response.data.err})
    })
}

const deleteCompany = (id)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.GET_COMPANY_REQUEST, payload:true});
    axios.delete(`${process.env.REACT_APP_APIURL}auth/id/${id}`,headers)
    .then((res)=>{
        getCompany(dispatch);
        dispatch({type:types.DELETE_COMPANY_SUCCESS,payload:res.data.msg})
    })
    .catch((err)=>{dispatch({type:types.GET_COMPANY_ERROR,payload:err.response.data.err})})
}

// ----- checkIn ------
const checkIn = (data)=>async (dispatch)=>{
    let token = localStorage.getItem("user");
    try{
        let headers = {
            headers:{
                "authorization" : `Bearer ${token}`
            }
        }
        dispatch({type:types.CHECK_IN_REQUEST, payload:true});
        await axios.post(`${process.env.REACT_APP_APIURL}influencers/checkin`,data,headers)
        .then((res)=>
            { 
                dispatch({type:types.CHECK_IN_SUCCESS,payload:true})
            }
        )
    }catch(err){
        dispatch({type:types.CHECK_IN_ERROR,payload:err.response.data.err})
    }
    finally{
        setTimeout(()=>{
            dispatch({type:types.CHECK_IN_FINALLY, payload:false})
        }, 1800)
    }
}
 
//  ----- influencer --------
const getAllInfluencers = (dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization": `Bearer ${token}`
        }
    }
    dispatch({type:types.GET_INFLUENCER_REQUEST,payload:true});
    axios.get(`${process.env.REACT_APP_APIURL}influencers/`,headers)
    .then((res)=>{
        let arr = [];
        for(let i=0; i<res.data.length; i++){
            let sum = 0;
            let event = res.data[i].events;
            if(event.length>0){
                for(let j=0; j<event.length; j++){
                    if(event[j].status!=="pending"){
                        sum+=1;
                    }
                }
            }
            arr.push(sum);
        }
        let data = res.data;
        dispatch({type:types.GET_INFLUENCER_SUCCESS,payload:{data, arr}})
    })
    .catch((err)=>dispatch({type:types.GET_INFLUENCER_ERROR,payload:"There is something wrong"}))
}

const addInfluencer = (data)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.POST_INFLUENCER_REQUEST, payload:true});
    axios.post(`${process.env.REACT_APP_APIURL}influencers/add`,data,headers)
    .then((res)=>{
        getAllInfluencers(dispatch);
        dispatch({type:types.POST_COMPANY_SUCCESS, payload:res.data.msg})
        setTimeout(()=>{
            dispatch(showCreateEvent(false));
        }, 400)
    })
    .catch((err)=>{
        dispatch(showCreateEvent(true));
        dispatch({type:types.POST_INFLUENCER_ERROR, payload:err.response.data.err.name?err.response.data.err.name:err.response.data.err})
    })
}

let arr = [];
const findInfluencer = (data)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.POST_INFLUENCER_REQUEST,payload:true});
    axios.post(`${process.env.REACT_APP_APIURL}influencers/find/`,data,headers)
    .then((res)=>{
        arr.push(res.data);
        dispatch({type:types.FIND_INFLUENCER_SUCCESS,payload:arr})}
    )
    .catch((err)=>{dispatch({type:types.POST_INFLUENCER_ERROR,payload:"There is something wrong"})})
}

const deleteInfluencer = (id)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.POST_INFLUENCER_REQUEST, payload:true});
    axios.delete(`${process.env.REACT_APP_APIURL}influencers/id/${id}`,headers)
    .then((res)=>
        {  
            dispatch({type:types.POST_INFLUENCER_SUCCESS,payload:res.data.msg})
            getAllInfluencers(dispatch)
        }
    )
    .catch((err)=>dispatch({type:types.POST_INFLUENCER_ERROR, payload:err.response.data?.err.name?err.response.data?.err.name:err.response.data?.err}))
}

const getInfluencerById = (id)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.GET_INFLUENCER_REQUEST,payload:true});
    axios.get(`${process.env.REACT_APP_APIURL}influencers/id/${id}`,headers)
    .then((res)=>{        
        dispatch({type:types.GET_INFLUENCER_ID_SUCCESS, payload:res.data})
    })
    .catch((err)=>dispatch({type:types.GET_INFLUENCER_ERROR,payload:"There is something wrong"}))
}

const editInfluencer = (data,id)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.POST_INFLUENCER_REQUEST, payload:true})
    axios.put(`${process.env.REACT_APP_APIURL}influencers/id/${id}`,data, headers)
    .then((res)=>{dispatch({type:types.POST_INFLUENCER_SUCCESS, payload:res.data.msg})
        getAllInfluencers(dispatch)
    })
    .catch((err)=>{
        dispatch({type:types.POST_INFLUENCER_ERROR, payload:err.response.data.err})})
}

const resendEmail = (data)=> (dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.POST_INFLUENCER_REQUEST, payload:true})
    axios.post(`${process.env.REACT_APP_APIURL}influencers/resend`,data,headers)
    .then((res)=>{
        dispatch({type:types.POST_INFLUENCER_SUCCESS, payload:res.data.msg})})
    .catch((err)=>dispatch({type:types.GET_INFLUENCER_ERROR,payload:"There is something wrong"}))
}

const removeInfluencer = (id, data)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.POST_INFLUENCER_REQUEST, payload:true})
    axios.post(`${process.env.REACT_APP_APIURL}influencers/delete/id/${id}`,data,headers)
    .then((res)=>{
        dispatch({type:types.POST_INFLUENCER_SUCCESS, payload:res.data.msg})
        dispatch(getInfluencerById(id));
    })
    .catch((err)=>dispatch({type:types.GET_INFLUENCER_ERROR,payload:"There is something wrong"}))
}

const assignEvent = (id,data)=>(dispatch)=>{
    let token = localStorage.getItem("user");
    let headers = {
        headers:{
            "authorization" : `Bearer ${token}`
        }
    }
    dispatch({type:types.POST_INFLUENCER_REQUEST, payload:true})
    axios.post(`${process.env.REACT_APP_APIURL}influencers/add/id/${id}`,data, headers)
    .then((res)=>{
        dispatch(getInfluencerById(id))
        dispatch({type:types.POST_INFLUENCER_SUCCESS, payload:res.data.msg})})
    .catch((err)=>dispatch({type:types.GET_INFLUENCER_ERROR,payload:"There is something wrong"}))
}

// ---- show create event ----
const showCreateEvent = (val)=>(dispatch)=>{
    dispatch({type:types.SHOW_CREATE_EVENT, payload:val});
}

export {
    getAllEvents, 
    getEventById,
    getAllInfluencers, 
    getInfluencerById,
    getCompany, 
    updateStatus, 
    createCompany,
    deleteEvent,
    addInfluencer,
    createEvent,
    findInfluencer,
    deleteInfluencer,
    editInfluencer,
    resendEmail,
    removeInfluencer,
    assignEvent,
    checkIn,
    editCompany,
    deleteCompany,
    showCreateEvent
};