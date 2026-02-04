import React from 'react'

const LandPage = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-gradient-to-b from-[#C7B8F3] via-[#E6EEFF] to-[#FCFCFF]'>
        <div className='flex flex-col justify-center items-center '>
            <h4 className='text-[#5A648C]'>A calm place to think</h4>
            <h1 style={{fontFamily: "Pacifico"}} className='text-[#1B2559]'>Paperlane</h1>
            <h3 className='text-[#6B7396]'>From fleeting sparks to polished plans,<br/> Paperlane turns every note into a journey worth keeping.</h3>
            <button className='text-[#ffffff] bg-[#5E8BFF] p-[10px] rounded-[50px] w-[150px]'>Add Note</button>
        </div>
    </div>
  )
}

export default LandPage