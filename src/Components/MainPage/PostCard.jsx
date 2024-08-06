import React from 'react'
import Avatar from '@mui/material/Avatar';
import avatar from '../../images/ava.jpg';
import { saveAs } from 'file-saver';


const PostCard = ({uid, id, logo, name, email, text, image, timestamp}) => {
    const supportedFileTypes = ['image/png', 'image/jpeg', 'image/gif'];
    const handleImageDownload = async () => {
        if (!image) return; // Handle no image scenario
      
        const blob = new Blob([image], { type: 'image/png' }); // Assuming PNG format
        const fileType = blob.type; // Get actual file type
      
        // Check for supported types (e.g., image/png, image/jpeg)
        if (!supportedFileTypes.includes(fileType)) {
          console.error('Unsupported file type:', fileType);
          
          return; // Handle unsupported type
        }
      
        saveAs(blob, 'image.png'); // Use fileType if needed
      };
  return (
    <div className='mb-4'>
        <div className='flex flex-col py-4 bg-white rounded-t-3xl'>
            <div className='flex items-center pb-4 ml-2'>
               <Avatar sizes='sm' variant='circular' src={logo || avatar} alt='avatar'></Avatar>
               <div className='flex flex-col'>
                <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
                    {email}
                </p>
                <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
                    Published:{timestamp}
                </p>
               </div>
            
            </div>
            <div>
                <p className='ml-4 pb-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
                    {text}
                </p>
                {image && <img className='h-[500px] w-full' src={image} alt='PostImage'></img>}
            </div>
            <div className='flex justify-around pt-4'>
            <button onClick={handleImageDownload}>Download</button>

            </div>
        </div>
    </div>
  )
}

export default PostCard