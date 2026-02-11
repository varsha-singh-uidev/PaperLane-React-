import React, { useState, useEffect } from 'react';
import ButtonComp from './ButtonComp';
import { useNavigate } from 'react-router-dom';

const PopupPage = () => {
    // used to navigate to the mainPage when there is valid value in the localStorage 
    const navigate = useNavigate();

    // storing the user input into the useState
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // if error occur store msg in them
    const [nameError, setNameError] = useState(""); 
    const [emailError, setEmailError] = useState(""); 
    const [passwordError, setPasswordError] = useState("");

    // look into the localStorage when the page loads for the first time
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userDetail"));
        if(!data){
            const userDetail = 
            { userName : "", 
              userEmail : "", 
              userPassword : "", 
              state : false,
            };
            localStorage.setItem("userDetail", JSON.stringify(userDetail));
          }
    }, []);

    // updating the localStorage when the user enter the data into the field and enter to create the account
    function handler(e){
        e.preventDefault();

        // calling the validation on input field
        let hasError = false;

        if(!validateName(name)){
          setNameError("Name atleast 3 character long");
          hasError = true;
        }

        const emailReturn = validateEmail(email);
        if(emailReturn !== true){
          setEmailError(emailReturn);
          hasError = true;
        }
        
        const passwordReturn = validatePassword(password);
        if(passwordReturn !== true){
          setPasswordError(passwordReturn);
          hasError = true;
        }
        // if error occurs at any step stop there not store the data
        if(hasError){
          return;
        }

        // storing the data into the localStorage
        let userDetail = JSON.parse(localStorage.getItem("userDetail")); //read existing one
        userDetail.userName = name;
        userDetail.userEmail = email;
        userDetail.userPassword = password;
        userDetail.state = true;
        localStorage.setItem("userDetail", JSON.stringify(userDetail)); //save updated items in the localStorage

        // set navigate to the main page when there is valid value in the localStorage
        navigate("/mainpage");
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
        return `Email must be at least 6 characters long`;
      }  
      const parts = email.split("@");
      if(parts.length !== 2){
        return "Email must contain one @ seperating local and domain parts";
      }

      const localPart = parts[0];
      const domainPart = parts[1];

      // uppercase check in the whole email
      if(/[A-Z]/.test(email)){
        return "Email should not contain uppercase letters"; 
      }
      // check for the localpart allowed character
      if(!/^[0-9a-z._-]+$/.test(localPart)){
        return "Local part may only contain lowercase letters, numbers, dots, hyphens and underscores";
      }
      // check if the domain contain the consecutive dots
      if(domainPart.includes("..")){
        return "Domain part of email must not contain consecutive dots";
      }
      // check the domain structure and also check it must contain one dot before the extension
      if(!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domainPart)){
        return "Domain must contain a dot and valid extension";
      }
      // check if the domain start or end with the dot or hyphen.
      if(/^[-.]/.test(domainPart) || /[-.]$/.test(domainPart)){
        return "Domain must not start or end with a dot or hyphen";
      }
      return true;
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
    // full background
    <div className="relative w-full h-screen overflow-hidden  bg-gradient-to-b from-[#C7B8F3] via-[#E6EEFF] to-[#FCFCFF]">
      {/* background glowup */}
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

              {/* name input */}
              <div className='flex flex-col'>
                <label htmlFor="Name" className='text-[#7A8194] pl-[15px]'>Name</label>
                <input id='Name' 
                type="text" required 
                value={name} 
                onChange={(e)=>{setName(e.target.value), setNameError("")}} 
                className={`not-only:border w-[300px] pl-[20px] py-[4px] rounded-lg transition 
                ${nameError 
                ? "border-red-500 focus:border-red-500 focus:ring-red-300" 
                : "border-[#E4E8F2] focus:border-[#5E8BFF] focus:ring-[#5B8CFF]/20 bg-blue-100/60"} 
                focus:ring-1 focus:outline-none`}/>
                <span className={`text-[12px] ${nameError ? "text-red-500": ""}`}>{nameError}</span>
              </div>

              {/* email input */}
              <div className='flex flex-col'>
                <label htmlFor="Email" className='text-[#7A8194] pl-[15px]'>Email</label>
                <input id='Email' 
                type="email" required 
                value={email} 
                onChange={(e) => {setEmail(e.target.value), setEmailError("")}} 
                className={` not-only:border w-[300px] pl-[20px] py-[4px] rounded-lg transition 
                ${emailError 
                ? "border-red-500 focus:border-red-500 focus:ring-red-300" 
                : "border-[#E4E8F2] focus:border-[#5E8BFF] focus:ring-[#5B8CFF]/20 bg-blue-100/60"} 
                focus:ring-1 focus:outline-none`}/>
                <span className={`text-[12px] ${emailError ? "text-red-500": ""}`}>{emailError}</span>
              </div>

              {/* password input */}
              <div className='flex flex-col'>
                <label htmlFor="Password" className='text-[#7A8194] pl-[15px]'>Password</label>
                <input id='Password' 
                type="password" required 
                value={password} 
                onChange={(e) => {setPassword(e.target.value), setPasswordError("")}} 
                className={`not-only:border w-[300px] pl-[20px] py-[4px] rounded-lg transition 
                ${passwordError 
                ? "border-red-500 focus:border-red-500 focus:ring-red-300" 
                : "border-[#E4E8F2] focus:border-[#5E8BFF] focus:ring-[#5B8CFF]/20 bg-blue-100/60"} 
                focus:ring-1 focus:outline-none`}/>
                <span className={`text-[12px] ${passwordError ? "text-red-500": ""}`}>{passwordError}</span>
              </div>

             </div>
            
            {/* button */}
              <ButtonComp text="Create Account"/>
          </form>

        </div>

    </div>
  )
}

export default PopupPage