import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/AuthReducer/action';
import { useNavigate } from 'react-router-dom';
import {CiSearch} from 'react-icons/ci';
import { IoAdd } from "react-icons/io5";

function Searchbar({props, txt}) {
  const [hide, setHide] = useState(false);
  const val = localStorage.getItem('role');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let role = localStorage.getItem("ReachEMS-Role");

  const handleLogout = ()=>{
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("auth_reachEMS");
    localStorage.removeItem("reachEMS_admin");
    localStorage.removeItem("reachEMS_influencer");
    logout(dispatch);
    navigate(`/${role}`);
  }

  const handleShow = () =>{
    setHide(prev=>!prev)
  }

  const handleClick = ()=>{
    // console.log('Clicked event');
  }

  return (
    <div>
      <div className='hidden max-[540px]:block'>
        <div className='flex justify-between items-center p-7'>
          <img src="/Images/mLogo.svg" alt="logoImage" width='47px' height='47px' />
          <div className='rounded-full text-white font-semibold text-sm p-1 bg-primary-400 relative' >
            <img src='/Images/user_dummy1.png' alt='adminImage' width='65px' height='65px' className='rounded-full' onClick={handleShow}/>
            <div className={`${hide?'block':'hidden'} absolute left-3 top-12 p-3 bg-white shadow-md rounded-sm font-bold text-base hover:bg-blue-100 hover:text-blue-600 text-gray-950`} onClick={handleLogout}>Logout</div>
          </div>
        </div>
      </div>
      {txt==='bookings'?"":
      <div className='py-2 min-[540px]:max-[768px]:px-1 px-8 spac bg-white flex justify-between items-center gap-12 max-[540px]:h-[100px] h-[58px]'>
        <div className='flex items-center font-extrabold '>
          <div className='w-28 text-[0.8rem]'>{txt}</div>
        </div>
        <div className={`w-full flex justify-between items-center max-[540px]:hidden ${val==='admin'?'block':val==='company'?'hidden':'hidden'}`}>        
          <div className='flex items-center gap-1 w-[40%] border-[1px] border-[#E8E8EA] py-2 pl-3 max-[820px]:text-xs rounded-2xl'>
            <div><CiSearch style={{color:'gray'}} /></div>
            <div>
                <input id='search' className='outline-none w-full' type='text' placeholder='Global Search. . .' />
            </div>
            </div>
            <div className={`${txt.includes('Create') || txt==='Influencer' ?'hidden' :'block'}`}>
              <button className='bg-primary-400 text-white flex py-1 min-[425px]:py-3 px-1 min-[425px]:px-8 min-[425px]:gap-3 items-center rounded-2xl' onClick={props?props[2]:handleClick}>
                <span><IoAdd style={{fontSize:'24px',fontWeight:'bold'}}/></span><span className='text-sm font-bold '>Add new</span>
              </button>
          </div>
        </div>
        <div className='max-[540px]:block hidden'>
          <button className={`bg-primary-400 text-white px-2 py-3 flex gap-1 rounded-xl ${val==='admin'?'block':val==='company'?'hidden':'hidden'}`} onClick={props?props[2]:handleClick}>
            <span><IoAdd style={{fontSize:'24px',fontWeight:'bold'}}/></span>
            <span>Add new</span>
          </button>
        </div>
      </div>}
    </div>
  )
}

export default Searchbar;
