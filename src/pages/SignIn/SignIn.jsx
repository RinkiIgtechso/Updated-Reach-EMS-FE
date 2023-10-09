import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { getData, showMsg, getLogin } from '../../Redux/AuthReducer/action';
import { SolidHide, SolidShow, User } from './svgIcon';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {MdLock} from "react-icons/md";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './signIn.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SignIn() {
  const { register, handleSubmit,watch } = useForm();
  const {isError, text, auth} = useSelector((state)=>state.AuthReducer);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [authEMS, setAuthEMS] = useState('');
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  let user_role = localStorage.getItem("role");
  let token = localStorage.getItem("user");

  const handleClickShowPassword = () => {setShowPassword((show) => !show)};

  const onSubmit = (data) =>{
    // --- admin & company login
    setAuthEMS(localStorage.getItem("auth_reachEMS"));
    if(role==='admin' || role==='company'){
      dispatch(getData(data));
      if (authEMS == "false" || authEMS==null) {
        setOpen(true);
      }
    }else{
      // --- influencer login 
      dispatch(getLogin(data));
      if (authEMS == "false" || authEMS==null) {
        setOpen(true);
      } 
    }
  };

  if(auth && role!==null){
    localStorage.setItem("applyAnimation",true)
    if(role==='admin' || role==='company'){
      navigate("/dashboard", { replace: true });
    }else{
      navigate("/myBookings", { replace: true });
    }
  }

  const handleClose = () => {
    showMsg(dispatch);
  };

  const handleClose2 = () =>{
    setOpen1(false);
  }

  const findRole = ()=>{
    if(pathname==='/admin'){
      localStorage.setItem("ReachEMS-Role", "admin")
      setRole("admin");
    }else if(pathname==="/company"){
      localStorage.setItem("ReachEMS-Role", "company")
      setRole("company");
    }else if(pathname==="/influencer"){
      localStorage.setItem("ReachEMS-Role", "influencer")
      setRole("influencer")
    }
  }

  useEffect(()=>{
    findRole();
    setTimeout(()=>{
        let authE = localStorage.getItem("auth_reachEMS");
        setAuthEMS(authE);
    },700)
  },[])

  return (
    <div>
      {/* --- login successfull message --- */}
      <Snackbar
        open={open1}
        autoHideDuration={6000}
        onClose={handleClose2}
        anchorOrigin={{ "vertical":'top', "horizontal":'right' }}
      >
        <Alert onClose={handleClose2} severity="success" sx={{ width: '100%',fontSize:"16px",fontFamily:'Raleway, sans-serif'}}>
            Successfully logged in!
        </Alert>
      </Snackbar>
      {/* ------- end ------ */}

      {/* --- error message --- */}
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ "vertical":'top', "horizontal":'right' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%',fontSize:"16px",fontFamily:'Raleway, sans-serif'}}>
          {text}!
        </Alert>
      </Snackbar>
      {/* ------ end ----- */}
      
      <div className='grid grid-cols-3 max-[1024px]:grid-cols-1 min-h-screen max-[1024px]:bg-gray-50'>
        {/* -------- left section -------- */}
        <div className='col-span-2 h-full grid place-items-center font-serif'>
          <div className='absolute top-24 logo-show'>
            <div className='w-[100%] mx-auto'>
              <img src="/Images/logo.svg" alt="reach logo" />
            </div>
          </div>
         <div className='p-4'>
            <div className='max-[1024px]:text-center'>
              <h1 className='font-extrabold text-3xl'>Welcome!</h1>
              <p className='mt-2'>Enter your credentials below to login</p>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* ---- enter name ---- */}
                <div className='border-[1px] rounded-3xl border-gray-300 w-[19rem] p-3 flex items-center gap-2 focus-within:shadow-lg focus-within:border-none max-[1024px]:focus-within:bg-white my-5'>
                  <div className='w-[15px] h-[20px]'><User color={"black"} /></div>
                  {role==="influencer"?
                  <input type="text" placeholder='Enter your username or email' className='w-full focus:font-bold bg-transparent' {...register("username", { required: true })}/> :
                  <input type="email" placeholder='Enter your email' className='w-full focus:font-bold bg-transparent' {...register("email", { required: true })}/>}
                  
                </div>
                {/* ---- enter password ---- */}
                <div className='border-[1px] rounded-3xl border-gray-300 w-[19rem] p-3 flex items-center gap-2 focus-within:border-none max-[1024px]:focus-within:bg-white focus-within:shadow-lg'>
                  <div><MdLock style={{color:"black"}} /></div>
                  <input type={showPassword?"text":"password"} placeholder='Password' className='w-full focus:font-bold bg-transparent' {...register("password", { required: true })} />
                  <div className='w-6 h-6 flex items-center' onClick={handleClickShowPassword}>{showPassword?<SolidShow color="black" />:<SolidHide color="black" required/>}</div>
                </div>
                <div className='text-sm text-right font-extrabold'><a href="/forgetPassword">Forgot Password?</a></div>
                {/* submit form */}
                <button className={`w-full rounded-3xl py-[0.8rem] text-center ${watch('username') || watch('email') && watch("password")?"bg-blue-400 text-white shadow-xl":"bg-gray-200 text-gray-700"}  font-bold mt-5`}>Login</button>
              </form>
            </div>
          </div>
        </div>
        {/* --------- right section -------- */}
        <div className='bg-[#037dc8] relative overflow-hidden max-[1024px]:hidden'>
          <div className='m-auto w-32 h-12 mt-12'><a href="/"><img src="/Images/W_Reach.svg" alt="reach_SVG"  /></a></div>
          {/* --- right --- */}
          <div className='absolute w-[136%] -left-[34.5%] -bottom-[1.5rem] bg-no-repeat bg-rectangle h-[67.5%]' style={{backgroundSize:"99.1% 111%"}}>
          </div>
           {/* --- left --- */}
          <div className='absolute w-full -rotate-[34deg] -left-[76%] bg-no-repeat bottom-[0.59rem] bg-rectangle h-[43%] shadow-bg' style={{backgroundSize:"99.1% 111%"}}>
          </div>
          {/* --- mobile --- */}
          <div className={`absolute -bottom-[39px] -right-8 w-full -rotate-[10deg] h-[72%] ${role==="admin" || role==='company'?"bg-mobile":role==="influencer"?"bg-influencer":""} bg-center bg-no-repeat`} style={{backgroundSize:"100% 100%"}}>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default SignIn;
