import React, { useEffect, useRef,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEvents, showCreateEvent } from '../../Redux/AppReducer/action';
import Navbar from '../../component/Navbar';
import Searchbar from '../../component/Searchbar';
import CreateEvent from "./CreateEvent";
import Active from './Active';
import All from './All';
import InActive from './InActive';
import Archived from './Archived';
import EmptyState from '../../component/EmptyState';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import moment from 'moment/moment';
import '../page.css';
import { Troubleshoot } from '@mui/icons-material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Event() {
  const value = useSelector((state)=>state.AppReducer);
  const [show, setShow] = useState(false);
  const [all, setAll] = useState(true);
  const [archived, setArchived] = useState(false);
  const [archivData, setArchivData] = useState([]);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [inActive, setInActive] = useState(false);
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const currentTime = moment();

  const handleClick = ()=>{
    setShow(Troubleshoot);
    dispatch(showCreateEvent(true));
  }

  const changeState =(x)=>{
    if(x===1){
      setAll(true);
      setArchived(false);
      setActive(false);
      setInActive(false);
    }else if(x===2){
      setAll(false);
      setArchived(false);
      setActive(true);
      setInActive(false);
    }else if(x===3){
      setAll(false);
      setArchived(false);
      setActive(false);
      setInActive(true);
    }else{
      setAll(false);
      setArchived(true);
      setActive(false);
      setInActive(false);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleOpen = ()=>{
    getAllEvents(dispatch);
  }

  useEffect(()=>{
    handleOpen();
    let rols = localStorage.getItem("role");
    setRole(rols);
    document.addEventListener('click',()=>{
      let div1 = document.getElementsByClassName('inside');
      if(div1){
        for(let i=0; i<div1.length; i++){
          div1[i].classList.replace("inside", "hide");
        }
      }
    }) 
  },[value.show])

  return (
    <div className='flex outside'>
      <div className='absolute font-serif'>
        <Snackbar open={open} anchorOrigin={{ vertical:'top', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {value.text}!
            </Alert>
        </Snackbar>
      </div>
      <div className='min-[700px]:max-[1024px]:w-[30%] min-[100px]:max-[700px]:hidden w-[19%]' id='border'>
      <Navbar show={show} setShow={setShow} />
      </div> 
      <div className='w-[81%] min-[700px]:max-[1024px]:w-[70%] min-[100px]:max-[700px]:w-full min-h-screen bg-gray-50'>        
        <Searchbar props={[show, setShow, handleClick]} txt={show?"Create Event":"Events"} />
          <div className='bg-gray-50 w-full pt-6 max-[820px]:px-2 px-10 mb-20 font-serif'>
            {!value.create ?
              <div>
                {/* --- nav tabs --- */}
                <div className='flex gap-2 border-b-[1px] border-gray-300 font-semibold text-gray-400 nav'>
                  <div className={`${all?'border-b-2 border-blue-500 text-blue-500':''}`} onClick={()=>changeState(1)}><a href="#all" className='px-3 pb-1'>All</a></div>
                  <div className={`${active?'border-b-2 border-blue-500 text-blue-500':''}`} onClick={()=>changeState(2)}><a href="#active" className='px-3 pb-1'>Active</a></div>
                  <div className={`${inActive?'border-b-2 border-blue-500 text-blue-500':''}`} onClick={()=>changeState(3)}><a href="#inActive" className='px-3 pb-1'>In Active</a></div>
                  <div className={`${archived?'border-b-2 border-blue-500 text-blue-500':''}`}onClick={()=>changeState(4)}><a href="#archived" className='px-3 pb-1'>Archived</a></div>
                </div>
                {/* --- tab container --- */}
                <div>
                  <div className={`${all?'block':"hidden"}`}>

                    {/* -- condition when no events according to role -- */}
                    {value.data.length===0 && role==="admin"?<EmptyState handleClick={handleClick} img={"/Images/Calendar.svg"} value={["events","Event"]} />:value.data.length===0 && role==="company"?<div className='text-center mt-5'>No events</div>:""}
                    
                    {/* showing events if there */}
                    {value.data.length>0?<All data={value.data} role={role} click={changeState}/>:""}
                  </div>
                  <div className={`${active?'block':"hidden"}`}>

                    {/* -- condition when no events according to role -- */}
                    {value.activeData.length===0 && role==="admin"?<EmptyState handleClick={handleClick} img={"/Images/Calendar.svg"} value={["events","Event"]} />:value.activeData.length===0 && role==="company"?<div className='text-center mt-5'>No events</div>:""}

                    {/* showing events if there */}
                    {value.data.length>0?<Active activeData={value.activeData} role={role} click={changeState} />:""}
                  </div>
                  <div className={`${inActive?'block':"hidden"}`}>
                    {/* -- condition when no events according to role -- */}
                    {value.inActiveData.length===0 && role==="admin"?<EmptyState handleClick={handleClick} img={"/Images/Calendar.svg"} value={["events","Event"]} />:value.inActiveData.length===0 && role==="company"?<div className='text-center mt-5'>No events</div>:""}

                    {/* showing events if there */}
                    {value.inActiveData.length>0?<InActive role={role} click={changeState} inActiveData={value.inActiveData} />:""}
                  </div>
                  <div className={`${archived?'block':"hidden"}`}>

                    {/* -- condition when no events according to role -- */}
                    {value.archivedData.length===0 && role==="admin"?<EmptyState handleClick={handleClick} img={"/Images/Calendar.svg"} value={["events","Event"]} />:value.archivedData.length===0 && role==="company"?<div className='text-center mt-5'>No events</div>:""}

                    {/* showing events if there */}
                    {value.archivedData.length>0?<Archived data={value.archivedData} role={role} click={changeState} />:""}
                    
                  </div>
                </div>
              </div>
              :
              <CreateEvent setShow={setShow} /> 
              // ^ create event -----
            }
          </div>

        {/* ---- mobile view navbar ---- */}
        <div className={`max-[540px]:block hidden ${value.data.length<3?"absolute bottom-0 w-full":""}`}>
          <Navbar show={show} setShow={setShow} />
        </div>
      </div>
    </div>
  )
}

export default Event;