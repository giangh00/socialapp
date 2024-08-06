import React, { useRef, useState, useEffect,useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { FaMapMarked } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import avatar from '../../images/ava.jpg';
import sanji from '../../images/img2.jpg';
import simayi from '../../images/img3.jpg';
import lubo from '../../images/img1.webp';
import { AuthContext } from "../AppContext/AppContext";


const Leftside = () => {
    const {user, userData} = useContext(AuthContext);
    const[data,setdata] = useState([]);
    const count = useRef(0);
    
    

  return (
    <div className='flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg'>
        <div className='flex flex-col items-center relative'>
            <img className='h-28 w-full rounded-r-xl' src="/nature.jpg" alt="nature" />
         <div className='absolute -bottom-4'>
            <Tooltip content='profile' placement='top'>
             <Avatar size="md" src={avatar} alt='avatar'></Avatar>
            </Tooltip>
         </div>
        </div>   
        <div className='flex flex-col items-center pt-4'>
            <p className='font-roboto font-bold text-md text-gray-700 no-underline tracking-normal leading-none'>{user?.email || userData?.email}</p>
            <p className='font-roboto font-medium text-xs text-gray-700 no-underline tracking-normal leading-none'>Access exclusive tool & insights</p>
            <p className='font-roboto font-medium text-xs text-gray-700 no-underline tracking-normal leading-none py-2'>Try premium for free</p>
        </div>
        <div className='flex flex-col pl-2'>
            <div className='flex items-center pb-4'>
              <FaMapMarked />
              <p className='font-roboto font-bold text-lg no-underline tracking-normal leading-none ml-2'>Auckland</p>
            </div>  

            <div className='flex items-center pb-4'>
            <MdOutlineWorkOutline />
              <p className='font-roboto font-bold text-lg no-underline tracking-normal leading-none ml-2'>React Developer</p>
            </div>    

            <div className='flex justify-center items-center pt-4 mx-4'>
              <p className='font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2 '>Event</p>
              <p className='font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none'>Group</p>
              <p className='font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none mx-2'>Follow</p>
              <p className='font-roboto font-bold text-md text-[#0177b7] no-underline tracking-normal leading-none'>More</p>
            </div>   
        </div>
        <div className='ml-2'>
          <p className='font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2'>Social Profile</p>
          <div className='flex items-center'>
            <div className='h-1 mb-3 mr-2'><FaFacebook/></div>
            <div className='h-1 mb-3 mr-2'><FaXTwitter/></div>
            <div className='h-1 mb-3 mr-2'><CiLinkedin/></div>
          </div>
        </div>

        
    </div>
  )
}

export default Leftside