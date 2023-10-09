import React from 'react';

function EmptyState({handleClick,img,value}){
    return (
      <div className='w-[320px] max-[425px]:w-[295px] max-[425px]:mb-[135px] mx-auto bg-white rounded-xl py-8 px-16 mt-24 align-middle'>
        <img className='mt-6 mb-5 mx-auto' src={img} width='197px' height='116px' alt="calendar" />
        <p className='text-sm font-extrabold text-center mt-7'>No {value[0]} showing up</p>
        <div className='bg-primary-200 text-white font-bold text-center w-[180px]  mt-14 m-auto px-5 py-2 rounded-xl cursor-pointer' onClick={handleClick}>
          Create {value[1]}
        </div>
      </div>
    )
  }

export default EmptyState;
