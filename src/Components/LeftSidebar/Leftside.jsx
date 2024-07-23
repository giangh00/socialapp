import React from 'react'
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

const Leftside = () => {
  return (
    <div className='flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg'>
        <div className='flex flex-col items-center relative'>
            <img className='h-28 w-full rounded-r-xl' src="/ava.jpg" alt="nature" />
        </div>
        <div className='absolute -bottom-4'>
            <Tooltip content='profile' placement='top'>
                <Avatar size="md" src='/ava.jpg' alt='avatar'></Avatar>
            </Tooltip>
        </div>
    </div>
  )
}

export default Leftside