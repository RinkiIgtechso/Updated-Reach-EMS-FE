import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { getAllInfluencers, deleteInfluencer, editInfluencer } from '../../Redux/AppReducer/action';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
  p: 4
};

function InviteList({influencer}) {
  const dispatch = useDispatch();
  const {checkIn, data, text, error} = useSelector((state)=>state.AppReducer);
  const [infl, setInfl] = useState([]);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [id, setId] = useState([]);
  const [object, setObject] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const influencersCount = {};

  const onSubmit =(data)=>{ 
    dispatch(editInfluencer(data, id._id));
    setOpen1(false);
    setOpen(true)
  }

  const handleDelete = (id)=>{
    setOpen(true);
    dispatch(deleteInfluencer(id));
    setOpen1(false);
  }

  const handleOpen = (obj) => {
    reset({
      username:obj.username,
      phone:obj.phone,
      email: obj.email,
      address: obj.address
    });
    setOpen1(true);
    setId(obj);
  }

  const handleOpen1 = (obj) => {
    setOpen2(true);
    setObject(obj);
  }

  const handleClose = (x) => {
    if(x===1){
      setOpen(false);
    }else if(x===2){
      setOpen1(false);
    }else{
      setOpen2(false);
    }
  };

  const handleAdd = ()=>{
    data.forEach(event => {
      event.influencers.forEach(influencer => {
        if (!influencersCount[influencer._id]) {
          influencersCount[influencer._id] = {name:influencer.name, _id:influencer._id};
        }

        const status = influencer.status;
        if (!influencersCount[influencer._id][status]) {
          influencersCount[influencer._id][status] = 1;
        } else {
          influencersCount[influencer._id][status]++;
        }
      });
      
    });
    
    const resultArray = Object.keys(influencersCount).map(influencerId => (
         influencersCount[influencerId]
    ));
    setInfl(resultArray);
  }

  useEffect(()=>{
    getAllInfluencers(dispatch);
    handleAdd();
    let val = localStorage.getItem('role');
    if(val === "admin"){
      setShow(false);
    }else{
      setShow(true);
    }
  },[])


  // influencer code
  return (
    <div className='bg-white p-4 space mt-24 right mr-4 rounded-xl font-serif max-[425px]:mb-[137px]'>
      <div className='absolute '>
        <Snackbar open={open} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={()=>handleClose(1)}>
          <Alert onClose={()=>handleClose(1)} severity="info" sx={{ width: '100%' }}>
          {text}!
          </Alert>
        </Snackbar>
      </div>
      <div className={`${show?'hidden':'block'}`}>
        <div className='flex items-center nav gap-8 bg-gray-50 text-sm rounded-xl py-3 font-bold'>
            <div className='w-8 text-center'>#</div>
            <div className='w-64'>Name</div>
            <div className='w-64 text-center'>Checked In</div>
            <div className='w-64 text-center'>Action</div>
        </div>
        <div className='h-[17rem] mt-2 overflow-auto overflow-y-scroll text-xs borders '>
          {influencer?.map((item, index)=>
              <div className='flex mr-2 nav gap-8 py-4 border-b-[1px] border-gray-100' key={index}>
                <div className='w-8 text-center font-bold'> {index + 1}.</div>
                <div className='w-64 font-bold cursor-pointer'><Link to={`/influencer/${item._id}`}>{item.name}</Link></div>
                <div className='w-64 font-bold text-center'>
                {checkIn[index]} / {item.events.length} </div>
                <div className='w-64 flex justify-center gap-3 pl-4'>
                  <div className='cursor-pointer' onClick={()=>handleOpen(item)}><img src="/Images/editing.svg" alt="edits" /></div>
                  {/* --- Modal Box for edit influencers details --- */}
                  {item._id===id._id?
                  <Modal
                    open={open1}
                    onClose={()=>handleClose(2)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='mb-5'>
                        <label htmlFor='username' className='font-bold'>Username:</label><br/>
                        <input type='text' id='username' className='border-[1px] border-gray-400 pl-3 py-2 rounded-3xl outline-none w-full text-gray-950' {...register("username", { required: true })}  />
                      </div>
                      <div className='mb-5'>
                        <label htmlFor='phone' className='font-bold'>Phone:</label><br/>
                        <input type='text' id='phone' className='border-[1px] border-gray-400 pl-3 py-2 rounded-3xl outline-none w-full text-gray-950' {...register("phone", { required: true })}  />
                      </div>
                      <div className='mb-5'>
                        <label htmlFor='email' className='font-bold'>Email:</label><br/>
                        <input type='email' id='email' className='border-[1px] border-gray-400 pl-3 py-2 rounded-3xl outline-none w-full text-gray-950' {...register("email", { required: true,validate: {  maxLength: (v) =>  v.length <= 50 || "The email should have at most 50 characters",  matchPattern: (v) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address"},})} />
                      </div>
                      <div className='mb-5'>
                        <label htmlFor='address' className='font-bold'>Address:</label><br/>
                        <input type='text' id='address' className='border-[1px] border-gray-400 pl-3 py-2 rounded-3xl outline-none w-full text-gray-950' {...register("address", { required: true })}  />
                      </div>
                      <div className='m-auto flex justify-between gap-4'>
                        <button className='py-3 px-14 border-[1px] border-gray-700 rounded-full mt-3 cursor-pointer' onClick={()=>handleClose(2)}>Close</button>
                        <input className='bg-blue-700 text-white font-semibold text-center rounded-full py-3 px-14 mt-3 cursor-pointer' type='submit' value="Submit"/>
                      </div>
                    </form> 
                    </Box>
                  </Modal>:''}
                {/* ---- Modal Box Delete ---- */}
                  <div className='cursor-pointer'><img src="/Images/delete.svg" alt="delete"  onClick={()=>handleOpen1(item)} /></div>
                  {item._id===object._id?
                  <Modal 
                    open={open2}
                    onClose={()=>handleClose(3)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <p className='font-bold text-xl'>Are you sure? </p>
                      <div className='flex justify-between gap-6 w-full mt-7'>
                        <button className='py-3 px-14 border-[1px] border-gray-700 rounded-full mt-3' onClick={()=>handleClose(3)}>Cancel</button>
                        <button className='bg-blue-700 text-white font-semibold text-center rounded-full py-3 px-14 mt-3' onClick={()=>handleDelete(object._id)}>Delete</button>
                      </div>
                    </Box>
                  </Modal>:''}
                </div>
              </div>
          )}
        </div>
      </div>

      {/* -------- company influencer list------- */}
      <div className={`${show?'block':'hidden'}`}>
        <div className='flex items-center nav gap-8 bg-gray-50 text-sm rounded-xl py-3 font-bold'>
          <div className='w-8 text-center'>#</div>
          <div className='w-80'>Name</div>
          <div className='w-80 text-center'>Checked In</div>
        </div>
        <div className='h-[17rem] mt-2 overflow-auto text-xs overflow-y-scroll borders'>
          {infl?.map((item,index)=> 
            <div className='flex mr-2 nav gap-8 py-5 border-b-[1px] border-gray-100' key={item._id}>
              <div className='w-8 text-center font-bold'>{index + 1}</div>
              <div className='w-80 font-bold'>{item.name}</div>
              <div className='w-80 font-bold text-center'> {item["checked in"]?item["checked in"]:0} /{" "} {((item["checked in"]||0) + (item.pending||0))} </div>
            </div>
          )}
        </div>
      </div>

      
    </div>
  )
}

export default InviteList
