import React, {useState, useEffect} from 'react';
import Navbar from '../../component/Navbar';
import Searchbar from '../../component/Searchbar';
import Scanner from './Scanner';
import '../page.css';

function CheckIns() {
    const [show, setShow] = useState(false);
    const [startScan, setStartScan] = useState(false);
  
  const handleClick = ()=>{
    setStartScan(true);
  }

  useEffect(()=>{ 
  },[show]);
   
  return (
    <div className='flex font-serif'>
      <div className='min-[700px]:max-[1024px]:w-[30%] min-[100px]:max-[700px]:hidden w-[19%] h-auto' id='border'>
        <Navbar show={show} setShow={setShow} />
      </div>
      <div className={`relative top-0 w-[81%] min-[700px]:max-[1024px]:w-[70%] min-[100px]:max-[700px]:w-full min-h-screen bg-gray-50`}>
          <Searchbar props={[show, setShow, handleClick]} txt={"Check In"} />
          <Scanner startScan={startScan} setStartScan={setStartScan} />
        {/* ---- mobile view navbar ---- */}
        <div className='max-[540px]:block hidden absolute bottom-0 w-full'>
        <Navbar show={show} setShow={setShow} />
        </div>
      </div>
    </div>
  )
}


export default CheckIns;
