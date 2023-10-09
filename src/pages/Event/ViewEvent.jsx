import React, { useState,useEffect } from 'react';
import Navbar from '../../component/Navbar';
import Searchbar from '../../component/Searchbar';
import { useDispatch, useSelector } from 'react-redux';
import { getEventById } from '../../Redux/AppReducer/action';
import { useParams } from 'react-router-dom';

function ViewEvent() {
    const [show, setShow] = useState(false);
    const {eventById} = useSelector((state)=>state.AppReducer);
    const dispatch = useDispatch();
    const params = useParams();

    const handleClick = ()=>{
        setShow((prev)=>!prev);
    }

    useEffect(()=>{
        dispatch(getEventById(params.id));
    },[show])
    
  return (
    <div className='flex'>
      <div className='min-[700px]:max-[1024px]:w-[30%] min-[100px]:max-[700px]:hidden w-[19%]' id='border'>
        <Navbar show={show} setShow={setShow} />
      </div>
      <div className={`relative top-0 w-[81%] ${show?"":"min-h-screen"} min-[700px]:max-[1024px]:w-[70%] min-[100px]:max-[700px]:w-full bg-gray-50`}>

          <Searchbar props={[show, setShow, handleClick]} txt={"View Event"} />

        <div className='bg-gray-50 w-full p-6'>
            <div className="bg-white max-[768px]:p-3 p-6 rounded-xl mb-16 font-serif">
                <div className='mt-5 text-sm text-gray-950 font'>
                    <form>
                        {/* ---- Enter Event Name --- */}
                        <div>
                            <label htmlFor='name' className='block font-bold'>EVENT NAME</label>
                            <input type='text' id='name' value={eventById.name} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2 font-bold' style={{color:"black"}} readOnly/>
                        </div>
                        {/* ---- Enter date, time, duration ----- */}
                        <div className='grid max-[820px]:grid-cols-1 grid-cols-3 gap-5 mt-7'>
                            <div className='relative'>
                                <label htmlFor='date' className='block font-bold'>DATE</label>
                                <input type='text' id='date' className='border-[1px] border-gray-300 w-full outline-none font-bold py-2 px-3 rounded-lg mt-2' value={eventById.date} readOnly/>
                                <img src="/Images/date.svg" alt="date" className='absolute  top-9 right-3 w-4 h-4' />
                            </div>
                            <div className='relative'>
                                <label htmlFor='time' className='block font-bold'>START TIME</label>
                                <input type='text' id='time' className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 font-bold rounded-lg mt-2'  value={eventById.stime} readOnly/>
                                <img src="/Images/clock.svg" alt="date" className='absolute  top-9 right-3 w-4 h-4' />
                            </div>
                            <div className='relative'>
                                <label htmlFor='duration' className='block font-bold'>END TIME</label>
                                <input type='text' id='duration' className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg font-bold mt-2'  value={eventById.etime} readOnly/>
                                <img src="/Images/clock.svg" alt="date" className='absolute  top-9 right-3 w-4 h-4' />
                            </div>
                        </div>
                        {/* --- select company --- */}
                        <div className='mt-7'>
                            <label htmlFor='company' className='block font-bold'>COMPANY NAME</label>
                            <input type='text' id='company' value="Reach Link" className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2 font-bold' readOnly/>
                        </div>
                        {/* --- add location --- */}
                        <div className='mt-7 relative'>
                            <label htmlFor='location' className='block font-bold'>ADD LOCATION</label>
                            <input type='text' id='location' value={eventById.location} className='border-[1px] font-bold border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2'  readOnly/>
                        </div>
                        {/* ------ list of influencers ----- */}
                        <div className='rounded-lg border-[1px] border-gray-300 p-4 mt-7'>
                            <div>
                                <div className='flex items-center nav gap-8 bg-gray-50 rounded-xl py-3 font-bold'>
                                    <div className='w-8 text-center'>#</div>
                                    <div className='w-64'>Name</div>
                                    <div className='w-64'>Email</div>
                                    <div className='w-64'>Check In</div>
                                </div>
                                <div className='borders'>
                                    {eventById?.influencers?.map((item,index)=>
                                        <div className='flex mr-2 nav gap-8 py-5 border-b-[1px] max-[820px]:text-xs border-gray-100' key={item._id}>
                                            <div className='w-8 text-center font-bold'>{index + 1}</div>
                                            <div className='w-64 font-bold'>{item.name}</div>
                                            <div className='w-64 font-bold'>{item.email}</div>
                                            <div className='w-64 '>
                                                {item.status!=="pending"?<div className='flex items-center gap-1'>
                                                    <img src="/Images/yes.svg" alt="checkedIn" />
                                                    <p className='text-green-400 font-bold'>Yes</p>
                                                    </div>:<div className='flex items-center gap-2'>
                                                    <img src="/Images/no.svg" alt="checkIn" width='20px' height='20px' />
                                                    <p className='font-bold'>No</p>
                                                </div>}
                                            </div>
                                        </div>
                                    )}
                                    {eventById?.influencers?.length<1?<div className='text-center py-4 text-red-400 font-semibold'>No Influencers Added...</div>:''}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
         {/* ---- mobile view navbar ---- */}
        <div className='max-[425px]:block hidden'>
          <Navbar props={[show, setShow]} />
        </div>
      </div>
    </div>
  )
}

export default ViewEvent;
