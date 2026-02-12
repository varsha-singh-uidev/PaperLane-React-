import React from 'react';
import { Link } from 'react-router-dom';

const MainPageRoute = () => {
  return (
    <>
      <Link to="/mainpage">
        <img 
        src="/icons/homeIcon.svg" 
        alt="home Icon" 
        className='w-[25px] w-[25px] md:w-[30px] md:h-[30px]'
       />
      </Link>
    </>
  )
}

export default MainPageRoute