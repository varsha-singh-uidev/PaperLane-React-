import React from 'react';
import { Link } from 'react-router-dom';

const MainPageRoute = ({theme}) => {
  return (
    <>
      <Link to="/mainpage">
        <img 
        src={`${theme === "Light" ? "/icons/homeIcon.svg" : "/icons(W)/homeIcon(W).svg"}`}
        alt="home Icon" 
        className='w-[25px] w-[25px] md:w-[30px] md:h-[30px]'
       />
      </Link>
    </>
  )
}

export default MainPageRoute