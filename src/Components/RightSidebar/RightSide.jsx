import React, { useState } from 'react'

const RightSide = () => {
  const [input, setInput] = useState("");
    return (
    <div className='flex flex-col h-screen bg-white shadow-lg border-2 rounded-l-xl'>
        <div className='flex flex-col items-center relative pt-10'>
            <img className='h-48 rounded-md' src="./nature.jpg" alt="water" />
        </div>
        <p className='font-roboto font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-2 mx-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae deserunt dolor quaerat quibusdam tenetur
             tempora ullam perspiciatis non,
             suscipit atque vitae natus fugit ratione voluptates eaque obcaecati soluta ab. Perferendis?
        </p>

        <div className='mx-2 mt-10'>
            <p className='font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>Friends: </p>
            <input 
            className='border-0 outline-none'
            name='input' 
            value={input} 
            placeholder='Search Friend'
            type='text'
            onChange={(e) => setInput(e.target.value)}/>
        </div>

    </div>
  )
}

export default RightSide