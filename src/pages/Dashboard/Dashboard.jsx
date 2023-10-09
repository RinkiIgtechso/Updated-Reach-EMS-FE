import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { showCreateEvent } from '../../Redux/AppReducer/action';
import Navbar from '../../component/Navbar';
import Searchbar from '../../component/Searchbar';
import CheckInGraph from './CheckInGraph';
import AdminDashboard from './AdminDashboard';
import '../page.css';

function Dashboard() {
  // const {influencer} = useSelector((state)=>state.AppReducer);
  const [show, setShow] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  


  const handleClick = ()=>{
    dispatch(showCreateEvent(true));
    navigate("/event")
  }

  useEffect(()=>{ 
    let rols = localStorage.getItem('role');
    setRole(rols);
  },[show, role]);

  return (
    <div className='flex font-serif'>
      <div className='min-[700px]:max-[1024px]:w-[30%] min-[100px]:max-[700px]:hidden w-[19%] h-auto ' id='border'>
        <Navbar show={show} setShow={setShow} />
      </div>
      <div className={`relative top-0 w-[81%] min-[700px]:max-[1024px]:w-[70%] min-[100px]:max-[700px]:w-full min-h-screen bg-gray-50`}>
        <Searchbar props={[show, setShow, handleClick]} txt={"Dashboard"} />
        {role==='company'?<CheckInGraph />:<AdminDashboard />}
        
        {/* ---- mobile view navbar ---- */}
        <div className='max-[540px]:block hidden'>
        <Navbar show={show} setShow={setShow} />
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard;
