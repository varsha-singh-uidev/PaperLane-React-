import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MainPageRoute from './MainPageRoute'


const NoteViewer = () => {
  const location = useLocation();
  const {note} = location.state || {};
  
  // state for the theme of the app
  const [theme, setTheme] = useState("Light");

  // add the state to show the test of start writting
  const [content, setContent] = useState("");

  // state to show the option for the text transformation
  const [text, setText] = useState(false);
  const [showText, setShowText] = useState("");
  
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
        onInput={(e) => setContent(e.currentTarget.innerText)}
        className={`outline-none w-full min-h-[50vh] text-[16px] leading-7 relative
        ${theme === "Light" ? "bg-white text-black" : "bg-[#12121A] text-gray-200"}`}
        >
        {content === "" && (
          <span className="absolute top-0 left-0 text-gray-400 pointer-events-none">
            Start Writting...
          </span>
        )}
        </div>
      </div>     

    {/* action bar */}
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[95%] md:w-[900px] z-50">
    <div className={`rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg backdrop-blur-md
    ${theme === "Light"  ? "bg-white/90 border border-gray-200"  : "bg-[#1A1A2B]/90 border border-[#2A2A3B]"  }`}  >

    {/* reusable button style */}
    {/** size is the key fix */}
    
    {/* TEXT STYLE */}
    <div className="flex items-center gap-3">
      <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-[#2A2A3B] transition">
        <img className="h-[18px]" src={`${theme === "Light" ? "/homePage/bold.svg" : "/homePage/bold(W).svg"}`} />
      </button>
      <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-[#2A2A3B] transition">
        <img className="h-[22px]" src={`${theme === "Light" ? "/homePage/italic.svg" : "/homePage/italic(W).svg"}`} />
      </button>
      <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-[#2A2A3B] transition">
        <img className="h-[22px]" src={`${theme === "Light" ? "/homePage/underLine.svg" : "/homePage/underLine(W).svg"}`} />
      </button>
    </div>

    <div className="h-6 w-[1px] bg-gray-300 dark:bg-[#2A2A3B]" />

    {/* FONT CONTROLS */}
    <div className="flex items-center gap-3">

    <div className={`flex items-center rounded-lg border relative
    ${theme === "Light" ? "bg-white border-gray-700" : "bg-[#2A2A3B] border-[#3A3A4A]" }`}
    onClick={() => setText(prev => !prev)}>
     <button className={`cursor-pointer px-3 py-1 text-sm ${theme === "Light" ? "" : "text-[#D5D5D7]"}`}> Aa </button>
     <button className={`cursor-pointer px-2 flex items-center justify-center`} >
      <img src={theme === "Light" ? "/icons/dropdown.svg" : "/icons(W)/dropdown(W).svg"} className="w-3 h-3 object-contain"/>
     </button>
     {text && (
      <div className='flex flex-col absolute bottom-12 left-0 bg-amber-200 z-100'>
        <button>UpperCase</button>
        <button>LowerCase</button>
        <button>Capitalize</button>
      </div>
     )}
    </div>

    <div className={`flex items-center rounded-lg border overflow-hidden
    ${theme === "Light" ? "bg-white border-gray-700" : "bg-[#2A2A3B] border-[#3A3A4A]" }`}>
     <button className={`cursor-pointer px-3 py-1 text-sm ${theme === "Light" ? "" : "text-[#D5D5D7]"}`}> 18 </button>
     <button className={`cursor-pointer px-2 flex items-center justify-center`} >
      <img src={theme === "Light" ? "/icons/dropdown.svg" : "/icons(W)/dropdown(W).svg"} className="w-3 h-3 object-contain"/>
     </button>
    </div>
    </div>

    <div className="h-6 w-[1px] bg-gray-300 dark:bg-[#2A2A3B]" />

    {/* COLOR */}
    <div className="flex items-center gap-3">
      <button className={`w-10 h-10 flex items-center justify-center border rounded-lg cursor-pointer ${theme === "Light" ? "border-gray-700 hover:bg-gray-200" : " hover:bg-[#3A3A4A] bg-[#2A2A3B] border-[#3A3A4A]"}`}>
        <img src={`${theme === "Light" ? "/homePage/textColor.png" : "/homePage/textColor(W).png"}`} className="w-5 h-5 object-contain" />
      </button>
      <button className={`w-10 h-10 flex items-center justify-center border rounded-lg cursor-pointer ${theme === "Light" ? "border-gray-700 hover:bg-gray-200" : " hover:bg-[#3A3A4A] bg-[#2A2A3B] border-[#3A3A4A]"}`}>
        <img src={`${theme === "Light" ? "/homePage/highlight.svg" : "/homePage/highlight(W).png"}`} className="w-5 h-5 object-contain" />
      </button>
    </div>

    <div className="h-6 w-[1px] bg-gray-300 dark:bg-[#2A2A3B]" />

    {/* LIST */}
    <div className="flex items-center gap-3">
      <button className={`w-10 h-10 flex items-center justify-center border rounded-lg cursor-pointer ${theme === "Light" ? "border-gray-700 hover:bg-gray-200" : " hover:bg-[#3A3A4A] bg-[#2A2A3B] border-[#3A3A4A]"}`}>
        <img src={`${theme === "Light" ? "/homePage/point1.svg" : "/homePage/point1(W).svg"}`} className="w-5 h-5 object-contain" />
      </button>
      <button className={`w-10 h-10 flex items-center justify-center border rounded-lg cursor-pointer ${theme === "Light" ? "border-gray-700 hover:bg-gray-200" : " hover:bg-[#3A3A4A] bg-[#2A2A3B] border-[#3A3A4A]"}`}>
        <img src={`${theme === "Light" ? "/homePage/nopoint1.svg" : "/homePage/nopoint1(W).svg"}`} className="w-5 h-4 object-contain" />
      </button>
    </div>

    <div className="h-6 w-[1px] bg-gray-300 dark:bg-[#2A2A3B]" />

    {/* SETTINGS */}
    <button className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-[#2A2A3B]">
      <img
        src={theme === "Light" ? "/homePage/option.svg" : "/homePage/option(W).svg"}
        className="w-5 h-5 object-contain"
      />
    </button>

  </div>
</div>

    </div>
  );
}

export default NoteViewer