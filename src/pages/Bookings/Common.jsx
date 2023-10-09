import React from 'react';
import QRCode from 'react-qr-code';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import "../page.css";

function Common({data, text}) {

  const changeDate =(x)=>{
    let date = new Date(x).getDate();
    let month = new Date(x).getMonth() + 1;
    let year = new Date(x).getFullYear();
    let fullDate = date+"/"+month+"/"+year;
    return fullDate;
  }

  return (
    <div className='py-5 font-serif'>
      <div className='stepper'>
        <Stepper orientation="vertical">
          {data && data?.map((item, index) => (
            <Step key={item._id} active={true} expanded={true}>
              <StepLabel>
                <p className='font-bold text-gray-400'>{changeDate(item.details.date)}</p>
              </StepLabel>
              <StepContent>
                <div className='bg-white rounded-xl p-5 w-[48%] event-booking'>
                  <p className='text-gray-500 font-bold text-xs'>#{item._id}</p>
                  <h3 className='font-bold mt-2'>{item.details.name}</h3>
                  <p className='text-gray-500 font-bold text-xs mt-2'>{item.details.location}</p>
                  <div className='grid grid-cols-3 items-center mt-5'>
                    <div>
                      <div className='flex gap-1 text-xs max-[425px]:text-[0.65rem]'>
                        <p>{new Date(item.details.date).toLocaleDateString([], {weekday: 'short'})}</p>
                        <img src='/Images/clock.svg' alt='clock' width='15px' height='15px' />
                        <p>{item.details.stime}</p>
                      </div>
                      <div className='font-bold text-gray-600'>{changeDate(item.details.date)}</div>
                    </div>
                    <div className='flex justify-center'>
                      <img src='/Images/right.svg' alt='rightArrow' />
                    </div>
                    <div>
                      <div className='flex gap-1 text-xs justify-end max-[425px]:text-[0.65rem]'>
                        <p>{new Date(item.details.date).toLocaleDateString([], {weekday: 'short'})}</p>
                        <img src='/Images/clock.svg' alt='clock' width='15px' height='15px' />
                        <p>{item.details.etime}</p>
                      </div>
                      <div className='font-bold text-gray-600 text-right'>{changeDate(item.details.date)}</div>
                    </div>
                  </div>
                  <div className='flex justify-center py-5 mt-4'>
                    <QRCode
                      title={item.details.name}
                      value={item.qrcode}
                      bgColor={'white'}
                      fgColor={'black'}
                      size={156}
                    />
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
      {data.length<1?<div className='text-center mt-5 text-sm text-gray-500 h-[63.5vh] font-semibold'>No {text} events</div>:""}
    </div>
  )
}

export default Common;
