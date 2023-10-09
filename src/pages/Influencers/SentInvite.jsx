import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { removeInfluencer, assignEvent, resendEmail, getAllEvents, editInfluencer } from '../../Redux/AppReducer/action';
import {BsThreeDots} from 'react-icons/bs';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MenuItem, Select } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import moment from 'moment/moment';
import MuiAlert from '@mui/material/Alert';
import '../page.css';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:'20px',
  p: 4,
};

function SentInvite({influencer, events}) {
    const dispatch = useDispatch();
    const {text, data, error} = useSelector((state)=>state.AppReducer);
    const [assignEvents, setAssignEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [edit, setEdit] = useState(0);
    const [id, setId] = useState();
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(false);
    const [password, setPassword] = useState("");
    const [gPassword, setGPassword] = useState("Generate password");
    const navigate = useNavigate();
    const currentTime = moment();

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

    const handleResend = (id1, id2)=>{
      let data = {
        user_id:id1,
        event_id:id2,
      }
      dispatch(resendEmail(data));
      setOpen1(true)
      setEdit(0);
    }

    const handleAssign = ()=>{
      let data = {
        event_id:id
      }
      dispatch(assignEvent(influencer._id, data));
      setOpen1(true);
      setOpen(false);
    }

    const handleCopy = ()=>{
      navigator.clipboard.writeText(gPassword);
      setOpen2(true);
    }

    const handleCheckIn = ()=>{
      navigate('/checkIn')
    }

    // ------- password generator on onclick
    const handleGenPassword = ()=>{
      let pass = "";
      let str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
      for (let i = 1; i <= 19; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setGPassword(pass);
    }

    const handleOpen =(x)=>{
      if(x==='show'){
        getAllEvents(dispatch);
        let arr = data.filter((item)=>{
          let dateTime = item.date+" "+item.stime
          let anotherTime = moment(dateTime);
          if(currentTime.isBefore(anotherTime)){
            return item;
          }
        })
        setAssignEvents(arr);
        setOpen(true);
      }else{
        setHide(true);
      }
    }

    const handleClose = ()=>{
      setOpen(false);
      setOpen1(false);
      setHide(false);
      setOpen2(false);
    }

    const handleSave = (x)=>{
      let data = {password};
      dispatch(editInfluencer(data,x));
      setOpen1(true);
      setHide(false);
    }

    const handleDelete = (id1, id2)=>{
      let data = {
        event_id:id2
      }
      dispatch(removeInfluencer(id1,data));
      setEdit(0);
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
    },[])

  return (
    <div>
      <div className='absolute '>
        <Snackbar open={open1} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {text}!
            </Alert>
        </Snackbar>
        <Snackbar open={open2} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Copied Successfully!
            </Alert>
        </Snackbar>
      </div>
      <div className='p-7 bg-white rounded-xl border-[1px] border-gray-200 flex items-center gap-5'>
        <div className='bg-gray-300 rounded-[50%] w-16 h-16'>
          <img src="/Images/user_dummy2.png" alt="user" className="rounded-full" />
        </div>
        <div className='flex flex-col justify-center gap-2'>
          <div className='font-bold'>{influencer.name}</div>
          <div className='text-xs'>{influencer.email}</div>
        </div>
      </div>
      <div className='grid grid-cols-3 max-[1024px]:grid-cols-1 gap-8 mt-8'>
        <div className='bg-white pt-7 pb-16 pl-7 max-[820px]:pr-9 pr-12 rounded-xl border-[1px] border-gray-200 col-span-2 max-[820px]:col-span-1'>
          <div >
            <p className='font-bold'>Phone</p>
            <div className='flex items-center mt-3'>
            <input type='text' id='phone' value={influencer.phone} className='border-[1px] border-gray-100 w-[28rem] mr-5 py-2 pl-3 rounded-lg' readOnly/> 
            </div>
          </div>
          <div className='mt-7'>
            <p className='font-bold'>Email</p>
            <div className='flex items-center mt-3'>
            <input type='email' id='email' value={influencer.email} className='border-[1px] border-gray-100 w-[28rem] mr-5 py-2 pl-3 rounded-lg' readOnly/> 
            </div>
          </div>
          <div className='mt-7'>
            <p className='font-bold'>Address</p>
            <div className='flex items-center mt-3'>
            <input type='text' id='address' value={influencer.address} className='border-[1px] border-gray-100 w-[28rem] mr-5 py-2 pl-3 rounded-lg' readOnly/> 
            </div>
          </div>
        </div>
        <div className='bg-white p-7 rounded-xl border-[1px] border-gray-200 w-full'>
            <div className='flex justify-between items-center'>
              <div className='font-bold'>Influencer Access</div>
              {/* ---update password--- */}
              <Modal
                open={hide}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <p className='font-bold text-lg mb-5'>Change Password</p>
                  <input type="text" placeholder='Enter new password' className='border-[1px] border-gray-400 rounded-lg pl-3 py-2 w-full' value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
                  <button className='bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg mt-5' onClick={()=>handleSave(influencer._id)}>Save</button>
                </Box>
              </Modal>
              <div onClick={()=>handleOpen("hide")} className='cursor-pointer'><img src="/Images/editing.svg" alt="edit" /></div>
            </div>
            <div className='bg-gray-50 p-6 my-7 rounded-xl flex flex-col justify-center items-center gap-3'>
              <div><img src="/Images/lock.svg" alt="lock" />
              </div>
              <div className='font-bold text-xs'>No access to reach</div>
            </div>
            <div>
              <p className='font-bold txt-sm mb-3'>Generate Password</p>
              <div className='bg-gray-50 p-6 grid grid-cols-5 justify-between rounded-xl'>
                <p className='font-bold col-span-4 text-xs'>{gPassword}</p>
                <div className='cursor-pointer text-right' onClick={handleCopy}><img src="/Images/copy.svg" alt="copy" height='24px' width='24px' /></div>
              </div>
              <div className='bg-blue-700 text-white py-2 text-center font-bold rounded-lg mt-6 mb-5 cursor-pointer' onClick={handleGenPassword}>
                Generate Password
              </div>
            </div>
        </div>
      </div>
      <div className='p-7 bg-white rounded-xl border-[1px] border-gray-200 mt-7 mb-20'>
          <div className='flex justify-between items-center'>
            <p className='font-bold'>Assignments</p>
            <button className='bg-blue-700 cursor-pointer text-white py-2 px-4 flex items-center rounded-xl' onClick={()=>handleOpen("show")}><span className='text-xl'><IoAddOutline/></span><span className='text-xs'>NEW</span></button>
          </div>
          {/* ----- Modal Box for showing event list  ---- */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <p className='font-bold text-base mb-5'>Assign the events:</p>
              <Select 
                displayEmpty
                onChange={(e)=>setId(e.target.value)}
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{width:"100%",marginTop:"9px",padding:'0px 0px !important',borderColor:'lightgray',color:'gray',fontFamily:'Raleway, sans-serif'}}
              >
                {assignEvents.map((item, index)=>
                  <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                )}
              </Select>
              <button className='bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg mt-8' onClick={handleAssign}>Assign</button>
            </Box>
          </Modal>
          {/* ----- end here----- */}

          <div className='w-full mt-7 text-sm scroll'>
            <table className="table-auto w-full">
              <thead className='border-b-[1px] border-gray-300 max-[425px]:border-none' id="thead-row">
                <tr>
                  <th className='text-left pb-2'>Event #</th>
                  <th className='text-left pb-2'>Event Name</th>
                  <th className='text-left pb-2'>Date</th>
                  <th className='text-left pb-2'>Check In</th>
                  <th className='text-left pb-2'></th>
                </tr>
              </thead>
              <tbody id="tbody-tr">
                {events?.map((item,index)=>
                  <tr key={index}>
                    <td className='pt-4'>{item._id}</td>
                    <td className='pt-4'>{item.details?.name}</td>
                    <td className='pt-4'>{item.details?.date}</td>
                    <td className='pt-4'>
                      {item.status!=="pending"?<div className='flex items-center gap-1'>
                        <img src="/Images/yes.svg" alt="checkIn" />
                        <p className='text-green-400 font-bold'>Yes</p>
                        </div>:<div className='flex items-center gap-2'>
                        <img src="/Images/no.svg" alt="checkIn" width='20px' height='20px' />
                        <p className='font-bold'>No</p>
                      </div>}
                    </td>
                    <td className='flex justify-end items-center pt-3 relative cursor-pointer'>
                      <button className='bg-blue-300 rounded-xl text-blue-500 py-1 pl-2 w-8' onClick={(e)=>showEditBox(item._id, e)}><BsThreeDots/></button>
                      <div className={`${edit===item._id?"block":"hidden"} absolute bg-white rounded-xl shadow-xl bottom-2 right-4 font-extrabold z-20 w-36 inside`}>
                        <div className='py-3 pl-6 pr-[3rem] cursor-pointer hover:bg-blue-200 hover:text-blue-500 rounded-t-xl' onClick={handleCheckIn}>Check In</div>
                        <div className='py-3 pl-6 pr-[1rem] cursor-pointer hover:bg-blue-200 hover:text-blue-500' onClick={()=>handleResend(influencer._id, item._id)}>Resend Email</div>
                        {/* <div className='py-3 pl-6 pr-[4rem] cursor-pointer hover:bg-blue-200 hover:text-blue-500'>Reject</div> */}
                        <div className='py-3 pl-6 pr-[4rem] cursor-pointer hover:bg-blue-200 hover:text-blue-500 rounded-b-xl' onClick={()=>handleDelete(influencer._id, item.details._id)}>Delete</div>
                      </div>
                    </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  )
}

export default SentInvite;
