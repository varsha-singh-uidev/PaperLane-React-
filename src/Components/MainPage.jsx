import React from 'react'
import MainPageRoute from './MainPageRoute'

const MainPage = () => {
  return (
    <>
      {/* main Conatainer */}
      <div className='w-full h-auto flex flex-col'>

        {/* top menu bar */}
        <div className='flex items-center justify-between my-[20px] mx-[20px] md:mx-[50px] md:px-[50px]'>
          
          {/* home page routing */}
          <MainPageRoute/>

            {/* search bar */}
            <div className='flex w-[200px] md:w-[270px] px-1.5 border border-[#5B8CFF] py-1 rounded-md bg-[#F2F4F8]'>
               <label htmlFor="search" className='flex items-center'>
                <img src="/icons/search.svg" alt="search Icon" className='w-[16px] h-[16px]'/>
               </label>
               <input id='search' type="text" placeholder='Search..' className='pl-2 md:pl-2.5 w-[150px] md:w-[200px] focus:outline-none bg-transparent text-slate-600 opacity-60'/>
            </div>
            <img src="/icons/menu.svg" alt="Menu Icon" className='w-[25px] w-[25px] md:w-[30px] md:h-[30px]'/>
        </div>

        <hr />

        {/* main body of the main page */}
        <div className='mt-[50px] my-[20px] md:mx-[50px] px-[50px]'>

            {/* create new note */}
            <div className='flex flex-col w-[100px] h-[180px] md:w-[160px] md:h-[230px] items-center cursor-pointer group transition'>
              <div className="overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl group-hover:-translate-y-1.5 transition duration-300">
                 <img src="/Cover/cover.png" alt="Create Note" className="rounded-2xl group-hover:scale-105 transition duration-300"/>
              </div>
              <p className="mt-3 text-[12px] md:text-[16px] text-center font-medium text-[#1b2559] group-hover:text-[#5E8BFF] transition">+ Create New Note</p>
            </div>

        </div>
      </div>
    </>
  )
}

export default MainPage

