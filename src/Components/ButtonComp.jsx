import React from 'react'

const ButtonComp = ({text}) => {
  return (
    <>
      <button
          className="text-white bg-[#5E8BFF] px-10 py-3 rounded-full font-medium
            shadow-[0_12px_30px_rgba(94,139,255,0.4)]
            hover:shadow-[0_18px_45px_rgba(94,139,255,0.6)]
            hover:-translate-y-1 transition-all duration-300 ">
          {text}
      </button>
    </>
  )
}

export default ButtonComp