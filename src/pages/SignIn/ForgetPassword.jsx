import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from './svgIcon';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'js-cookie';
import './signIn.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [spin, setSpin] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleName= (e)=>{
        setSpin(true);
        setEmail(e.target.value);
    }

    const handleSubmit = (e)=>{
        setOpen(true);
        console.log(email);
        setTimeout(()=>{
            navigate('/resetPassword', { replace: true })
        },1500)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }

    useEffect(()=>{
        const name = Cookies.get('user');
        console.log(name);
        setTimeout(()=>{
            setSpin(false);
          },1000);
        
    },[email])

  return (
    <div>
        <div className='grid grid-cols-3 max-[1024px]:grid-cols-1 min-h-screen'>
        {/* -------- left section -------- */}
        <div className='col-span-2 h-full grid place-items-center font-serif'>
          <div className='p-4'>
          <div className='text-3xl font-bold text-gray-950 mb-5'>Forgot Password</div>
            <div>
                {/* --- email sent message --- */}
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    // message="Please enter correct credentials!"
                    // action={action}
                    anchorOrigin={{ "vertical":'top', "horizontal":'right' }}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%',fontSize:"16px",fontFamily:'Raleway, sans-serif'}}>
                        You will recieve a reset email !
                    </Alert>
                </Snackbar>
                <form className='w-full m-0 grid'>
                    <div className='border-[1px] rounded-full border-gray-300 w-[21.7rem] p-3 flex items-center gap-2 focus-within:shadow-lg focus-within:border-none mb-5'>
                        <div className='w-[15px] h-[20px]'><User color="black"/></div>
                        <input type="email" placeholder='Enter you email' value={email} className='w-full pl-1 focus:font-bold' onChange={handleName} />
                    </div>
                    <button className="join" type="button" onClick={handleSubmit}>
                    Send Reset Code
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


export default ForgetPassword;
