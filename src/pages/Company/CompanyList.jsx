import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import {BsThreeDots} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getCompany, editCompany, deleteCompany } from '../../Redux/AppReducer/action';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CompanyList() {
    
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [obj, setObj] = useState([]);
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState('');
    const [id, setId] = useState(0);
    const {text, companyList} = useSelector((state)=>state.AppReducer);
    const { register,watch, handleSubmit,reset} = useForm();
    const watchPassword = watch("password");
    const specialChars = /[!@#$%&*]/;

    const handleShow = (x, e)=>{
      e.stopPropagation();
      if(show){
        setShow(false);
        setId(0);
      }else{
        setShow(true);
        setId(x);
      }
    }

    const handleEdit = (object)=>{
      reset({
        email: object.email,
        address: object.address,
        location:object.location
      });
      setObj(object);
      setOpen1(true);
    }

    const handleDelete =(object)=>{
      setObj(object);
      setOpen2(true);
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
      setOpen1(false);
      setOpen2(false);
      setId(0);
    };

    const onSubmit = (data)=>{
      let total = {};

      if(password){
        if(password.length>7){
          total = {
            ...data,password
          }
          dispatch(editCompany(total,id._id));
          setId(0);
          setOpen1(false);
          setOpen(true);
        }
      }else{
        total = {...data};
        dispatch(editCompany(total,id._id));
        setId(0);
        setOpen1(false);
        setOpen(true);
      }

    }

    const onDelete = ()=>{
      setOpen(true);
      dispatch(deleteCompany(obj._id));
    }
    
    useEffect(()=>{
      getCompany(dispatch);
    },[])
 
  return (
    <div>
      <div className='absolute '>
        <Snackbar open={open} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {text}!
            </Alert>
        </Snackbar>
      </div>
      <div className='px-6'>
        <div className='grid grid-cols-3 max-[425px]:mb-20 max-[1024px]:mb-12 max-[820px]:grid-cols-1 max-[1024px]:grid-cols-2 gap-5'>
          {companyList?.map((item, index)=>
            <div className='bg-white rounded-2xl p-6 justify-between' key={item._id}>
              <div className='font-bold leading-9'>
                <div className='flex justify-between'>
                  <p>{item.name}</p>
                  {/* dropdown edit / delete */}
                    <div className='bg-blue-100 rounded-lg h-6 px-2 relative right-0 w-[35px] flex align-middle'>
                    <button className='cursor-pointer' onClick={(e)=>handleShow(item, e)}>
                      <BsThreeDots style={{color:'blue'}} />
                    </button>
                    {item._id===id._id?<div className='absolute bg-white top-5 right-0 shadow-md rounded-lg inside'>
                    <div className='pt-4 pb-2 pl-[1.55rem] pr-[3rem] font-semibold cursor-pointer hover:bg-blue-300 hover:text-blue-700 rounded-t-lg' onClick={()=>handleEdit(item._id===id._id?id:'')}>Edit</div>
                    {/* edit the details */}
                    {item._id===obj._id?<Modal 
                      open={open1}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <p className='font-bold text-xl'>Edit Company </p>
                        <div>
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                              <label htmlFor='email' className='block font-bold text-sm mt-5'>EMAIL:</label>
                              <input type='email' id='email' {...register("email", { required: true,validate: {
                                  maxLength: (v) =>
                                    v.length <= 50 || "The email should have at most 50 characters",
                                  matchPattern: (v) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                    "Email address must be a valid address",
                                }, })} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' />
                            </div>
                            <div>
                              <label htmlFor='address' className='block font-bold text-sm mt-5'>ADDRESS:</label>
                              <input type='text' id='address' {...register("address", { required: true })} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' />
                            </div>
                            <div>
                              <label htmlFor='location' className='block font-bold text-sm mt-5'>LOCATION:</label>
                              <input type='text' id='location' {...register("location", { required: true })} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2'/>
                              
                            </div>
                            <div>
                              <label htmlFor='password' className='block font-bold text-sm mt-5'>PASSWORD:</label>
                              <input type='text' id='password' onChange={(e)=>setPassword(e.target.value)}  className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2'/>
                              {password ? <div className='text-xs font-semibold text-red-600 pl-4 pt-1'>
                                <ul className='list-disc'>
                                  <li className={`${password.match(/[A-Z]/) && password.match(/[a-z]/)? "text-green-500":"text-red-600"}`}>include both upper and lower case characters</li>
                                  <li className={`${specialChars.test(password) && /\d/.test(password) ? 'text-green-500':"text-red-500"}`}>include at least one number and symbol</li>
                                  <li className={`${password.length>7?'text-green-500':'text-red-500'}`}>be at least 8 character long</li>
                                </ul>
                              </div>:''}
                            </div>
                            <input type="submit" className='py-2 px-6 rounded-lg text-center bg-primary-400 text-white font-bold text-sm mt-5 cursor-pointer' />
                          </form>
                        </div>
                      </Box>
                    </Modal>:''}
                    <div className='pt-2 pb-4 px-6 font-semibold cursor-pointer hover:bg-blue-300 hover:text-blue-700 rounded-b-lg' onClick={()=>handleDelete(item)}>Delete</div>
                    {item._id===obj._id?<Modal 
                      open={open2}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <p className='text-base font-bold mb-5'>Are you sure?</p>
                        <div className='grid grid-cols-2 gap-5'>
                          <div className='py-2 text-center rounded-full border-[1px] border-gray-300 font-bold cursor-pointer' onClick={handleClose}>
                            Cancel
                          </div>
                          <div className='py-2 text-center rounded-full bg-primary-400 cursor-pointer text-white font-bold' onClick={onDelete}>
                            Delete
                          </div>
                        </div>
                      </Box>
                    </Modal>:""}
                    </div>:''}
                  </div>
                </div>
                <p className='text-gray-400 overflow-x-scroll no-scrollbar'>{item.email}</p>
                <p>{item.location}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div> 
  )
}

export default CompanyList;
