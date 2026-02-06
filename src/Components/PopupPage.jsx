import React from 'react'
import { useState, useEffect } from 'react';
const PopupPage = () => {
    // setting for the local Storage
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("userDetail"));
        console.log("data",data);
        if(data === null){
            let userDetail = {userName : "", userEmail : "", state : false}
            localStorage.setItem("userDetail", JSON.stringify(userDetail));
        }
    }, [])
    const[name,setName] = useState("");
    const[email, setEmail] = useState("");
    function handler(e){
        e.preventDefault();
        let userDetail = JSON.parse(localStorage.getItem("userDetail")); //read existing one
        userDetail.userName = name;
        userDetail.userEmail = email;
        userDetail.state = true;
        localStorage.setItem("userDetail", JSON.stringify(userDetail)); //save updated items in the localStorage
        let data = JSON.parse(localStorage.getItem("userDetail"));
        console.log("data1",data.state);
    }
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#C7B8F3] via-[#E6EEFF] to-[#FCFCFF]">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#AFA0FF] opacity-25 blur-[80px] rounded-full"></div>
        <div className="absolute -bottom-1 -right-2 w-[450px] h-[450px] bg-[#5E8BFF] opacity-25 blur-[100px] rounded-full"></div>
        {/* set the pop up card in the center of the page */}
        <div className='flex justify-center items-center h-screen'>
          <form 
            className='flex flex-col justify-center items-center border-1 w-[420px] h-[500px] rounded-2xl bg-[#F2F2F2]'
            onSubmit={(e) => handler(e)}>
            {/* image with text */}
            <div>
                <img className="w-[40px] h-[40px]" src="/icons/icon.png" alt="PaperLane icon" />
                <h1>Create Your Space</h1>
            </div>
            <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button>Click</button>
          </form>
        </div>
    </div>
  )
}

export default PopupPage