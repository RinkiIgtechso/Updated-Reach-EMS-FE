import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEvents,getAllInfluencers, showCreateEvent } from '../../Redux/AppReducer/action';
import Navbar from '../../component/Navbar';
import Searchbar from '../../component/Searchbar';
import InviteList from './InviteList';
import EmptyState from '../../component/EmptyState';
import AddInfluencer from './AddInfluencer';

function Invitation() {
  const [show, setShow] = useState(false);
  const value = useSelector((state)=>state.AppReducer);
  const dispatch = useDispatch();
  

  const handleClick = ()=>{
    setShow(true);
    dispatch(showCreateEvent(true));
  }

  useEffect(()=>{
    getAllEvents(dispatch);
    getAllInfluencers(dispatch);
  },[value.create])


  return (
    <div className='flex'>
      <div className='min-[700px]:max-[1024px]:w-[30%] min-[100px]:max-[700px]:hidden w-[19%]' id='border'>
      <Navbar show={show} setShow={setShow} />
      </div> 
      <div className={`relative top-0 w-[81%] ${show?"":"min-h-screen"} min-[700px]:max-[1024px]:w-[70%] min-[100px]:max-[700px]:w-full bg-gray-50`}>
        <Searchbar props={[show, setShow, handleClick]} txt={value.create?"Create Influencer":"Influencers"} />
        <div className='bg-gray-50 w-full p-6'>
          {value.create?<AddInfluencer />:value.influencer.length<1?
            <EmptyState handleClick={handleClick} img={"/Images/influencer.svg"} value={["influencer","Influencer"]} />
          :
            <InviteList influencer={value.influencer} />
          }
        </div>
         {/* ---- mobile view navbar ---- */}
        <div className='max-[540px]:block hidden fixed bottom-0 w-full'>
        <Navbar show={show} setShow={setShow} />
        </div>
      </div>
    </div>
  )
}

export default Invitation;