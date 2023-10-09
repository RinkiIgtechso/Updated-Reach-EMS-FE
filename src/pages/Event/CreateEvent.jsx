import React,{useEffect, useState , useRef} from 'react';
import { getAllInfluencers, getCompany, createEvent, showCreateEvent } from '../../Redux/AppReducer/action';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, Select } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import moment from 'moment/moment';
import '../page.css';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateEvent({setShow}) {
    const {companyList, influencer} = useSelector((state)=>state.AppReducer);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [date, setDate] = useState("");
    const [nDate, setNDate ] = useState("");
    const [stime, setStime] = useState('');
    const [time1, setTime1] = useState('');
    const [etime, setEtime] = useState('');
    const [time2, setTime2] = useState('');
    const [selected, setSelected] = useState(false);
    const [guestEmail, setGuestEmail] = useState('');
    const [influencers, setInfluencers] = useState([]);
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [empty, setEmpty] = useState(false);
    const ref = useRef(null);
    const [data, setData] = useState([influencer]);
    const dispatch = useDispatch();
    const currentTime = moment();

    const handleGuest = (e)=>{
        setSelected(true);
        setGuestEmail(e.target.value);
        let val = guestEmail.toLowerCase();
        let arr = influencer.filter((item)=>{
            let name = item.name.toLowerCase();
            let email = item.email.toLowerCase();
            let phone = item.phone;
            if(name.includes(val) || email.includes(val) || phone.includes(val)){
                return item;
            }
        })
        setData(arr);
    }

    const handleAdd = (e)=>{
        e.preventDefault();
        let arr = influencer.filter((item)=>{
            return item.email === guestEmail;
        })
        setInfluencers(state=>[...state, ...arr]);
    }

    const handleDate = (e)=>{
        ref.current.setAttribute("data-date",
            moment(ref.current.value,"YYYY-MM-DD")
            .format(ref.current.getAttribute("data-date-format"))
        ) 
        let str = e.target.value;
        let res = str.split("-");
        let month = ["Jan", "Feb", "March", "April", "May", "June", "July", 
         "August", "September", "October", "November", "December"];
        let nDate = `${res[2]+" "+month[res[1]-1]+" "+res[0]}`;
        setNDate(str);
        setDate(nDate);
    }

    const handleTime = (e, val) => {
        let time = e.split(":").map((item)=>Number(item));
        let hours = 0;
        let x = '';
        if(time[0]===12){
            hours = 12;
            x = 'PM'
        }else if(time[0]>12){
            hours = time[0]%12;
            x = 'PM'
        }else if(time[0]===0){
            hours = 12;
            x = 'AM';
        }else if(time[0]<12){
            hours = time[0];
            x = 'AM';
        }
        hours = hours<10?"0"+hours:hours;
        let min = time[1]<10?"0"+time[1]:time[1];
        let nTime = hours+":"+min+" "+x;
        let dateTime = nDate+ " " + e;
        const anotherTime = moment(dateTime);
        if(!currentTime.isAfter(anotherTime) && val==='stime'){
            setTime1(e);
            setStime(nTime);
        }else if(!currentTime.isAfter(anotherTime) && val==='etime'){
            let endTime = nDate+ " "+ e;
            endTime = moment(endTime);
            let startTime = nDate+ " " + time1;
            startTime = moment(startTime);
            if(!endTime.isAfter(startTime)){
                setTime2('');
                setEtime('');
                return;
            }
            setTime2(e);
            setEtime(nTime);
        } 
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        let status = 'inactive';
        let description = "DSA contest between 4 colleges";
        if(name==="" || stime==="" || etime==="" || date==='' || company==="" || location==="" || influencers.length<1){
            setEmpty(true);
        }else{
            let data = {
                name,stime,etime,date,description, status,influencers,company,location
            }
            dispatch(createEvent(data));
            dispatch(showCreateEvent(false));
            setShow(false);
        }
    }

    const handleCancel = ()=>{
        dispatch(showCreateEvent(false));
        setShow(false);
    }

    const handleDelete = (id)=>{
        let influencer = influencers.filter((item)=>{
            return item._id!==id
        })
        setInfluencers(influencer);
    }

    const handleClose = (e)=>{
        setOpen(false);
    }

    const handleSelect = (email)=>{
        setGuestEmail(email);
        setSelected(false);
    }

    const minDate = () => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    };

    // converting 10-04-2023 formate to 10 April 2023 ----
    useEffect(()=>{
        // let year = new Date().getFullYear();
        // let month = new Date().getMonth()+1;
        // if(month<10){
        //     month = "0"+month;
        // }
        // let date = new Date().getDate();
        // let tDate = year+"-"+month+"-"+date;
        // let dates = document.getElementById('date');
        // dates.setAttribute("data-date",moment(tDate,"YYYY-MM-DD").format(dates.getAttribute("data-date-format")));
        // setNDate(tDate);
    },[])

    useEffect(()=>{
        getAllInfluencers(dispatch);
        getCompany(dispatch);
        document.addEventListener("click",()=>{
            setSelected(false);
        })
    },[])

  return (
    <div className=' max-[425px]:px-5 px-10 py-8'>
        <Snackbar open={open} anchorOrigin={{ vertical:'bottom', horizontal:'right' }} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Added Successfully!
            </Alert>
        </Snackbar>
        <div className='flex gap-5 border-b-[1px] border-gray-300 font-bold text-gray-500 mb-7'>
            <div className='border-b-2 border-blue-500 text-blue-500' ><a href="#generalInformation" className='px-3 pb-1'>General Information</a></div>
        </div>
        {/* ------- General Information ------- */}
        <div>
            <div className="bg-white max-[768px]:p-3 p-6 rounded-xl mb-16">
                <div className='mt-5 text-sm text-gray-950 font'>
                    <form>
                        {/* ---- Enter Event Name --- */}
                        <div>
                            <label htmlFor='name' className='block font-bold'>EVENT NAME</label>
                            <input type='text' id='name' value={name} onChange={(e)=>setName(e.target.value)} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' placeholder='Enter Event Name' />
                            <p className={`${name==="" & empty?"block":"hidden"} text-[0.8rem] text-red-500 font-bold`}>-- Please enter event name --</p>
                        </div>
                        {/* ---- Enter date, time, duration ---- */}
                        <div className='grid max-[1024px]:grid-cols-1 grid-cols-3 gap-5 mt-7'>
                            <div>
                                <label htmlFor='date' className='block font-bold'>DATE</label>
                                <input type='date' id='date' ref={ref} value={nDate} data-date="" min={minDate()} data-date-format="DD MMMM YYYY" onChange={handleDate} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' placeholder='01-06-20' />
                                <p className={`${date==="" & empty?"block":"hidden"} text-[0.8rem] text-red-500 font-bold`}>-- Please choose date --</p>
                            </div>
                            <div>
                                <label htmlFor='time' className='block font-bold'>START TIME</label>
                                <input type='time' id='time' value={time1} onChange={(e)=>handleTime(e.target.value,"stime")} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' placeholder='00:00 PM' />
                                <p className={`${stime==="" & empty?"block":"hidden"} text-[0.8rem] text-red-500 font-bold`}>-- Please choose stime --</p>
                            </div>
                            <div>
                                <label htmlFor='duration' className='block font-bold'>END TIME</label>
                                <input type='time' id='duration' value={time2} onChange={(e)=>handleTime(e.target.value,"etime")} className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' placeholder='00:00 PM' />
                                <p className={`${etime==="" & empty?"block":"hidden"} text-[0.8rem] text-red-500 font-bold`}>-- Please choose etime --</p>
                            </div>
                        </div>
                        {/* --- select company --- */}
                        <div className='mt-7'>
                            <label htmlFor='company' className='block font-bold'>COMPANY NAME</label>
                            <Select
                                value={company}
                                onChange={(e)=>setCompany(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{width:"100%",marginTop:"9px",padding:'0px 0px !important',borderColor:'lightgray',color:'gray',fontFamily:'Raleway, sans-serif'}}
                            >
                                <MenuItem value="">
                                    <b>Add Company</b>
                                </MenuItem>
                                {companyList?.map((item)=>
                                    <MenuItem value={item._id} key={item._id}>{item.name}</MenuItem>
                                )}
                                
                            </Select>
                            <p className={`${company==="" & empty?"block":"hidden"} text-[0.8rem] text-red-500 font-bold`}>-- Please select company name --</p>
                        </div>
                        {/* --- add location --- */}
                        <div className='mt-7 relative'>
                            <label htmlFor='location' className='block font-bold'>ADD LOCATION</label>
                            <input type='text' id='location' className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' placeholder='add location' value={location} onChange={(e)=>setLocation(e.target.value)} />
                            <p className={`${location==="" & empty?"block":"hidden"} text-[0.8rem] text-red-500 font-bold`}>-- Please add location --</p>
                        </div>
                        {/* --- add influencers --- */}
                        <div className='mt-7 relative'>
                            <label htmlFor='guest' className='block font-bold'>ADD INFLUENCERS</label>
                            <input type='text' id='guest' className='border-[1px] border-gray-300 w-full outline-none py-2 px-3 rounded-lg mt-2' placeholder='email, username or phone number' value={guestEmail} onChange={(e)=>handleGuest(e)} />
                            <button className='absolute top-[2rem] right-2 py-1 px-5 rounded-lg bg-gray-100 font-bold' onClick={(e)=>handleAdd(e)} disabled={!guestEmail}>Add</button>
                            <p className={`${influencers.length<1 & empty?"block":"hidden"} text-[0.8rem] text-red-500 font-bold`}>-- Please enter influencer --</p>
                        </div>
                        {/* --- list of influencer --- */}
                        {selected && guestEmail?<div className='mt-7'>
                            <div className='relative'>
                                <div className='borders absolute  border-[1px] w-full rounded-lg border-gray-100 h-auto overflow-y-auto shadow-lg'>
                                    {data?.map((item,index)=>
                                        <div className='flex px-5 bg-white nav gap-8 py-5 cursor-pointer hover:bg-blue-200 hover:text-blue-700' key={index} onClick={()=>handleSelect(item.email)}>
                                            <div className='w-8 text-center font-bold'>{index + 1}</div>
                                            <div className='w-64 font-bold'>{item.name}</div>
                                            <div className='w-64 font-bold'>{item.email}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>:""}
                        {/* ------ list of added influencers ----- */}
                        <div className='rounded-lg border-[1px] border-gray-300 p-4 mt-7'>
                            <div>
                                <div className='flex items-center nav gap-8 bg-gray-50 rounded-xl py-3 font-bold'>
                                    <div className='w-8 text-center'>#</div>
                                    <div className='w-64'>Name</div>
                                    <div className='w-64'>Email</div>
                                    <div className='w-64'></div>
                                </div>
                                <div className='borders'>
                                    {influencers?.map((item,index)=>
                                        <div className='flex mr-2 nav gap-8 py-5 border-b-[1px] border-gray-100' key={index}>
                                            <div className='w-8 text-center font-bold'>{index + 1}</div>
                                            <div className='w-64 font-bold'>{item.name}</div>
                                            <div className='w-64 font-bold'>{item.email}</div>
                                            <div className='w-64 flex justify-end '>
                                                <div className='cursor-pointer' onClick={()=>handleDelete(item._id)}>
                                                    <img src='/Images/delete.svg' alt='delete' />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* ----- action ----- */}
                        <div className='flex justify-end gap-5 mt-14'>
                            <button className='py-2 max-[425px]:px-3 px-9 font-bold text-sm border-[1px] border-gray-200 rounded-lg' onClick={handleCancel}>Cancel</button>
                            <button className='text-sm px-4 py-2 rounded-lg bg-primary-200 text-white font-bold' onClick={handleSubmit}>Create Event</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        {/* ----- end ----- */}
    </div>
  )
}

export default CreateEvent;