import React from 'react'

const CreateNoteModal = () => {
  return (
    <>
      <div className='flex w-[500px] flex-col justify-center items-center shadow-2xl rounded-4xl p-6'>
        {/* image with text */}
        <div className='flex flex-col items-center'>
          <img className="w-[40px] h-[40px]" src="/icons/icon.png" alt="PaperLane icon" />
          <h1 className='text-[22px] font-semibold text-[#1b2559]'>Create Note</h1>
        </div>

        {/* take the note title input */}
        <input 
        type="text" 
        placeholder='Note Title' 
        className='bg-[#F2F4F8] w-[200px] rounded-sm px-2.5 py-1 border border-[#5B8CFF] text-[#111827] placeholder:text-[#9CA3AF] my-5 focus:outline-none'
        />

        {/* choose the note cover */}
        <div>
          <p className='text-[20px]'>Note Cover</p>
          {/* option of different cover */}
          <ul className='flex gap-5 my-4'>
            <li><img src="Cover/cover.png" alt="cover"  className='w-[45px] h-[45px]'/></li>
            <li><img src="Cover/cover1.png" alt="cover" className='w-[45px] h-[45px]'/></li>
            <li><img src="Cover/cover2.png" alt="cover" className='w-[45px] h-[45px]'/></li>
            <li><img src="Cover/cover7.png" alt="cover" className='w-[45px] h-[45px]'/></li>
          </ul>
        </div>

        {/* option button */}
        <div className='flex mt-6 gap-10'>
          <button className='bg-[#5B8CFF] text-[#ffffff] rounded-sm px-3 py-1'>Create Note</button>
          <button className='bg-[#D7D7D7] text-[#6B7280] border-[#E6EEFF] rounded-sm px-3 py-1'>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default CreateNoteModal