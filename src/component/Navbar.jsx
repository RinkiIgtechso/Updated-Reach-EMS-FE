import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/AuthReducer/action';
import {showCreateEvent} from "../Redux/AppReducer/action";
import {  Link, NavLink, useNavigate } from 'react-router-dom';
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import './style.css';

let link = [
    {
        id:1,
        link:'dashboard',
        name:'Dashboard',
        src:'/Images/dashboard.svg',
        aSrc:"/Images/BDashboard.svg"
    },
    {
        id:2,
        link:'event',
        name:'Events',
        src:'/Images/events_1.svg',
        aSrc:"/Images/BEvent.svg"
    },
    {
        id:3,
        link:"companies",
        name:"Companies",
        src:"/Images/Suitcase.svg",
        aSrc:"/Images/BSuitcase.svg"
    },
    {
        id:4,
        link:'checkIn',
        name:'Check In',
        src:'/Images/checkIn.svg',
        aSrc:"/Images/BCheckIn.svg"
    },
    {
        id:5,
        link:'influencers',
        name:'Influencers',
        src:'/Images/user.svg',
        aSrc:"/Images/BInfluencer.svg"
    }
];

function Navbar({show, setShow}) {
    const [rols, setRols] = useState("");
    const [open, setOpen] = useState(false);
    const [admin, setAdmin] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let role = localStorage.getItem("ReachEMS-Role");

    const handleShow = ()=>{
        setOpen((prev)=>!prev)
    }
  
    const handleLogout = ()=>{
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("auth_reachEMS");
        localStorage.removeItem("reachEMS_admin");
        localStorage.removeItem("reachEMS_influencer");
        logout(dispatch);
        navigate(`/${role}`, { replace: true });
    }
 
    const handleClick = ()=>{
        dispatch(showCreateEvent(false));
        setShow(false);
    }

    useEffect(()=>{
        let role = localStorage.getItem("role");
        setRols(role);
        let val = JSON.parse(localStorage.getItem("reachEMS_admin"));
        setAdmin(val);
    },[])


  return (
    <div className='h-full'>
        <div className='max-[540px]:hidden block h-full'>
            <div className='p-6 min-[420px]:max-[769px]:p-3 h-full'>
                <div className='flex flex-col justify-between h-full'>
                    <div>
                        <div>
                            <Link to="/dashboard"><img src="/Images/logo.svg" className='w-[140px] h-[40px] min-[420px]:max-[769px]:w-[100px] min-[420px]:max-[769px]:h-[30px] min-[420px]:max-[769px]:m-3' alt='logo'/></Link>
                        </div>
                        {/* ---- nav link ---- */}
                        <div className='mt-5 min-[420px]:max-[769px]:mt-16'>
                            {link.map((item, index)=>
                                <NavLink key={item.id} to={`/${item.link}`}
                                    className={`py-[10px] pl-[20px] font-bold mb-3 ${item.link==="companies" && rols==="company"?"hidden":"block"}`} activeclassname="active">
                                    {({isActive, isPending})=>
                                        <div className='flex gap-4' onClick={handleClick}>
                                            <img src={isActive?item.aSrc:item.src} alt={item.para} width='20px' height='20px' />
                                            <p>{item.name}</p>
                                        </div> 
                                    }                               
                                </NavLink>
                            )}
                        </div>
                    </div>
                    {/* ---- admin profile ---- */}
                    <div> 
                        <div className='grid align-middle items-center grid-cols-3 gap-2'>
                            <div>
                                {/* <div className='bg-blue-700 min-[420px]:max-[769px]:p-4 px-4 py-6 rounded-lg'></div> */}
                                <img src="/Images/user_dummy1.png" alt="user" width='68px' height='68px' className="rounded-full" />
                            </div>
                            <div className='flex flex-col justify-center min-[420px]:max-[769px]:gap-0 gap-1 col-span-2'>
                                <div className='text-sm text-gray-950 font-bold flex justify-between'>
                                    <p>{admin?.name}</p>
                                    <div className='pr-3 relative cursor-pointer'>
                                        <div onClick={handleShow}>
                                            <div className='min-[700px]:max-[1024px]:hidden'>
                                                <BsThreeDots/>
                                            </div>
                                            <div className='min-[700px]:max-[1024px]:block hidden'>
                                                <BsThreeDotsVertical/>
                                            </div>
                                        </div>
                                        {open?<div className='absolute -top-10 right-0 bg-white py-2 px-6 shadow-md rounded-lg hover:bg-blue-300 hover:text-blue-700 font-semibold cursor-pointer'
                                        onClick={handleLogout}>
                                            Logout
                                        </div>:''}
                                    </div>
                                </div>
                                <div className='text-[0.7vw] overflow-x-scroll no-scrollbar'>{admin?.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  */}
        {/* ------ mobile view ------ */}
        <div className='max-[540px]:block hidden fixed bottom-0 left-0 right-0'>
            <div className='px-5 flex justify-between items-center bg-white'>
                {link.map((item)=>
                    <NavLink key={item.id} to={`/${item.link}`} className={`block ${item.link==="companies" && rols==="company"?"hidden":"block"}`}  activeclassname="active">
                        {({isActive, isPending})=>
                            <div className={`p-4 ${isActive?"bg-blue-200":''}`}><img src={isActive?item.aSrc:item.src} alt={item.para} width='20px' height='20px' /></div>
                        }                           
                    </NavLink>
                )}
            </div>
        </div>
    </div>
  )
}

export default Navbar;