import React,{ useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { addInfluencer } from '../../Redux/AppReducer/action';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 
function AddInfluencer() {
    const dispatch = useDispatch();
    const { text, isError } = useSelector((state)=>state.AppReducer);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [password, setPassword] = useState("")
    const { register,watch, handleSubmit,reset, formState: { errors }} = useForm();

    const handleCopy = ()=>{
        navigator.clipboard.writeText(password);
        setOpen1(true);
    }

    // ------- password generator on onclick ------
    const handleGenPassword = ()=>{
      let pass = "";
      let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";
      for (let i = 1; i <= 19; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      
      setPassword(pass);
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
      setOpen1(false);
      setOpen2(false);
    };

    const handleSubmiting = (data) =>{
      let val = watch("name");
      let username = val.split(" ").join('');
      if(password===""){
        setOpen2(true);
      }else{
        let formate = {...data,username,password}
        dispatch(addInfluencer(formate));
        setOpen(true);
        reset();
      }
    }

    React.useEffect(()=>{
      return ()=>{
        reset();
      }
    },[])
 
  return (
    <div> 
      <div className='absolute '>
        {/* error or success msg */}
        {isError?<Snackbar open={open} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {text}! 
            </Alert>
        </Snackbar>:''}
        {/* copy msg for copy button */}
        <Snackbar open={open1} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            Copied Successfully!
            </Alert>
        </Snackbar>
        {/* error msg for password */}
        <Snackbar open={open2} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Please add password!
            </Alert>
        </Snackbar>
      </div>
      <div className='grid grid-cols-3 max-[1024px]:grid-cols-1 gap-6 m-2 mb-10 max-[425px]:mb-[85px]'>
        <div className='col-span-2 bg-white rounded-xl p-8 border-[1px] border-gray-200 max-[820px]:col-span-1'>
          <div className='mt-7 w-full'>
            <form onSubmit={handleSubmit(handleSubmiting)}>
              <div className='mb-5'>
                <label htmlFor='name' className='font-bold'>Name</label><br/>
                <input type='text' id='name' placeholder='Enter Name' {...register("name", { required: true })} className='border-[1px] border-gray-100 w-full py-2 pl-3 rounded-lg'/>
                {errors.name && <span className='text-red-400 text-xs font-bold'>--This field is required--</span>}
              </div>
              <div className='mb-5'>
                <label htmlFor='phone' className='font-bold'>Phone</label><br/>
                <input type='text' placeholder='7896541329' id="phone" {...register("phone", { required: true })} className='border-[1px] border-gray-100 w-full py-2 pl-3 rounded-lg'/>
                {errors.phone && <span className='text-red-400 text-xs font-bold'>--Please enter phone with not more than 10 numbers--</span>}
              </div>
              <div className='mb-5'>
                <label htmlFor='email' className='font-bold'>Email</label><br/>
                <input type='email' placeholder='email@gmail.com' id="email" {...register("email", { required: true,validate: {  maxLength: (v) =>  v.length <= 50 || "The email should have at most 50 characters",  matchPattern: (v) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address"},})} className='border-[1px] border-gray-100 w-full py-2 pl-3 rounded-lg'/>
                {errors.email && <span className='text-red-400 text-xs font-bold'>--Please enter valid email--</span>}
              </div>
              <div className='mb-5'>
                <label htmlFor='address' className='font-bold'>Address</label><br/>
                <input type='text' placeholder='23 address street' id="address" {...register("address", { required: true })} className='border-[1px] border-gray-100 w-full py-2 pl-3 rounded-lg'/>
                {errors.address && <span className='text-red-400 text-xs font-bold'>--This field is required--</span>}
              </div>
              <button className='bg-blue-700 w-[85%] text-white rounded-lg mt-7 mx-12 py-2 text-center font-bold cursor-pointer'>
                Save
              </button>
            </form>
          </div>
        </div>
        <div className='bg-white p-7 rounded-xl border-[1px] border-gray-200 w-full'>
            <div className='flex justify-between items-center'>
              <div className='font-bold'>Influencer Access</div>
              {/* <div><img src="/Images/editing.svg" alt="edit" /></div> */}
            </div>
            <div className='bg-gray-50 p-6 my-7 rounded-xl flex flex-col justify-center items-center gap-3'>
                <div><img src="/Images/lock.svg" alt="lock" /></div>
                <div className='font-bold text-xs'>No access to reach</div>
            </div>
            <div>
              <p className='font-bold txt-sm mb-3'>Generate Password</p>
              <div className='bg-gray-50 p-6 flex justify-between rounded-xl'>
                <p className='font-bold text-[0.8rem]'>{password?password:"Generate Password"}</p>
                <div className='cursor-pointer' onClick={handleCopy}><img src="/Images/copy.svg" alt="copy" width='24px' height='24px' /></div>
              </div>
              <div className='bg-blue-700 text-white py-2 text-center font-bold rounded-lg mt-6 mb-5 cursor-pointer' onClick={handleGenPassword}>
                Generate Password
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddInfluencer;
