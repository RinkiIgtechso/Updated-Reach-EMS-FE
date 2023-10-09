import React,{ useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { createCompany, showCreateEvent } from '../../Redux/AppReducer/action';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../page.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateCompany({setShow}) {
    const { register, handleSubmit, formState: { errors }, reset} = useForm();
    const [open1, setOpen1] = useState(false);
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    const dispatch = useDispatch();
    const {text, isError, create} = useSelector((state)=>state.AppReducer);

    const handleCancel = ()=>{
        setShow(false);
        dispatch(showCreateEvent(false));
    }

    const handleClose = ()=>{
        setOpen1(false);
        dispatch({type:"HIDE_ERROR", payload:false})
    }

    // ------- password generator on onclick ------
    const genPassword = ()=>{
        let pass = "";
        let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
        for (let i = 1; i <= 19; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }

    const onSubmit = (data)=>{
        if(password){
            let final_data = {
                ...data,
                password
            }
            dispatch(createCompany(final_data));
            if(create){
                setOpen1(true);
                setShow(true);
                reset();
            }else{
                setOpen1(false);
                setShow(false);
            }
        }else{
            setErr(true);
        }
        
    }
 
    useEffect(()=>{
    },[text, create])

  return (
    <div className=' max-[768px]:px-5 px-10 py-8'>
       <div className='absolute'>
            <Snackbar open={isError} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>
        </div>
        <div className='flex gap-5 border-b-[1px] border-gray-300 font-bold text-gray-500 mb-7'>
            <div className='border-b-2 border-blue-500 text-blue-500' ><a href="#generalInformation" className='px-3 pb-1'>General Information</a></div>
        </div>
        {/* ------- General Information ------- */}
        <div className="bg-white max-[768px]:p-3 p-6 rounded-xl max-[425px]:mt-4 max-[820px]:mt-24 mb-16">
            <div className='mt-3 text-sm text-gray-950 font'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* ---- Enter Event Name --- */}
                    <div>
                        <label htmlFor='name' className='block font-bold'>COMPANY NAME</label>
                        <input type='text' id='name' {...register("name", { required: true })} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' placeholder='Enter Company Name' />
                        {errors.name && <span className='text-red-400 text-xs font-bold'>--This field is required--</span>}
                    </div>
                    {/* --- email and address --- */}
                    <div className='grid grid-cols-2 max-[820px]:grid-cols-1 gap-5 mt-7'>
                        <div>
                            <label htmlFor='email' className='block font-bold'>EMAIL</label>
                            <input type='email' id='email' {...register("email", { required: true,validate: {  maxLength: (v) =>  v.length <= 50 || "The email should have at most 50 characters",  matchPattern: (v) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address"},})} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' placeholder='email@gmail.com' />
                            {errors.email && <span className='text-red-400 text-xs font-bold'>--Please enter valid email--</span>}
                        </div>
                        <div>
                            <label htmlFor='address' className='block font-bold'>ADDRESS</label>
                            <input type='text' id='address' {...register("address", { required: true })} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' placeholder='32 address' />
                            {errors.address && <span className='text-red-400 text-xs font-bold'>--This field is required--</span>}
                        </div>
                    </div>
                    {/* --- add location --- */}
                    <div className='mt-7 relative'>
                        <label htmlFor='location' className='block font-bold'>LOCATION</label>
                        <input type='text' id='location' className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' placeholder='add location' {...register("location", { required: true })}/>
                        {errors.location && <span className='text-red-400 text-xs font-bold'>--This field is required--</span>}
                    </div>
                        {/* --- add password --- */}
                        <div className='mt-7 relative'>
                        <label htmlFor='location' className='block font-bold'>Password</label>
                        <div className='grid grid-cols-3 max-[820px]:grid-cols-1 gap-4 w-full'>
                            <div className='col-span-2 max-[820px]:col-span-1'>
                                <div className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2'>{password?password:"Generate Password"}</div>
                                {err?<p className='text-red-400 font-semibold text-xs'>-- This field is required --</p>:''}
                            </div>
                            <div onClick={genPassword}>
                                <div className='w-full mt-2 bg-primary-200 text-white py-2 text-center font-bold rounded-lg cursor-pointer'>Generate Password</div>
                            </div>
                        </div>
                    </div>
                    {/* ----- action ----- */}
                    <div className='flex justify-end gap-5 mt-14'>
                        <button className='py-2 max-[425px]:px-3 px-9 font-bold text-sm border-[1px] border-gray-200 rounded-lg' onClick={handleCancel}>Cancel</button>
                        <button className='text-sm px-4 py-2 rounded-lg bg-primary-200 text-white font-bold' >Create Company</button>
                    </div>
                </form>
            </div>
        </div>
        {/* ----- end ----- */}
    </div>
  )
}

export default CreateCompany;