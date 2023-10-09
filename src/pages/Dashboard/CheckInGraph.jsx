import React, {useState, useEffect} from 'react';
import { Fade } from "react-awesome-reveal"
import {GrDown} from "react-icons/gr";
import {BsThreeDots} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../Redux/AppReducer/action';
import '../page.css';

function CheckInGraph() {
  const dispatch = useDispatch();
  const {data, upcomingEvent} = useSelector((state)=>state.AppReducer);
  const [dropdown, setDropdown] = useState(false);
  const [arr, setArr] = useState();
  const [coming, setComing] = useState(0);
  const [noComing, setNoComing] = useState(0);

  const handleClick = ()=>{
    setDropdown(prev=>!prev)
  }

  const handleSelect = (id)=>{
    setComing(0);
    setNoComing(0);
    setDropdown(false);
    let array = data.filter((item)=>{
      if(item._id===id){
        item.influencers.filter((ele)=>{
          if(ele.status==="pending"){
            setNoComing((prev)=>prev+1)
          }else{
            setComing((prev)=>prev+1);
          }
        })
      }
      return item._id===id
    })
    setArr(()=>array);

  }

  useEffect(()=>{  
    getAllEvents(dispatch);
  },[])

  return (
    <div className='w-full p-6 mt-5 mb-14'>
      <div className='grid grid-cols-3 max-[1024px]:grid-cols-1 gap-6'>
        <div className='col-span-2 max-[1024px]:col-span-1 bg-white p-4 rounded-xl'>
            <div className='relative'>
              <div className='flex gap-4 items-center cursor-pointer py-3 font-bold text-gray-950 w-[174px]' onClick={handleClick}>
                <div>{arr?arr[0].name:"Event Name Here"}</div><GrDown style={{color:"black" ,fontWeight:"bold"}} />
              </div>
              <div className={`absolute top-11 left-0 overflow-y-auto shadow-lg h-auto ${dropdown?"block" :"hidden"}`}>
                {data?.map((item,index)=>
                  <div className='py-3 pl-4 pr-8 bg-white hover:bg-blue-300 hover:text-blue-800 cursor-pointer' key={index}
                  onClick={()=>handleSelect(item._id)}>
                    {item.name}
                  </div>
                )}
                {data.length===0?<div className='py-3 pl-4 pr-8 bg-white border-[1px] border-gray-200'>No Events Here</div>:""}
              </div>
              <div className='text-gray-400 '>{arr?arr[0].date:"Date"} | {arr?arr[0].stime:"Stime"} - {arr?arr[0].etime:'Etime'}</div>
            </div>
            <div className='mt-10'>
              <div className='flex gap-7 text-xl font-extrabold'>
                <p className='text-primary-200 text-center'>{coming} <br/> Coming</p>
                <p className='text-red-600 text-center'>{noComing} <br/> Not Coming</p>
              </div>
              <div>
                {arr?<div className='recent_event mt-7'>
                  {arr[0]?.influencers.map((item)=>
                    <div className="mb-3" key={item._id}>
                      <div className='border-[1px] border-gray-200 rounded-xl p-3 flex justify-between items-center'>
                        <div className='flex gap-3 items-center'>
                          <img src="/Images/user_dummy1.png" width='50px' height='50px' className="rounded-full" alt="influencer-image" />
                          <p className='text-gray-500 font-bold'>{item.name}</p>
                        </div>
                        {item.status==="pending"?
                        <div className='flex items-center gap-3'>
                          <img src="/Images/no.svg" alt="check-In" />
                          <p className='text-gray-500 font-bold'>No</p>
                        </div>
                        :
                        <div className='flex items-center gap-3'>
                          <img src="/Images/yes.svg" alt="check-In" />
                          <p className='text-green-500 font-bold'>Yes</p>
                        </div>}
                      </div>
                    </div>
                  )}
                </div>:
                <div className='my-6 text-center font-bold '>
                  No Influencer
                </div>
                }
              </div>
            </div>
        </div>
        <div className='bg-white p-5 rounded-xl'>
            <h3 className='uppercase font-bold'>upcoming events</h3>
            <div className="my-8">
              {upcomingEvent?.map((item)=>
                <div className='border-[1px] border-gray-200 rounded-xl p-4 flex justify-between items-center mb-3' key={item._id}>
                  <div className='flex gap-3 flex-col justify-start leading-3 text-sm'>
                    <p className='text-gray-800 font-bold'>Event Name </p>
                    <p className='text-gray-500'>{item.name}</p>
                  </div>
              </div>
              )}
              {upcomingEvent.length<1?<div className='mt-5 text-red-300 text-center text-xs'>No Upcoming Events...</div>:""}
            </div>
        </div>
      </div>
    </div>
  )
}

export default CheckInGraph
