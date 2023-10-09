import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIn } from '../../Redux/AppReducer/action';
import { useNavigate } from 'react-router-dom';
// import QrReader from 'react-qr-scanner';
import QrReader from "react-qr-reader";
import "../page.css";
 
function ChangeState({setStartScan, setShow,setFailed,value,handleBooking}){

    const handleTry =()=>{
        setFailed(false);
        setStartScan(false);
        setShow(true);
    }

    return(
        <div className='bg-white px-6 py-10 flex flex-col gap-4 items-center justify-center w-[21rem] m-auto rounded-xl mt-8 mb-[51px] relative'>
            <img src={value[0]} alt="failed" width='180px' height='180px' />
            <p className='font-bold text-sm mt-5 mb-10'>{value[1]}</p>
            {value[2]?<div className='flex gap-3 text-sm w-full'>
                <div className='w-2/4 bg-primary-200 text-white font-bold text-center py-2 
                    rounded-xl cursor-pointer' onClick={()=>handleTry()}>Try Again</div>
                <div className='w-2/4 border-[1px] border-gray-300 text-center font-bold py-2 rounded-xl cursor-pointer' onClick={()=>handleBooking()}>My Bookings</div>
            </div>:
            <div className='w-4/5 text-sm bg-primary-200 text-white text-center font-bold py-2 rounded-xl cursor-pointer' onClick={handleBooking}>{value[2]?"My Bookings":"Events"}</div>}
        </div>
    )
}

function Scanner({startScan,setStartScan}) {
    let err = useSelector(state=>state.AppReducer.isError);
    let success = useSelector(state=>state.AppReducer.checkedIn);
    // const [startScan, setStartScan] = useState(false);
    const [failed, setFailed] = useState(false);
    const [show, setShow] = useState(true);
    const [facingMode, setFacingMode] = useState('environment');
    const navigate = useNavigate("");
    const dispatch = useDispatch();

    const videoConstraints = {
        facingMode: { exact: facingMode }, // Set to 'environment' for back camera
    };

    const handleScan = async (scanData)=>{
        if (scanData) {
            let value = {
                "qrcode":scanData
            };
            handleDispatch(value);
        }
    }

    const handleDispatch = (val)=>{
        dispatch(checkIn(val));
        setShow(false);
        setTimeout(()=>{
            setShow(true);
            setStartScan(false);
        },2500)
    }

    const handleError = (err) => {
        setFailed(true);
        setShow(false);
        alert("Permission denied");
    };

    const handleBooking = ()=>{
        if(failed){
            navigate("/myBookings")
        }else{
            navigate("/event");
        }
    }

    const previewStyle = {
        height: 200,
        width: 200,
    }
    
    useEffect(()=>{
        if(window.innerWidth>820){
            setFacingMode("user");
        }else{
            setFacingMode("environment");
        }
    },[failed, show, err])

  return (
    <div className='mb-[78px]'>
        <div className='bg-gray-50 w-full p-6 max-[425px]:p-1'>
            {show?<div className='bg-white px-6 py-10 flex flex-col gap-4 items-center justify-center w-[21.5rem] m-auto rounded-xl mt-28 mb-20 relative'>
                {!startScan?<img src='/Images/barcode.svg' alt='qr-code' className='cursor-pointer' width="180px" height="180px"
                onClick={() => {setStartScan(!startScan)}}
                />:""}
                    {startScan && (
                    <>
                        <QrReader
                            constraints={videoConstraints}
                            delay={800}
                            style={previewStyle}
                            onScan={handleScan}
                            onError={handleError}
                        />
                        <div className="ocrloader">
                        <p>Scanning</p>
                        <em></em>
                        <span></span>
                        </div>
                    </>
                    )}
                <p className='text-[0.8rem] font-extrabold flex align-middle gap-1'><img src="/Images/qr_code_scan.svg" alt="qr-code-scan" />Point the camera at a QR code to get started</p>
            </div>:""} 
            {/* --- not registered --- */}
            {err && !success?<ChangeState setStartScan={setStartScan} setShow={setShow} setFailed={setFailed} value={["/Images/notRegister.svg","User Not Found",false]} handleBooking={handleBooking} />:""}
            {/* --- failed message --- */}
            {failed ?<ChangeState setStartScan={setStartScan} setShow={setShow} setFailed={setFailed} value={["/Images/failed.svg","Failed Checked In",true]} handleBooking={handleBooking} />:""}
            {/* ----- success box ---- */}
            {success && !err?<ChangeState setStartScan={setStartScan} setShow={setShow} setFailed={setFailed} value={["/Images/successfull.svg","Successfull Checked In",false]} handleBooking={handleBooking} />:""}
            
        </div>
    </div>
  )
}

export default Scanner
