import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEvents, updateStatus, deleteEvent } from '../../Redux/AppReducer/action';
import { Box, Modal } from '@mui/material';


const style = {
    position: 'absolute',
    top: '15%',
    right: '0%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: '#0071BD',
    color:'white',
    boxShadow: 24,
    p: 2,
  };

function Active({role,click, activeData}) {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(0);
    const [show, setShow] = useState(false);
    const { text} = useSelector((state)=>state.AppReducer);
    const dispatch = useDispatch();

    const showEditBox = (x,e)=>{
        e.stopPropagation();
        if(show){
            setShow(false);
            setEdit(0);
        }else{
            setEdit(x);
            setShow(true);
        }
    }

    const handleActive = (id)=>{
        let data = {
            "status":"active"
        }
        dispatch(updateStatus(id, data));
        setTimeout(()=>{
            setOpen(true);
        },1500)
        setEdit(0);
        click(2);
    }

    const handleArchived = (id)=>{
        let data = {
            "status":"archived"
        }
        dispatch(updateStatus(id, data));
        setTimeout(()=>{
            setOpen(true);
        },1500)
        setEdit(0);
        click(4);
    }

    const handleDelete = (id)=>{
        dispatch(deleteEvent(id));
        setTimeout(()=>{
            setOpen(true);
        },1500)
        setEdit(0);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    

  return (
    <div>
        <div>
            {/* message box */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {text} !
                </Box>
            </Modal>
        </div>
        <div className='py-6 border-1 border-gray-100'>
            <div className='grid max-[425px]:grid-cols-1 max-[1024px]:grid-cols-2 grid-cols-3 lg:grid-cols-3 max-[820px]:gap-3 gap-5'>
                {activeData?.map((item,index)=>
                    <div className='bg-white rounded-xl p-5 relative mb-3' key={index}>
                        <div className='flex justify-between'>
                            <div>
                                <p className='text-sm max-[820px]:text-xs'>Event ID:#{index + 1}</p>
                                <p className='capitalize text-gray-950 text-base mt-1 font-extrabold'>{item.name}</p>
                                <p className='font-extrabold text-sm mt-2 text-gray-400'>{item.company.name}</p>
                            </div>
                           {role==="admin"? <button className='cursor-pointer h-[24px]' onClick={(e)=>showEditBox(item._id,e)}>
                            <img src='/Images/edit.svg' alt='edit' />
                        </button>:""}
                        </div>
                        <div className='text-primary-200 font-extrabold text-sm mt-[4rem] max-[820px]:text-xs'>
                            <span>{item.date}</span>&nbsp; | &nbsp; <span>{item.stime}</span> - <span>{item.etime}</span>
                        </div>
                        <div className={`${edit===item._id?"block":"hidden"} absolute bg-white rounded-xl shadow-xl bottom-2 right-4 font-extrabold inside`}>
                            <div className='py-3 pl-8 pr-[5rem] cursor-pointer hover:bg-blue-200 hover:text-blue-500 rounded-t-xl' onClick={()=>handleActive(item._id)}>Activate</div>
                            <div className='py-3 pl-8 pr-[5rem] cursor-pointer hover:bg-blue-200 hover:text-blue-500' onClick={()=>handleArchived(item._id)}>Archived</div>
                            <div className='py-3 pl-8 pr-[5rem] cursor-pointer hover:bg-blue-200 hover:text-blue-500 rounded-b-xl' onClick={()=>handleDelete(item._id)}>Delete</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Active;
