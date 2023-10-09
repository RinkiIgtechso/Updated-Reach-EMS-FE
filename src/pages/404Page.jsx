import React from 'react';
import {FaRegHandPointLeft} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./page.css";
import { useEffect } from 'react';

function PageNotFound() {
    const navigate = useNavigate();
    let auth = localStorage.getItem('auth_reachEMS');
    let token = localStorage.getItem("user");
    let role = localStorage.getItem("role");

    useEffect(()=>{
        if(auth!== null || auth=="true" && role!==null){
            console.log("logged In already")
            navigate("/dashboard");
        }
    },[])

  return (
    <div className='err_page'>
        <div className='flex items-center gap-1'>
            <span><FaRegHandPointLeft style={{fontSize:'20px',color:'blue'}} /></span>
            {/* <a href="/" className='underline text-blue-500 text-sm'>Home page</a> */}
        </div>
        <div>
            <div className='text-primary-200 text-6xl max-[820px]:mt-10 max-[820px]:text-4xl font-extrabold text-center'>
                <span>Error!</span>
            </div>
            <p className='text-xl text-center mt-2'>Oops! The page you are looking for could not be found</p>
        </div>
        <div className='mt-2 max-[820px]:mt-14'>
            <img src="/Images/err_404_1.jpg" className='w-2/5 m-auto max-[820px]:w-full' alt="404_error" />
        </div>
    </div>
  )
}

export default PageNotFound;
