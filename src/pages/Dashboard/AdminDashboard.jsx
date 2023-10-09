import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getAllInfluencers } from '../../Redux/AppReducer/action';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useEffect } from 'react';
import "../page.css";

function AdminDashboard(){
  const {data, influencer, checkIn, recentEvent, upcomingEvent, isLoading} = useSelector((state)=>state.AppReducer);
  const dispatch = useDispatch();

  useEffect(()=>{
    getAllEvents(dispatch);
    getAllInfluencers(dispatch);
  },[])

    return(
      <div>
        <div className='bg-gray-50 w-full py-6 min-[300px]:max-[1024px]:px-10 px-16 mb-[5rem]'>
          <div className='grid grid-cols-1 min-[700px]:grid-cols-3 gap-6'>
            <div className='bg-white min-[700px]:max-[1024px]:py-5 py-8 text-center rounded-xl '>
              <p className='text-primary-400 font-extrabold min-[700px]:max-[1024px]:text-xl text-3xl mb-1'>{data?.length}</p>
              <p className='font-bold min-[700px]:max-[1024px]:text-xs text-sm'>EVENTS</p>
            </div>
            <div className='bg-white min-[700px]:max-[1024px]:py-5 py-8 text-center rounded-xl'>
              <p className='text-primary-400 font-extrabold min-[700px]:max-[1024px]:text-xl text-3xl mb-1'>{influencer?.length}</p>
              <p className='font-bold min-[700px]:max-[1024px]:text-xs text-sm'>TOTAL INFLUENCERS</p>
            </div>
            <div className='bg-white min-[700px]:max-[1024px]:py-5 py-8 text-center rounded-xl'>
              <p className='text-primary-400 font-extrabold min-[700px]:max-[1024px]:text-xl text-3xl mb-1'>{checkIn.length>0?checkIn.reduce((a, b)=>{return a+b}):0}</p>
              <p className='font-bold min-[700px]:max-[1024px]:text-xs text-sm'>CHECK INS</p>
            </div>
          </div>
          <div className='mt-5 grid grid-cols-3 max-[820px]:grid-cols-1 gap-6'>
            <div className='col-span-2 max-[820px]:col-span-1 bg-white p-4 rounded-xl'>
              {/* --- recent events --- */}
              <h3 className='uppercase font-extrabold'>recent events</h3>
              <div className='recent_event mt-5 max-[820px]:mt-10'>
                {recentEvent?.map((item)=>
                  <div className="mb-5" key={item._id}>
                    <div className='border-[1px] border-gray-200 rounded-xl p-3 flex justify-between items-center'>
                      <div>
                        <p className='font-extrabold max-[820px]:text-xs'>{item.name}</p>
                        <p className='text-sm text-gray-400 font-semibold'>{item.location}</p>
                      </div>
                      <div className='flex flex-col align-middle justify-center text-sm text-center place-items-center'>
                        <div className='bg-blue-200 p-2 w-10 rounded-2xl max-[425px]:w-8 max-[425px]:rounded-xl'><img src="/Images/BEvent.svg" alt="event" /></div>
                        <p className='text-sm text-gray-400 font-semibold  max-[425px]:text-xs'>{item.date}</p>
                      </div>
                    </div>
                  </div>
                )}
                {/* ---- */}
                {recentEvent.length===0?<div className='mt-10 text-gray-600 text-sm text-center'>No Recent Events</div>:""}
                {/* ------ loader ----- */}
                {isLoading?<div className='grid align-middle justify-center mt-7'><CircularProgress /></div>:''}
              </div>
            </div>
            {/* ----- upoming events ----- */}
              <div className='bg-white p-4 rounded-xl'>
                <h3 className='uppercase font-extrabold'>upcoming events</h3>
                {upcomingEvent.length>0?<div>
                  <div className='mt-10'>
                    <p className='text-sm text-gray-400 font-bold'>{upcomingEvent[0]?upcomingEvent[0].name:'upcoming event name'}</p>
                    <p className='uppercase font-semibold mt-1'>{upcomingEvent[0]?upcomingEvent[0].company.name:"Company Name"}</p>
                  </div>
                  <div className='mt-10'>
                    <p className='text-sm text-gray-400 font-bold'>Influencers</p>
                    <div className='flex mt-3 w-full'>
                      {/* avatar images */}
                      <AvatarGroup max={5}>
                        {upcomingEvent?upcomingEvent[0]?.influencers.map((item)=>
                          <Avatar  alt='admin-logo' src="/Images/user_dummy2.png" key={item._id}/>
                        ):"No Influencers"}
                      </AvatarGroup>
                    </div>
                  </div>
                  <div className='mt-10'>
                    <p className='text-sm text-gray-400 font-bold'>Date and Location</p>
                    <p className='uppercase font-semibold mt-1 max-[1024px]:text-base'>{upcomingEvent[0]?upcomingEvent[0].date:"Date"} at {upcomingEvent[0]?upcomingEvent[0].location:"Location"}</p>
                  </div>
                </div>:<div className='w-auto text-red-500 text-center h-auto my-9 text-xs'>No upcoming events....</div>}
              </div>
          </div>
        </div>
      </div>
    )
}

export default AdminDashboard;