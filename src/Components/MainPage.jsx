import React, { useState, useEffect } from 'react'
import MainPageRoute from './MainPageRoute'
import CreateNoteModal from './CreateNoteModal';
import Hamburger from './Hamburger';

const MainPage = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // run when the page mounts and extract stored notes
  useEffect(() => {
    let existingNotes = JSON.parse(localStorage.getItem("paperlane_notes")) || [];
    setNotes(existingNotes);
  }, []);

  // update localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("paperlane_notes", JSON.stringify(notes));
    }
  }, [notes]);

  // function that runs when a new note is created
  function handler(noteData) {
    setIsPopUp(false);
    setNotes(prev => {
      const updated = [...prev, noteData];
      localStorage.setItem("paperlane_notes", JSON.stringify(updated));
      return updated;
    });
  }

  // search handler
  function searchHandler(e) {
    let search = e.target.value.toLowerCase();
    setSearchTerm(search); //store whatever the user search

    if (search === "") {
      setSearchResult([]); // reset when empty
    } else {
      setSearchResult(
        notes.filter(note => note.title.toLowerCase().includes(search))
      );
    }
  }

  // function that is used to clear all the notes(Hamburger Menu)
  function clearAllHandler(){
    setNotes([]);
    localStorage.setItem("paperlane_notes", JSON.stringify([]));
  }

  return (
    <>
      {/* main container */}
      <div className='w-full min-h-screen flex flex-col'>

        {/* top menu bar */}
        <div className='flex items-center justify-between my-[20px] mx-[20px] md:mx-[50px] md:px-[50px]'>

          {/* home page routing */}
          <MainPageRoute />

          {/* search bar */}
          <div className='flex w-[200px] md:w-[270px] px-1.5 border border-[#5B8CFF] py-1 rounded-md bg-[#F2F4F8]'>
            <label htmlFor="search" className='flex items-center'>
              <img src="/icons/search.svg" alt="search Icon" className='w-[16px] h-[16px]' />
            </label>
            <input
              onChange={searchHandler}
              id='search'
              type="text"
              placeholder='Search..'
              className='pl-2 md:pl-2.5 w-[150px] md:w-[200px] focus:outline-none bg-transparent text-slate-600 opacity-60'
            />
          </div>

          {/* hamburger menu */}
          <div className='relative'>
            <img src="/icons/menu.svg" alt="Menu Icon" className='w-[25px] h-[25px] md:w-[30px] md:h-[30px] cursor-pointer' onClick={() => setMenuOpen(prev => !prev)}/>
            <div>
              {menuOpen && (
              <div>
                <Hamburger clearAllHandler={clearAllHandler} menuClose = {() => setMenuOpen(false)}/>
              </div>
              )}
            </div>
          </div>

        </div>

        <hr />

        {/* main body */}
        <div className='mt-[50px] my-[20px] md:mx-[50px] mx-[25px] px-[50px] flex flex-wrap gap-[40px]'>

          {/* create new note */}
          <div
            className='flex flex-col w-[100px] h-[180px] md:w-[160px] md:h-[230px] items-center cursor-pointer group transition'
            onClick={() => setIsPopUp(true)}
          >
            <div className="overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl group-hover:-translate-y-1.5 transition duration-300">
              <img src="/Cover/cover1.png" alt="Create Note" className="rounded-2xl group-hover:scale-105 transition duration-300" />
            </div>
            <p className="mt-3 text-[12px] md:text-[16px] text-center font-medium text-[#1b2559] group-hover:text-[#5E8BFF] transition">
              + Create New Note
            </p>
          </div>

          {/* popup modal */}
          <div className='relative flex items-center justify-center'>
            {isPopUp && (
              <div className="absolute fixed inset-0 flex items-center justify-center bg-black/30 z-30">
                <CreateNoteModal
                  onClose={() => setIsPopUp(false)}
                  onCreate={handler}
                />
              </div>
            )}
          </div>

          {/* notes grid */}
          <div className='flex flex-wrap gap-[30px] justify-between md:justify-none w-full'>
            
            {/* when the user type in the search bar and it was not matched with any existing note */}
            {searchTerm !== "" && searchResult.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10 w-full">
                <p className="text-base font-medium">No results found</p>
                <p className="text-sm">Try adjusting your search</p>
              </div>
            )
            // when there is no note in the record 
            : notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10 w-full">
                <p className="text-base font-medium">You don’t have any notes yet</p>
                <p className="text-sm">Create your first note to get started</p>
              </div>
            )
            //  show notes whether the (filterd notes or all notes)
            : (
              (searchResult.length > 0 ? searchResult : notes).map(note => (
                <div
                  key={note.id}
                  className="flex flex-col w-[100px] h-[180px] md:w-[160px] md:h-[230px] items-center cursor-pointer group">
                  
                  {/* Cover / without passWord note */}
                  {note.password === "" ? (
                    <div className="relative overflow-hidden rounded-xl group-hover:shadow-xl duration-300">
                      <img
                        src={`Cover/cover${note.cover}.png`}
                        alt="Note Cover"
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition duration-300"/>
                    </div>
                  )
                  // with passWord note 
                  : (
                    <div className="relative overflow-hidden rounded-xl group-hover:shadow-xl duration-300">
                      <img
                        src={`Cover/cover${note.cover}.png`}
                        alt="Note Cover"
                        className="w-full h-full object-cover rounded-xl filter blur-sm brightness-90"/>
                      <div className='absolute top-1/2 left-1/2 w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-md'>
                        <img src="Cover/lock.png" alt="Lock Note" className="w-6 h-6" />
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  <p className="mt-3 text-base font-semibold text-[#1b2559] text-center group-hover:text-[#5E8BFF] transition">
                    {note.title}
                  </p>

                  {/* Date */}
                  <p className="text-xs text-gray-500">{note.createdAtDate}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage