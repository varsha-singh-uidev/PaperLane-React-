// import React from 'react'

// const MainPage = () => {
//   return (
//     <>
//       {/* main Conatainer */}
//       <div className='w-full h-auto flex flex-col'>
//         {/* top menu bar */}
//         <div className='flex items-center justify-between my-[20px] mx-[50px] px-[50px]'>
//             <img src="/icons/homeIcon.svg" alt="home Icon" className='w-[30px] h-[30px]'/>
//             {/* search bar */}
//             <div className='flex w-[270px] px-1.5 border border-[#5B8CFF] py-1 rounded-md bg-[#F2F4F8]'>
//                <label htmlFor="search" className='flex items-center'>
//                 <img src="/icons/search.svg" alt="search Icon" className='w-[16px] h-[16px]'/>
//                </label>
//                <input id='search' type="text" placeholder='Search..' className='px-2.5 focus:outline-none bg-transparent text-slate-600 opacity-60'/>
//             </div>
//             <img src="/icons/menu.svg" alt="Menu Icon" className='w-[30px] h-[30px]'/>
//         </div>
//         <hr />
//         {/* main body of the main page */}
//         <div className='mt-[50px] my-[20px] mx-[50px] px-[50px]'>
//             {/* create new note */}
//             <div className='flex flex-col w-[150px] h-[200px] items-center'>
//               <img src="/Cover/cover.png" className='rounded-xl'/>
//               <p className='mt-2'>New Note</p>
//             </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default MainPage

import React from 'react'

const MainPage = () => {

  function handleCreateNote(){
    console.log("Create new note clicked");
    // later → open modal OR navigate to note editor
  }

  return (
    <div className='w-full h-auto flex flex-col'>

      {/* top menu */}
      <div className='flex items-center justify-between my-[20px] mx-[50px] px-[50px]'>
        <img src="/icons/homeIcon.svg" alt="home Icon" className='w-[30px] h-[30px]'/>

        {/* search */}
        <div className='flex w-[270px] px-1.5 border border-[#5B8CFF] py-1 rounded-md bg-[#F2F4F8]'>
          <label htmlFor="search" className='flex items-center'>
            <img src="/icons/search.svg" alt="search Icon" className='w-[16px] h-[16px]'/>
          </label>
          <input
            id='search'
            type="text"
            placeholder='Search..'
            className='px-2.5 focus:outline-none bg-transparent text-slate-600 opacity-60'
          />
        </div>

        <img src="/icons/menu.svg" alt="Menu Icon" className='w-[30px] h-[30px]'/>
      </div>

      <hr />

      {/* body */}
      <div className='mt-[50px] my-[20px] mx-[50px] px-[50px]'>

        {/* create note card */}
        <div
          onClick={handleCreateNote}
          className='flex flex-col w-[160px] h-[230px] items-center 
                     cursor-pointer group transition'
        >

          <div className='overflow-hidden rounded-2xl shadow-md
                          group-hover:shadow-xl
                          group-hover:-translate-y-2
                          transition duration-300'>

            <img
              src="/Cover/cover.png"
              alt="Create Note"
              className='rounded-2xl group-hover:scale-105 transition duration-300'
            />

          </div>

          <p className='mt-3 font-medium text-[#1b2559] group-hover:text-[#5E8BFF] transition'>
            + Create New Note
          </p>

        </div>
      </div>
    </div>
  )
}

export default MainPage
