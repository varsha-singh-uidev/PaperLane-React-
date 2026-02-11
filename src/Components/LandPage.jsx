import React from "react";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import ButtonComp from "./ButtonComp";

const LandPage = () => {
  // check the value in the localStorage for the navigation
  const[page, setPage] = useState(false);
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userDetail"));
    if(data?.state){
      setPage(true); 
    }
  }, []);

  return (
    // Main Background of the page
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#C7B8F3] via-[#E6EEFF] to-[#FCFCFF]">

      {/* Background glows */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#AFA0FF] opacity-25 blur-[80px] rounded-full"></div>
      <div className="absolute -bottom-1 -right-2 w-[450px] h-[450px] bg-[#5E8BFF] opacity-25 blur-[100px] rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center translate-y-[-10px] text-center px-4">

        {/* Upper text */}
        <h4 className="mb-8 text-[#5A648C] text-sm tracking-widest font-light opacity-70">
          Your Thoughts Deserve Space
        </h4>

        {/* Logo */}
        <h1
          style={{ 
            fontFamily: "Pacifico",
            textShadow: "4px 5px 5px rgba(0,0,0,0.2)"  
          }}
          className="text-[#1B2559] text-7xl md:text-8xl lg:text-9xl drop-shadow-[0_24px_48px_rgba(27,37,89,0.18)]">
          Paperlane
        </h1>

        {/* Description */}
        <p className="my-14 text-[#6B7396] text-base md:text-lg max-w-xl leading-relaxed font-light opacity-90">
          From fleeting sparks to polished plans,
          <br />
          Paperlane turns every note into a journey worth keeping.
        </p>

        {/* button */}
        <Link to={page? "/mainpage" :"/popup"}>
         <ButtonComp text="Start Writing"/>
        </Link>
      </div>
    </div>
  );
};

export default LandPage;
