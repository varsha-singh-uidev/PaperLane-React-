import React from 'react'

const Hamburger = ({menuClose}) => {
  return (
    <>
    <div className='absolute -right-5 mt-2 mr-2 w-[160px] bg-white rounded-md shadow-lg z-50'>
      <ul className='flex flex-col gap-2 p-2 text-gray-700 cursor-pointer'>
       <li className='px-3 py-2 hover:bg-gray-100 rounded hover:text-blue-400'>Settings</li>
       <li className='px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded'>Export</li>
       <li className='px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded'>Clear All note</li>
       <li className='px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded'>Sort</li>
       <li className='px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded'>Filter</li>
      </ul>
    </div>
    </>
  )
}

export default Hamburger