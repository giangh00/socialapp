import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const PostCard = ({ uid, id, logo, name, email, text, pdf, timestamp }) => {
  // Set the worker source for pdf.js
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <div className='mb-4'>
      <div className='flex flex-col py-4 bg-white rounded-t-3xl'>
        <div className='flex items-center pb-4 ml-2'>
          <div className='flex flex-col'>
            <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              {email}
            </p>
            <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              Published: {timestamp}
            </p>
          </div>
        </div>
        <div>
          <p className='ml-4 pb-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
            {text}
          </p>
          {/* Render PDF if available */}
          
        </div>
        <div className='flex justify-around pt-4'>
          {/* Conditionally show download button for PDF */}
          {pdf && (
            <a href={pdf} download>
              <button>Download PDF</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
