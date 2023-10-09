import axios from 'axios';
import * as types from './actionType';

const getData = (data) => (dispatch)=>{
    dispatch({type:types.USER_LOGIN_REQUEST,payload:true})
    const url = `${process.env.REACT_APP_APIURL}auth/login`;
   
       axios.post(url, data)
      .then((res)=>{
        localStorage.setItem("user",res.data.token);
        localStorage.setItem('role',res.data.role);
        localStorage.setItem('auth_reachEMS',"true");
        localStorage.setItem("reachEMS_admin", JSON.stringify(res.data.user));
        dispatch({type:types.USER_LOGIN_SUCCESS,payload:res.data.user});
      }) 
     .catch((err)=>{
         let error = err.response.data.err;
      let bool = true;
      localStorage.setItem('auth_reachEMS',"false");
      dispatch({type:types.USER_LOGIN_ERROR, payload:{error, bool}});
     })
}

const logout = (dispatch)=>{
  dispatch({type:types.USER_LOGOUT_REQUEST, payload:true})
  axios.get(`${process.env.REACT_APP_APIURL}auth/logout`)
  .then((res)=>{
    console.log("logged Out")
    // Cookies.remove('user');
  })
  .catch((err)=>{console.log(err)})
}

const getLogin = (data) => (dispatch)=>{
  dispatch({type:types.INFLUENCER_LOGIN_REQUEST, payload:true})
  const url = `${process.env.REACT_APP_APIURL}influencers/login`;
 
    axios.post(url, data)
    .then((res)=>{
      localStorage.setItem("user",res.data.token);
      localStorage.setItem('auth_reachEMS',"true");
      localStorage.setItem("reachEMS_influencer", res.data.influencer._id);
      dispatch({type:types.INFLUENCER_LOGIN_SUCCESS, payload:res.data.influencer})
    })
    .catch((err)=>{
        let error = err.response.data?err.response.data.err:"Enter correct details";
        let bool = true;
        dispatch({type:types.INFLUENCER_LOGIN_ERROR, payload:{error, bool}})
    })
}

const showMsg = (dispatch) =>{
    dispatch({type:types.SHOW_SUCCESS_MSG,payload:false});
}

export {getData, showMsg, getLogin, logout};
