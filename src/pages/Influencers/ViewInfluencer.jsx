import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllEvents, getInfluencerById } from '../../Redux/AppReducer/action';
import Navbar from '../../component/Navbar';
import Searchbar from '../../component/Searchbar';
import SentInvite from './SentInvite';

function ViewInfluencer() {
    const [show, setShow] = useState(false);
    const {influencerId} = useSelector((state)=>state.AppReducer);
    const dispatch = useDispatch();
    const params = useParams();

    const handleClick = ()=>{
      // console.log('Handle Click')
    }

    useEffect(()=>{
      getAllEvents(dispatch);
      dispatch(getInfluencerById(params.id));
    },[])

  return (
    <div className='flex'>
      <div className='min-[700px]:max-[1024px]:w-[30%] min-[100px]:max-[700px]:hidden w-[19%]' id='border'>
        <Navbar show={show} setShow={setShow} />
      </div>
      <div className={`relative top-0 w-[81%] ${show?"":"min-h-screen"} min-[700px]:max-[1024px]:w-[70%] min-[100px]:max-[700px]:w-full bg-gray-50`}>

            <Searchbar props={[show, setShow, handleClick]} txt={"Influencer"}/>

        <div className='bg-gray-50 w-full p-6'>
            <SentInvite influencer={influencerId} events={influencerId.events} infId={params.id} />
        </div>
         {/* ---- mobile view navbar ---- */}
        <div className='max-[425px]:block hidden fixed bottom-0 w-full'>
            <Navbar props={[show, setShow]} />
        </div>
      </div>
    </div>
  )
}

export default ViewInfluencer
