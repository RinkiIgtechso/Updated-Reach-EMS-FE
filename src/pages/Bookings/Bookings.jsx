import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { getInfluencerById } from "../../Redux/AppReducer/action";
import { logout } from '../../Redux/AuthReducer/action';
import { useDispatch, useSelector } from 'react-redux';
import EventList from './EventList';
import Searchbar from '../../component/Searchbar';
import Upcoming from './Upcoming';
import Archived from './Archived';
import '../page.css';

function Bookings() {
    const {influencerId} = useSelector((state)=>state.AppReducer);
    const [all, setAll] = useState(true);
    const [upcoming, setUpcoming] = useState(false);
    const [archived, setArchived] = useState(false);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeState = (x)=>{
        if(x===1){
            setAll(true);
            setUpcoming(false);
            setArchived(false);
        }else if(x===2){
            setAll(false);
            setUpcoming(true);
            setArchived(false);
        }else{
            setAll(false);
            setUpcoming(false);
            setArchived(true);
        }
    }

    const handleLogout = ()=>{
        logout(dispatch);
        let role = localStorage.getItem("ReachEMS-Role");
        navigate(`/${role}`);
    }

    useEffect(()=>{
        let val = localStorage.getItem("reachEMS_influencer");
        dispatch(getInfluencerById(val));
    },[])    

  return (
   <div>
        {/* only for mobile view */}
        <div className='bg-gray-50 hidden max-[485px]:block'>
            <Searchbar txt={"bookings"} />
        </div>

        <div className='flex bookings'>
            {/* ------- navbar ------- */}
            <div className='min-h-screen w-[19%] bg-white'>
                <div className='min-h-screen w-[19%] max-[1024px]:w-[32%] flex flex-col fixed justify-between p-4'>
                    <div className='pt-3'>
                        <div><img src="/Images/logo.svg" alt="logoImage" width='130px' height='90px' /></div>
                        <div className="mt-10">
                            <NavLink to='/myBookings' className={({ isActive }) => (isActive ? 'actives' : 'inactive')}>
                                <div className='w-full pl-3 py-2 rounded-2xl flex gap-5'>
                                    <img src="/Images/blueCalender.svg" alt="bookingsImage" />
                                    <p className='font-bold'>My Bookings</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>  
                    <div>
                        <div className='grid align-middle items-center grid-cols-3 gap-2'>
                            <div>
                                <img src="/Images/user_dummy1.png" alt="user" width='68px' height='68px' className="rounded-full" />
                            </div>
                            <div className='flex flex-col justify-center min-[420px]:max-[769px]:gap-0 gap-1 col-span-2'>
                                <div className='text-sm text-gray-950 font-bold flex justify-between'>
                                    <p>{influencerId?.username}</p>
                                    <div className='pr-3 relative cursor-pointer'>
                                        <div onClick={()=>setShow((prev)=>!prev)}>
                                            <div className='min-[700px]:max-[1024px]:hidden'>
                                                <BsThreeDots/>
                                            </div>
                                            <div className='min-[700px]:max-[1024px]:block hidden'>
                                                <BsThreeDotsVertical/>
                                            </div>
                                        </div>
                                        <div className={`absolute -top-12 right-0 py-3 px-5 rounded-lg shadow-md bg-white font-bold hover:bg-blue-200 hover:text-blue-700 ${show?"block":"hidden"}`} onClick={handleLogout}>
                                            Logout
                                        </div>
                                    </div>
                                </div>
                                <div className='text-[0.7vw] overflow-x-scroll no-scrollbar'>{influencerId?.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ----- end navbar ----- */}

            <div className='w-[81%] bg-gray-50 p-14 bSpac'>
                <div className='text-2xl pt-2 font-extrabold flex items-center gap-3'>
                    <h1>Hello {influencerId?.username}</h1>
                    <img src='/Images/hand.svg' alt='emoji' width='35px' height='35px' />
                </div>
                <div className='mt-8'>
                    <div className='flex gap-8 border-b-[1px] border-gray-300 text-[0.8rem] font-bold text-gray-500 nav'>
                        <div className={`${all?'border-b-2 border-blue-500 text-blue-500':''}`} onClick={()=>changeState(1)}><a href="#all" className='px-3 pb-1'>All </a></div>
                        <div className={`${upcoming?'border-b-2 border-blue-500 text-blue-500':''}`} onClick={()=>changeState(2)}><a href="#upcoming" className='px-3 pb-1'>Upcoming</a></div>
                        <div className={`${archived?'border-b-2 border-blue-500 text-blue-500':''}`} onClick={()=>changeState(3)}><a href="#archived" className='px-3 pb-1'>Archived</a></div>
                    </div>
                    <div className={`${all?'block':"hidden"}`}>
                        <EventList  />
                    </div>
                    <div className={`${upcoming?'block':"hidden"}`}>
                        <Upcoming />
                    </div>
                    <div className={`${archived?'block':"hidden"}`}>
                        <Archived  />
                    </div>
                </div>
            </div>
        </div>
   </div>
  )
}

export default Bookings;