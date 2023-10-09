import React, { useEffect, useState } from 'react';
import { SolidHide, SolidShow } from './svgIcon';
import {MdLock} from "react-icons/md";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './signIn.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function ResetPassword() {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [spin, setSpin] = useState(false);
    const [spin2, setSpin2] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handlePass1 = (e)=>{
        // setSpin(true);
        setPassword1(e.target.value);
    }

    const handlePass2 = (e)=>{
        // setSpin2(true);
        setPassword2(e.target.value);
    }

    const handlePassword = (x)=>{
        if(x===1){
            setSpin((prev)=>!prev);
        }else{
            setSpin2((prev)=>!prev);
        }
      }

    const handleSubmit = (e)=>{
        if(password1==='' && password2===''){
            setOpen(true);
        }else if(password1!==password2){
            setOpen(true);
        }else{
            setOpen2(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    
      const handleClose2 = (event, reason) =>{
        if(reason === 'clickaway'){
            return;
        }
        setOpen2(false);
      }

    useEffect(()=>{
    },[password1,password2])

  return (
    <div>
        <div className='grid grid-cols-3 max-[1024px]:grid-cols-1 min-h-screen'>
            {/* -------- left section -------- */}
            <div className='col-span-2 h-full grid place-items-center font-serif'>
                <div className='p-4'>
                    <div className='text-3xl font-bold text-gray-950 mb-5'>Reset Password</div>
                    <div>
                    
                        {/* --- reset password message --- */}
                        <Snackbar
                            open={open2}
                            autoHideDuration={6000}
                            onClose={handleClose2}
                            anchorOrigin={{ "vertical":'top', "horizontal":'right' }}
                        >
                            <Alert onClose={handleClose2} severity="success" sx={{ width: '100%',fontSize:"16px",fontFamily:'Raleway, sans-serif'}}>
                                Successfully logged in!
                            </Alert>
                        </Snackbar>

                        {/* --- error message --- */}
                        <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            anchorOrigin={{ "vertical":'top', "horizontal":'right' }}
                        >
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%',fontSize:"16px",fontFamily:'Raleway, sans-serif'}}>
                                Please enter correct password!
                            </Alert>
                        </Snackbar>
                        {/* ------- end ------ */}

                        <form className='w-full m-0 grid'>
                            {/* ---- enter password ---- */}
                            <div className='border-[1px] rounded-full border-gray-300 w-[22rem] p-3 flex items-center gap-2 focus-within:border-none focus-within:shadow-lg mb-5'>
                                <div><MdLock style={{color:"black"}} /></div>
                                <input type={spin?"text":"password"} placeholder='new password' className='w-full focus:font-bold' onChange={handlePass1} />
                                <div className='w-6 h-6 flex items-center' onClick={()=>handlePassword(1)}>{spin?<SolidShow color="black" />:<SolidHide color="black" />}</div>
                            </div>
                            <div className='border-[1px] rounded-full border-gray-300 w-[22rem] p-3 flex items-center gap-2 focus-within:border-none focus-within:shadow-lg mb-5'>
                                <div><MdLock style={{color:"black"}} /></div>
                                <input type={spin2?"text":"password"} placeholder='confirm password' className='w-full focus:font-bold' onChange={handlePass2} />
                                <div className='w-6 h-6 flex items-center' onClick={()=>handlePassword(2)}>{spin2?<SolidShow color="black" />:<SolidHide color="black" />}</div>
                            </div>
                            <button className="join" type="button" onClick={handleSubmit}>
                                RESET PASSWORD
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* --------- right section -------- */}
            <div className='bg-[#037dc8] relative overflow-hidden max-[1024px]:hidden'>
            <div className='m-auto w-32 h-12 mt-12'><a href="/"><img src="/Images/W_Reach.svg" alt="reach_SVG"  /></a></div>
            {/* --- right --- */}
            <div className='absolute w-[772px] -left-[212px] -bottom-[1.5rem] bg-no-repeat bg-rectangle h-[489.5px]' style={{backgroundSize:"99.1% 111%"}}>
            </div>
            {/* --- left --- */}
            <div className='absolute w-full -rotate-[34deg] -left-[349px] bg-no-repeat bottom-[0.59rem] bg-rectangle h-[319px]' style={{backgroundSize:"99.1% 111%"}}>
            </div>
            <div className='absolute -bottom-[45px]  -right-12 w-full -rotate-[5deg] h-[426px] bg-mobile bg-center bg-no-repeat' style={{backgroundSize:"99.1% 111%"}}>
            </div>
            </div>
        </div>
    </div>    
  )
}

export default ResetPassword;
