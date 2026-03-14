import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MainPageRoute from './MainPageRoute'


const NoteViewer = () => {
  const location = useLocation();
  const {note} = location.state || {};
  
  // state for the theme of the app
  const [theme, setTheme] = useState("Light");
  
  // get the theme when the page mounts from the localStorage
  useEffect(() => {
    let themeApp = localStorage.getItem("appTheme");
    setTheme(themeApp);
  }, [])

  return (
    <div className={`w-full min-h-screen flex flex-col ${theme === "Light" ? "bg-white" : "bg-[#12121A]"}`}>
      
      {/* top menu bar */}
      <div className="flex items-center justify-between my-[20px] mx-[20px] md:mx-[50px] md:px-[50px]">
        
        {/* home page routing */}
        <MainPageRoute theme={theme} />

        {/* title of the page */}
        <p className={`text-[22px] ${theme === "Light" ? "" : "text-gray-200"}`}>{note.title}</p>

        {/* side bar menu */}
        <div className="flex gap-4">
          <img src={`${theme === "Light" ? "/icons/undo.svg" : "/icons(W)/undo(W).svg"}`} alt=""  className='w-[25px]'/>
          <img src={`${theme === "Light" ? "/icons/redo.svg" : "/icons(W)/redo(W).svg"}`} alt="" className='w-[25px]'/>
          <img src={`${theme === "Light" ? "/icons/saveNote.svg" : "/icons(W)/saveNote(W).svg"}`} alt="" className='w-[25px]'/>
        </div>

      </div>

      <hr className={`${theme === "Light" ? "border-gray-300" : "border-[#2A2A3B]"}`} />

      {/* main content of the page */}
      <div className='p-5'>
        <div className={`flex justify-center gap-2 ${theme === "Light" ? "text-black/25" : "text-gray-200/25"}`}>
          <p>{new Date (note.updatedAt).toLocaleDateString()}</p>
          <p>|</p>
          <p>Saved "logic"</p>
        </div>
      </div>

    </div>
  );
}

export default NoteViewer