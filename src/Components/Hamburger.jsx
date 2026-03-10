import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Hamburger = ({menuClose, clearAllHandler, sortNote, filterNotes, resetfilter}) => {
 
  const [clearPopUp, setClearPopUp] = useState(false);
  const [sortPopUp, setSortPopUp] = useState(false);
  const [filterPopUp, setFilterPopUp] = useState(false);
  const [settingPopUp, setSettingPopUp] = useState(false); //open the setting
  const [prefeOpen, setPrefeOpen] = useState(false); //open the Preference option inside the settings
  const [themeOpen, setThemeOpen] = useState(false); //open the theme option inside the preference
  const [selectedTheme, setSelectedTheme] = useState("Light"); //option for the theme preferences
  const [SizeOpen, setSizeOpen] = useState(false); //open the theme option inside the preference
  const [selectedSize, setSelectedSize] = useState("Medium"); //option for the theme preferences
  const [dataTabOpen, setDataTabOpen] = useState(false); //open the data tab in the setting
  const [noteCount, setNoteCount] = useState("0"); //state for the note Count
  const [mbUsed, setMbUsed] = useState("0"); //state for the mb used by the note
  const [dangerTabOpen, setDangerTabOpen] = useState(false); //open the danger tab of the setting
  const [resetPopUp, setResetPopUp] = useState(false); //this popup is open when the user click on the reset button

  const menuRef = useRef(null);
  const navigate = useNavigate(); //used to navigate to the landingpage of the app

  // This function will count the total notes in the memory and also how many memory the notes used 
  function storageInfo(){
    const notes = JSON.parse(localStorage.getItem("paperlane_notes")) || [];
    const notesCount = notes.length;

    const notesString = JSON.stringify(notes);
    const bytes = new Blob([notesString]).size;
    const mbUsed = (bytes / (1024 * 1024)).toFixed(2);
    return [notesCount, mbUsed];
  }

  // This function is run to reset app the fully
  function resetApp(){
    clearAllHandler();
    localStorage.setItem("userDetail", JSON.stringify([]));
    navigate("/");
  }

  // when the user click outside the menu it will close the menu
  useEffect(() => {
    function handleClickOutside(event){
      if(menuRef.current && !menuRef.current.contains(event.target)){
        menuClose();
      }
    }
    let arr = storageInfo();
    setNoteCount(arr[0]);
    setMbUsed(arr[1]);

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef}>
      <div className="absolute -right-5 mt-2 mr-2 w-[200px] bg-white rounded-md shadow-lg z-50">
        <ul className="flex flex-col gap-2 p-2 text-gray-700 cursor-pointer font-semibold">
          {/* Settings menu item with dropdown icon */}
          <li
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded hover:text-blue-400"
            onClick={() => setSettingPopUp(true)}
          >
            Settings
          </li>
          {/* Settings subMenu */}
          {settingPopUp && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="flex flex-col bg-gray-600 w-[500px] h-auto p-4">
                <h4 className="text-white font-semibold text-[22px] mb-4">
                  Settings
                </h4>

                {/* Preference tab of the setting */}
                <div className="flex flex-col bg-gray-400 rounded-md mb-2 py-3">
                  <div className="flex w-full items-center justify-between px-4"
                    onClick={() => setPrefeOpen((prev) => !prev)} >
                    <p>Preferences</p>
                    <img src="/icons/dropdown.svg" alt="dropdown of preference tab" />
                  </div>

                  {/* Sub options of the prefernce Tab */}
                  {prefeOpen && (
                    <>
                    {/* Theme Row */}
                      <hr className="my-3 border-white/20 w-full" />
                      <div className="flex items-center justify-between px-4">
                        <p>Color Theme</p>
                        <div className="flex flex-col w-[120px] bg-gray-500/75 rounded-md px-2 py-1 cursor-pointer">
                          
                          {/* Theme option show */}
                          <div className="flex items-center justify-between"
                            onClick={() => setThemeOpen((prev) => !prev)}>
                            <p className="text-white">{selectedTheme}</p>
                            <img src="/icons/dropdown.svg" alt="" />
                          </div>

                          {/* Dropdown options inside the theme */}
                          {themeOpen && (
                            <ul className="mt-2 bg-gray-600 rounded-md">
                              {["Light", "Dark"].map((option) => (
                                <li
                                  key={option}
                                  className={`px-2 py-1 rounded cursor-pointer  ${ selectedTheme === option ? "bg-blue-100 text-blue-600 font-semibold"  : "hover:bg-gray-500 text-white"  }`}
                                  onClick={() => {
                                    setSelectedTheme(option); // update selection
                                    setThemeOpen(false); // close dropdown
                                  }}>
                                  {option}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      {/* FontSize row */}
                      <hr className="my-3 border-white/20 w-full"/>
                      <div className="flex items-center justify-between px-4">
                        <p>Font Size</p>
                      <div className="flex flex-col w-[120px] bg-gray-500/75 rounded-md px-2 py-1 cursor-pointer">

                      {/* Font Size option show */}
                      <div className="flex items-center justify-between" onClick={() => setSizeOpen((prev) => !prev)}>
                        <p className="text-white">{selectedSize}</p>
                        <img src="/icons/dropdown.svg" alt="dropdown of the font size option" />
                      </div>

                      {/* Dropdown options inside the FontSize */}
                      {SizeOpen && (
                      <ul className="mt-2 bg-gray-600 rounded-md">
                        {["Small", "Medium",  "Large"].map((option) => (
                         <li key={option}
                          className={`px-2 py-1 rounded cursor-pointer  ${ selectedSize === option ? "bg-blue-100 text-blue-600 font-semibold"  : "hover:bg-gray-500 text-white"  }`}
                          onClick={() => {
                          setSelectedSize(option); // update selection
                          setSizeOpen(false); // close dropdown
                          }}>
                            {option}
                          </li>
                          ))}
                        </ul>
                        )}
                      </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Data Tab of the setting */}
                <div className="flex flex-col bg-gray-400 rounded-md mb-2 py-3">
                  <div className="flex w-full items-center justify-between px-4"
                    onClick={() => setDataTabOpen(prev => !prev)}>
                    <p> Data </p>
                    <img src="/icons/dropdown.svg" alt="dropdown of data tab" />
                  </div>

                {/* Sub option of the dataTab */}
                {dataTabOpen && (
                  <>
                  {/* Storage info row */}
                  <hr className="my-3 border-white/20 w-full" />
                  <div className="px-4">
                    <p>Storage Info</p>
                    <div className='flex flex-col mt-2'>
                      <p>Notes stored: {noteCount} </p>
                      <p>Storage used: {mbUsed} MB </p>
                    </div>
                  </div>
                  </>
                )}
                </div>

                {/* Danger Tab of the setting */}
                <div className="flex flex-col bg-gray-400 rounded-md mb-2 py-3">
                  <div className="flex w-full items-center justify-between px-4"
                    onClick={() => setDangerTabOpen(prev => !prev)}>
                    <p> Danger Zone </p>
                    <img src="/icons/dropdown.svg" alt="dropdown of danger zone tab" />
                  </div>

                {/* Sub option of the dataTab */}
                {dangerTabOpen && (
                  <>
                  {/* Storage info row */}
                  <hr className="my-3 border-white/20 w-full" />
                  <div className="px-4" onClick={() => {setSettingPopUp(prev => !prev); setResetPopUp(true)}}>
                    <p className='text-red-500'>Reset App</p>              
                  </div>
                  </>
                )}
                </div>

                {/* Button of the setting */}
                <div className="flex justify-end gap-2 mt-4">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setSettingPopUp(false)}>
                    Save
                  </button>
                  <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setSettingPopUp(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <li className="px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded">
            Export
          </li>

          <li
            className="px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded"
            onClick={() => setClearPopUp(true)}
          >
            Clear All note
          </li>
          {/* this popup open to take the user input related to clear All the Note  */}
          {clearPopUp && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
              <div className="bg-white p-6 rounded-md shadow-lg">
                <p>Are you sure you want to delete all notes?</p>
                <div className="flex justify-between px-2 mt-4 w-full cursor-pointer">
                  <button
                    className="bg-gray-500 px-2 py-1 text-white rounded-md cursor-pointer hover:bg-gray-600"
                    onClick={() => {
                      setClearPopUp(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-600 px-2 py-1 rounded-md text-white cursor-pointer hover:bg-red-700"
                    onClick={() => {
                      clearAllHandler();
                      menuClose();
                      setClearPopUp(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sort menu item with dropdown icon */}
          <li
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded"
            onClick={() => setSortPopUp((prev) => !prev)}
          >
            <span>Sort</span>
            <img src="/icons/dropdown.svg" alt="Options for the sorting" />
          </li>
          {/* Sort subMenu */}
          {sortPopUp && (
            <ul className="ml-4 font-medium">
              <li
                className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded"
                onClick={() => sortNote("title")}
              >
                {" "}
                Sort By Title{" "}
              </li>
              <li
                className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded"
                onClick={() => sortNote("createdAtDate")}
              >
                {" "}
                Sort By Created Date{" "}
              </li>
              <li
                className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded"
                onClick={() => sortNote("updatedAt")}
              >
                {" "}
                Sort By Updated Date{" "}
              </li>
            </ul>
          )}

          {/* Filter menu item with dropdown icon */}
          <li
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded"
            onClick={() => setFilterPopUp((prev) => !prev)}
          >
            <span>Filter</span>
            <img src="/icons/dropdown.svg" alt="options for the filter" />
          </li>
          {/* Filter subMenu */}
          {filterPopUp && (
            <ul className="ml-4 font-medium">
              <li
                className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded"
                onClick={() => filterNotes("lock")}
              >
                {" "}
                Show Lock Notes{" "}
              </li>
              <li
                className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded"
                onClick={() => filterNotes("unlock")}
              >
                {" "}
                Show Unlock Notes{" "}
              </li>
              <li
                className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded"
                onClick={resetfilter}
              >
                {" "}
                Reset Filter{" "}
              </li>
            </ul>
          )}
        </ul>
      </div>
      {/* reset popup */}
      {resetPopUp && (
      <div className='fixed inset-0 flex justify-center items-center z-50'>
        <div className='bg-gray-300 rounded-md w-[450px] h-auto p-4 shadow-md border border-black/25 text-gray-800'>
          <h1 className='text-rose-600 font-semibold text-[20px]'>Reset App</h1>
          <h4 className='mt-4 mb-6 text-center text-[18px]'>This will delete all notes and restore the app to its default state. This action cannot be undone.</h4>
          <div className='flex items-center justify-between px-2'>
            <button className='bg-gray-600 rounded p-1 text-white border border-white hover:bg-gray-700' onClick={() => {setResetPopUp(false)}}>Cancel</button>
            <button className='bg-red-500 rounded p-1 text-white border border-white hover:bg-red-600' onClick={resetApp}>Reset App</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Hamburger