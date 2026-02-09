import React from 'react'
import { useState, useEffect } from 'react';
import ButtonComp from './ButtonComp';

const PopupPage = () => {

    // look into the localStorage when the page loads for the first time
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("userDetail"));
        console.log("data",data);
        if(data === null){
            let userDetail = {userName : "", userEmail : "", userPassword : "", state : false}
            localStorage.setItem("userDetail", JSON.stringify(userDetail));
        }
    }, []);
    // storing the user input into the useState
    const[name,setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    // updating the localStorage when the user enter the data into the field and enter to create the account
    function handler(e){
        e.preventDefault();
        // calling the validation on input field
        if(!validateName(name)){
          console.log("Error in Name");
        }
        if(!validateEmail(email)){
          console.log("Error in email");
        }
        if(!validatePassword(password)){
          console.log("Error in password");
        }
        // storing the data into the localStorage
        let userDetail = JSON.parse(localStorage.getItem("userDetail")); //read existing one
        userDetail.userName = name;
        userDetail.userEmail = email;
        userDetail.userPassword = password;
        userDetail.state = true;
        localStorage.setItem("userDetail", JSON.stringify(userDetail)); //save updated items in the localStorage
        let data = JSON.parse(localStorage.getItem("userDetail"));
        console.log("data",data);
    }
    // function for the name validation
    function validateName(name){
      let validName = name.trim();
      if(validName.length >= 3){
        return true;
      }else{
        return false;
      }
    }
    
    // function for the email validation
    function validateEmail(email){
      if(email.length < 6){
        return `Email atleast 6 character long`;
      }else{
        let emailArr = email.split("@");
        if(emailArr.length < 2){
          return `Email either missing the domain or local part`;
        }else{
          if(emailArr[1].includes('..')){
            return `Email contain consequtive (..) in domain part`;
          }else if(/[A-Z]/.test(email)){
            return `Email should not contain upperCase character`;
          }
        }
      }  
    }
    
    // function for the password validation
    function validatePassword(password){
      if(password.length < 8){
        return `Password is atleast of 8 character`;
      }else if(!(/^.*[0-9].*$/.test(password))){
        return `Password must contain Atleast one number`;
      }else if(!(/^.*[A-Z].*$/.test(password))){
        return `Password must contain Alteast One upperCase character`;
      }else if(!(/^.*[a-z].*$/.test(password))){
        return `Password must contain Alteast One lowerCase character`;
      }else if(!(/^.*[@#$%^&*.,].*$/.test(password))){
        return `Password must contain Alteast One special character`;
      }else{
        return true;
      }
    }

  return (
    <div className="relative w-full h-screen overflow-hidden  bg-gradient-to-b from-[#C7B8F3] via-[#E6EEFF] to-[#FCFCFF]">
        <div className="absolute -top-24 -left-24 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-[#AFA0FF] opacity-15 blur-[80px] rounded-full"></div>
        <div className="absolute -bottom-1 -right-2 w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] bg-[#5E8BFF] opacity-15 blur-[100px] rounded-full"></div>

        {/* set the pop up card in the center of the page */}
        <div className='flex justify-center items-center h-screen'>
          <form 
            className='flex flex-col justify-center items-center w-[400px] rounded-3xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl p-[40px] gap-[40px]'
            onSubmit={(e) => handler(e)}>
            {/* image with text */}
            <div className='flex flex-col items-center'>
                <img className="w-[40px] h-[40px]" src="/icons/icon.png" alt="PaperLane icon" />
                <h1 className='text-[22px] font-semibold text-[#1b2559]'>Create Your Space</h1>
            </div>

            {/* input fields */}
             <div className='flex flex-col gap-[20px]'>
              <div className='flex flex-col'>
                <label htmlFor="Name" className='text-[#7A8194] pl-[15px]'>Name</label>
                <input id='Name' type="text" required value={name} onChange={(e)=>setName(e.target.value)} className='bg-white border border-[#E4E8F2] w-[300px] pl-[20px] py-[4px] rounded-lg focus:border-[#5E8BFF] focus:ring-[#5B8CFF]/20 focus:ring-1 focus:outline-none transition'/>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="Email" className='text-[#7A8194] pl-[15px]'>Email</label>
                <input id='Email' type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className='bg-white border border-[#E4E8F2] w-[300px] pl-[20px] py-[4px] rounded-lg focus:border-[#5E8BFF] focus:ring-[#5B8CFF]/20 focus:ring-1 focus:outline-none transition'/>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="Password" className='text-[#7A8194] pl-[15px]'>Password</label>
                <input id='Password' type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className='bg-white border border-[#E4E8F2] w-[300px] pl-[20px] py-[4px] rounded-lg focus:border-[#5E8BFF] focus:ring-[#5B8CFF]/20 focus:ring-1 focus:outline-none transition'/>
              </div>
             </div>

            <ButtonComp text="Create Account"/>

          </form>
        </div>
    </div>
  )
}

export default PopupPage