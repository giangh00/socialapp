import React from 'react'
import Navbar from "../Navbars/Navbar";
import Leftside from '../../LeftSidebar/Leftside';
import RightSide from '../../RightSidebar/RightSide';
import CardSection from '../../MainPage/CardSection';
import Main from '../../MainPage/Main';
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

      <div className='flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl'>
        <CardSection></CardSection>
        <Main></Main>
      </div>

        <div className='flex-auto w-[20%] right-0 fixed top-14'>
          <RightSide></RightSide>
        </div>
      </div>
    </div>
  )
}

export default Home