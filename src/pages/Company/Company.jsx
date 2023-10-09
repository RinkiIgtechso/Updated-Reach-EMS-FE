import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showCreateEvent } from '../../Redux/AppReducer/action';
import Navbar from '../../component/Navbar';
import Searchbar from '../../component/Searchbar';
import CompanyList from './CompanyList';
import CreateCompany from './CreateCompany';
import { useEffect } from 'react';

function Company() {
  const { create } = useSelector((state)=>state.AppReducer);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClick = ()=>{
    setShow((prev)=>!prev);
    dispatch(showCreateEvent(true))
  }
 
  useEffect(()=>{
    document.addEventListener('click',()=>{
      let div1 = document.getElementsByClassName('inside');
      if(div1){
        for(let i=0; i<div1.length; i++){
          div1[i].classList.replace("inside", "hide");
        }
      }
    }) 
  },[show])
  
  return (
    <div className='flex'>
      <div className='min-[700px]:max-[1024px]:w-[30%] min-[100px]:max-[700px]:hidden w-[19%] h-auto' id='border'>
        <Navbar show={show} setShow={setShow} />
      </div>
      <div className={`relative top-0 w-[81%] min-h-screen min-[700px]:max-[1024px]:w-[70%] min-[100px]:max-[700px]:w-full bg-gray-50`}>
          <Searchbar props={[show, setShow, handleClick]} txt={show?"Create Company":"Companies"} />

        <div className='bg-gray-50 w-full p-6'>
            { create ? <CreateCompany setShow={setShow} /> : <CompanyList/> }
        </div>
         {/* ---- mobile view navbar ---- */}
        <div className='max-[585px]:block hidden fixed bottom-0 w-full'>
          <Navbar show={show} setShow={setShow} />
        </div>
      </div>
    </div>
  )
}

export default Company
