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
  }, []);

  return (
    <div className={`w-full min-h-screen flex flex-col ${theme === "Light" ? "bg-white" : "bg-[#12121A]"}`}>
      
      {/* top menu bar */}
      <div className="flex items-center justify-between my-[20px] mx-[20px] md:mx-[50px] md:px-[50px]">
        
        {/* home page routing */}
        <MainPageRoute theme={theme} />

        {/* title of the page */}
        <p className={`text-[22px] ${theme === "Light" ? "" : "text-gray-200"}`}>{note.title}</p>

        {/* side bar menu */}
        <div className="flex w-[150px] items-center justify-between">
          <img src={`${theme === "Light" ? "/icons/undo.svg" : "/icons(W)/undo(W).svg"}`} alt=""  className='w-[25px]'/>
          <img src={`${theme === "Light" ? "/icons/redo.svg" : "/icons(W)/redo(W).svg"}`} alt="" className='w-[25px]'/>
          <img src={`${theme === "Light" ? "/icons/saveNote.svg" : "/icons(W)/saveNote(W).svg"}`} alt="" className='w-[25px]'/>
        </div>

      </div>

      <hr className={`${theme === "Light" ? "border-gray-300" : "border-[#2A2A3B]"}`} />

      {/* show the date of the page */}
      <div className='p-5'>
        <div className={`flex justify-center gap-2 ${theme === "Light" ? "text-black/25" : "text-gray-200/25"}`}>
          <p>{new Date (note.updatedAt).toLocaleDateString("en-US",{
                month : "long",
                day : "numeric",
                year : "numeric"
              })}
          </p>
          <p>|</p>
          <p>Saved "logic"</p>
        </div>
      </div>

      {/* main note content */}
      <div className="flex-1 w-full px-6 md:px-20 py-4 pb-28 overflow-y-auto">
        <div
        contentEditable
        suppressContentEditableWarning={true}
        className={`outline-none w-full min-h-[50vh] text-[16px] leading-7
        ${theme === "Light" ? "bg-white text-black" : "bg-[#12121A] text-gray-200"}`}
        placeholder="Start writing..."
        >
        </div>
      </div>

      {/* action bar */}
      <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 w-[80%] md:w-[850px] z-50`}>
        <div className={`rounded-xl py-4 px-6 flex items-center justify-between ${theme === "Light" ? "bg-gray-200" : "bg-[#2A2A3B]"}`}>

          {/* left side tool bold itlaic underline */}
          <div className='flex w-[120px] items-center justify-between'>
            <button><img className='h-[25px]' src={`${theme === "Light" ? "/homePage/bold.svg" : "/homePage/bold(W).svg"}`} alt="bold icon" /></button>
            <button><img className='h-[33px]' src={`${theme === "Light" ? "/homePage/italic.svg" : "/homePage/italic(W).svg"}`} alt="italic icon" /></button>
            <button><img className='h-[32px]' src={`${theme === "Light" ? "/homePage/underLine.svg" : "/homePage/underLine(W).svg"}`} alt="underline icon" /></button>
          </div>

          {/* transformation of letter */}
          <div className='flex gap-[0.85px]'>
            <button className='w-[35px] h-[30px] flex items-center px-1 rounded-bl-sm rounded-tl-sm bg-[#ECECEC]'><img className='w-[25px]' src="/homePage/changeLetter.svg" alt="" /></button>
            <button className='w-[20px] h-[30px] flex items-center px-1 rounded-br-sm rounded-tr-sm bg-[#ECECEC]'><img src="/icons/dropdown.svg" alt="dropdown for the text transformation" /></button>
          </div>

          {/* transformation of font size */}
          <div className='flex gap-[0.85px]'>
            <button className='w-[35px] h-[30px] flex items-center px-1 rounded-bl-sm rounded-tl-sm bg-[#ECECEC] font-bold text-[20px] text-black/85'>18</button>
            <button className='w-[20px] h-[30px] flex items-center px-1 rounded-br-sm rounded-tr-sm bg-[#ECECEC]'><img src="/icons/dropdown.svg" alt="Drop down option for the text fontSize" /></button>
          </div>

          {/* transformation of text Color */}
          <div>
            <button className='w-[35px] h-[30px] flex items-center justify-center rounded-sm bg-[#ECECEC]'><img className='h-[25px]' src="/homePage/textColor.png" alt="text Color Change Icon" /></button>
          </div>

          {/* transformation of text highlight */}
          <div>
            <button className='w-[35px] h-[30px] flex items-center justify-center rounded-sm bg-[#ECECEC]'><img className='h-[25px]' src="/homePage/highlight.svg" alt="Highlighter Icon" /></button>
          </div>

          {/* transformation of formatting points */}
          <div className='flex gap-[0.85px]'>
            <button className='w-[35px] h-[30px] flex items-center px-1 rounded-bl-sm rounded-tl-sm bg-[#ECECEC]'><img className='w-[25px]' src="/homePage/point1.svg" alt="" /></button>
            <button className='w-[20px] h-[30px] flex items-center px-1 rounded-br-sm rounded-tr-sm bg-[#ECECEC]'><img src="/icons/dropdown.svg" alt="dropdown for the text transformation" /></button>
          </div>

           {/* transformation of formatting numeric and alphabetic */}
          <div className='flex gap-[0.85px]'>
            <button className='w-[35px] h-[30px] flex items-center px-1 rounded-bl-sm rounded-tl-sm bg-[#ECECEC]'><img className='' src="/homePage/nopoint1.svg" alt="" /></button>
            <button className='w-[20px] h-[30px] flex items-center px-1 rounded-br-sm rounded-tr-sm bg-[#ECECEC]'><img src="/icons/dropdown.svg" alt="dropdown for the text transformation" /></button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default NoteViewer