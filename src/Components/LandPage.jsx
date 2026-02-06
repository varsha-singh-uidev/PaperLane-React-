import React from "react";
import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
const LandPage = () => {
  const[page, setPage] = useState(false);
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userDetail"));
    console.log("inside the landPage",data?.state);
    if(data?.state){
      setPage(true); 
    }
  }, [])
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
        <p className="mt-14 text-[#6B7396] text-base md:text-lg max-w-xl leading-relaxed font-light opacity-90">
          From fleeting sparks to polished plans,
          <br />
          Paperlane turns every note into a journey worth keeping.
        </p>

        {/* button */}
        <Link to={page? "/mainpage" :"/popup"}>
         <button
          className="mt-10 text-white bg-[#5E8BFF] px-10 py-3 rounded-full font-medium
            shadow-[0_12px_30px_rgba(94,139,255,0.4)]
            hover:shadow-[0_18px_45px_rgba(94,139,255,0.6)]
            hover:-translate-y-1 transition-all duration-300 ">
          Start writing
        </button>
        </Link>
      </div>
    </div>
  );
};

export default LandPage;
