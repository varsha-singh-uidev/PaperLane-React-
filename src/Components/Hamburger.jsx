import React, { useState, useRef, useEffect } from 'react'

const Hamburger = ({menuClose, clearAllHandler, sortNote, filterNotes, resetfilter}) => {
 
  const [clearPopUp, setClearPopUp] = useState(false);
  const [sortPopUp, setSortPopUp] = useState(false);
  const [filterPopUp, setFilterPopUp] = useState(false);
  const [settingPopUp, setSettingPopUp] = useState(false);

  const menuRef = useRef(null);

  // when the user click outside the menu it will close the menu
  useEffect(() => {
    function handleClickOutside(event){
      if(menuRef.current && !menuRef.current.contains(event.target)){
        menuClose();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef}>
    <div className='absolute -right-5 mt-2 mr-2 w-[200px] bg-white rounded-md shadow-lg z-50'>
      <ul className='flex flex-col gap-2 p-2 text-gray-700 cursor-pointer font-semibold'>
        
        {/* Settings menu item with dropdown icon */}
       <li className='flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded hover:text-blue-400' onClick={() => setSettingPopUp(prev => !prev)}>
        Settings 
       </li>
       {/* Settings subMenu */}
        {settingPopUp && (
       <div className='fixed inset-0 flex items-center justify-center'>
        <div className='flex fex-col bg-gray-500 w-[500px] h-auto p-4'>
          <h4 className='text-white font-semibold text-[22px]'>Settings</h4>
          <div className='  '>
            <div>
              <p>Preferences</p>
              <img src="/icons/dropdown.svg" alt="" />
            </div>

          </div>
          <div></div>
          <div></div>
          <div>
            <button>Save</button>
            <button>Cancel</button>
          </div>
        </div>
       </div>
       )}
       <li className='px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded'>Export</li>
       <li className='px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded' onClick={() => setClearPopUp(true)}>Clear All note</li>
       
       {/* Sort menu item with dropdown icon */}
       <li className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded" onClick={() => setSortPopUp(prev => !prev)}>
        <span>Sort</span>
        <img src="/icons/dropdown.svg" alt="Options for the sorting" />
       </li>
        {/* Sort subMenu */}
        {sortPopUp && (
        <ul className="ml-4 font-medium">
          <li className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded" onClick={() => sortNote("title")}>  Sort By Title  </li>
          <li className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded" onClick={() => sortNote("createdAtDate")}>  Sort By Created Date  </li>
          <li className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded" onClick={() => sortNote("updatedAt")}>  Sort By Updated Date  </li>
        </ul>
        )}

        {/* Filter menu item with dropdown icon */}
       <li className='flex items-center justify-between px-3 py-2 hover:bg-gray-100 hover:text-blue-400 rounded' onClick={() => setFilterPopUp(prev => !prev)}>
        <span>Filter</span>
        <img src="/icons/dropdown.svg" alt="options for the filter" />
       </li>
       {/* Filter subMenu */}
        {filterPopUp && (
          <ul className="ml-4 font-medium">
            <li className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded" onClick={() => filterNotes("lock")}>  Show Lock Notes  </li>
            <li className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded" onClick={() => filterNotes("unlock")}>  Show Unlock Notes  </li>
            <li className="px-2 py-1 text-sm text-gray-500 hover:text-blue-400 hover:bg-gray-100 rounded" onClick={resetfilter}>  Reset Filter  </li>
          </ul>
        )}

      </ul>
    </div>

       {/* this popup open to take the user input related to clear All the Note  */}
        {clearPopUp && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/30 z-50'>
        <div className='bg-white p-6 rounded-md shadow-lg'>
          <p>Are you sure you want to delete all notes?</p>  
          <div className='flex justify-between px-2 mt-4 w-full cursor-pointer'>
            <button className='bg-gray-500 px-2 py-1 text-white rounded-md cursor-pointer hover:bg-gray-600' onClick={() => {setClearPopUp(false)}}>Cancel</button>
            <button className='bg-red-600 px-2 py-1 rounded-md text-white cursor-pointer hover:bg-red-700' onClick={() => {clearAllHandler(); menuClose(); setClearPopUp(false)}}>Delete</button>
          </div>
        </div>
        </div>
       )}

    </div>
  )
}

export default Hamburger