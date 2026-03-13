import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NotePassword = ({passwordNote, onClose, theme}) => {

  // state for the error in the password
  const [passwordError, setPasswordError] = useState("");

  // state for the image change
  const [isunlocked, setIsUnlocked] = useState(false);

  // state that store the input value
  const [enterPass, setEnterPass] = useState("");

  // navigate to the note Viewer page 
  const navigate = useNavigate();

  // function that check the entered password with the orignal pass and show the error if it was not matched
  function checkPassword(){
    let correctPass = passwordNote.password;
    if(correctPass === enterPass){
      setIsUnlocked(true);
      setTimeout(() => {
        navigate("/noteviewer");
      }, 800)
    }
    else{
      setPasswordError("⚠️ You Entered the Wrong Password");
    }
  }

  // function that handle the input and also set the error
  function inputHandler(e){
    setPasswordError("");
    setEnterPass(e.target.value);
  }

  return (
    <div className={`w-[450px] h-auto p-5 rounded-xl shadow-lg ${theme === "Light" ? "bg-white" : "bg-[#1E1E2F]"}`}>
      <div className='flex flex-col items-center justify-center'>
        <div className={`w-[44px] h-[44px] rounded-full flex items-center justify-center shadow-md ${theme === "Light" ? "bg-black" : "bg-white"}`}>
          <img src={`${isunlocked ? "Cover/unlock.png" : "Cover/lock.png"}`} alt="Lock Note" className="w-8 h-8"/>
        </div>
        <h1 className={`text-[22px] mt-4 ${theme === "Light" ? "" : "text-white"}`}>{passwordNote.title}</h1>
        <p className={`${theme === "Light" ? "text-gray-500" : "text-red-400"}`}>This note is protected</p>
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col my-6'>
          <label htmlFor="checkPassword" className={`text-sm pl-1.5 pb-1.5 ${theme === "Light" ? "text-gray-700" : "text-gray-300"}`}> PassWord </label>
           <input type="password" id=" checkPassword" placeholder=' * * * * * *' value={enterPass} onChange={(e) => inputHandler(e)}
            className={`w-[250px] rounded-sm px-2.5 py-1 border border-[#5B8CFF] placeholder:text-sm focus:outline-none
            ${theme === "Light" ? "bg-[#F2F4F8] text-[#111827] placeholder:text-[#9CA3AF]" : "bg-[#2A2A3B text-white placeholder:text-gray-400]"}`}/>
            <span className={`${passwordError !== "" ? "pl-1.5 text-sm text-red-500 mt-1.5" : ""}`}>{passwordError}</span>
        </div>
         <div className='flex mt-6 gap-10'>
          <button className='bg-[#5B8CFF] text-[#ffffff] rounded-sm px-3 py-1 hover:shadow-[0_10px_30px_rgba(94,139,255,0.6)]
            hover:-translate-y-1 transition-all duration-300' onClick={checkPassword}>Create Note</button>
          <button className='bg-[#D7D7D7] text-[#6B7280] border-[#E6EEFF] rounded-sm px-3 py-1' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default NotePassword