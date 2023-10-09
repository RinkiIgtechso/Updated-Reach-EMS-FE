import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfluencerById } from "../../Redux/AppReducer/action";
import moment from 'moment/moment';
import Common from './Common';
import "../page.css";

function Upcoming() {
  const dispatch = useDispatch();
  const {influencerId} = useSelector((state)=>state.AppReducer);
  let data = influencerId.events;
  const currentTime = moment();

  let upcoming = data?.filter((item)=>{
    let x = item.details.date;
    let date = new Date(x).getDate();
    let month = new Date(x).getMonth() + 1;
    let year = new Date(x).getFullYear();
    let fullDate = year+"-"+month+"-"+date;
    let dateTime = fullDate+ " " + item.details.etime;
    const anotherTime = moment(dateTime);
    if(currentTime.isBefore(anotherTime)){
      return item;
    } 
  })

  useEffect(()=>{
    let val = localStorage.getItem("reachEMS_influencer");
    dispatch(getInfluencerById(val));
  },[])

  return (
    <Common data={upcoming?upcoming:''} text={"Upcoming"} />
  )
}

export default Upcoming;
