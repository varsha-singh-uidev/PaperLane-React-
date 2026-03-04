import React, { useState } from 'react'

const Hamburger = ({menuClose,clearAllHandler}) => {
  const [clearPopUp, setClearPopUp] = useState(false);
  return (
    <>
    <div className='absolute -right-5 mt-2 mr-2 w-[160px] bg-white rounded-md shadow-lg z-50'>
      <ul className='flex flex-col gap-2 p-2 text-gray-700 cursor-pointer'>
       <li className='px-3 py-2 hover:bg-gray-100 rounded hover:text-blue-400'>Settings</li>
       <li className='px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded'>Export</li>
       <li className='px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded' onClick={() => setClearPopUp(true)}>Clear All note</li>
       <li className='px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded'>Sort</li>
       <li className='px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded'>Filter</li>
      </ul>
    </div>
       {/* this popup open to take the user input related to clear All the Note  */}
        {clearPopUp && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-50'>
        <div className='bg-white p-6 rounded-md shadow-lg'>
          <p>Are you sure you want to delete all notes?</p>  
          <div className='flex justify-between px-2 mt-4 w-full cursor-pointer'>
            <button className='bg-gray-500 px-2 py-1 text-white rounded-md cursor-pointer hover:bg-gray-600' onClick={() => {setClearPopUp(false)}}>Cancel</button>
            <button className='bg-red-600 px-2 py-1 rounded-md text-white cursor-pointer hover:bg-red-700' onClick={() => {clearAllHandler(); menuClose(); setClearPopUp(false)}}>Delete</button>
          </div>
        </div>
        </div>
       )}
    </>
  )
}

export default Hamburger