import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { updateStatus, deleteEvent } from '../../Redux/AppReducer/action';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function All({data, click}) {
    const {text} = useSelector((state)=>state.AppReducer)
    const [edit, setEdit] = useState(0);
    const [show, setShow] = useState(false);
    const [role, setRole] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showEditBox = (x, e)=>{
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
        },1400)
        setEdit(0);
        click(2)
    }

    const handleArchived = (id)=>{
        let data = {
            "status":"archived"
        }
        setTimeout(()=>{
            setOpen(true);
        },1400)
        dispatch(updateStatus(id, data));
        setEdit(0);
        click(4)
    }

    const handleDelete = (id)=>{
        dispatch(deleteEvent(id));
        setTimeout(()=>{
            setOpen(true);
        },1400)
        setEdit(0);
    }

    const handleClick = (id)=>{
        if(role==='company'){
            navigate(`/viewEvent/${id}`)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    useEffect(()=>{
        let rols = localStorage.getItem("role");
        setRole(rols);
    },[])

  return (
    <div>
        <div className='absolute'>
            <Snackbar open={open} anchorOrigin={{ vertical:'top', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {text}!
                </Alert>
            </Snackbar>
        </div> 
        <div className='py-6 border-1 border-gray-100'>
            <div className='grid max-[540px]:grid-cols-1 max-[1024px]:grid-cols-2 grid-cols-3 max-[820px]:gap-3 gap-5'>
            {data?.map((item,index)=>
                <div className='bg-white rounded-xl p-5 relative mb-3' key={index}>
                    <div className='flex justify-between font-serif'>
                        <div onClick={()=>handleClick(item._id)} className={`${role==='company'?"cursor-pointer":""}`}>
                            <p className='text-sm'>Event ID: #{index + 1}</p>
                            <p className='capitalize text-gray-950 text-base mt-1 font-extrabold'>{item.name}</p>
                            <p className='font-extrabold text-sm mt-2 text-gray-400'>{item.company.name}</p>
                        </div>
                        {role==="admin"?<button className='cursor-pointer h-[24px]' onClick={(e)=>showEditBox(item._id,e)}>
                            <img src='/Images/edit.svg' alt='edit' />
                        </button>:""}
                    </div>
                    <div className='text-primary-200 font-extrabold text-sm max-[820px]:text-xs mt-[4rem]'>
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

export default All
