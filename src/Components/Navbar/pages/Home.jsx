import React from 'react'
import Navbar from "../Navbars/Navbar";
import Leftside from '../../LeftSidebar/Leftside';

const Home = () => {
  return (
    <div className=' w-full'>
      <div className=' fixed top-0 z-10 w-full bg-white'>
       <Navbar></Navbar>
      </div>
      <div className='flex bg-gray-100'>
        <div className='flex-auto w-[20%] fixed top-14'>
          <Leftside></Leftside>
        </div>
      </div>
    </div>
  )
}

export default Home