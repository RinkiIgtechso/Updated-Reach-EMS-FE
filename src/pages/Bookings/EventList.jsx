import React,{ useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfluencerById } from "../../Redux/AppReducer/action";
import Common from './Common';
import "../page.css";

function EventList() {
  const dispatch = useDispatch();
  const {influencerId} = useSelector((state)=>state.AppReducer);
  let data = influencerId.events;
  data?.sort((a, b)=>new Date(a.details.date).getTime() -  new Date(b.details.date).getTime());

  useEffect(()=>{
    let val = localStorage.getItem("reachEMS_influencer");
    dispatch(getInfluencerById(val)); 
  },[])

  return (
    <Common data={data?data:''} text={"Events"} />
  )
}

export default EventList;
