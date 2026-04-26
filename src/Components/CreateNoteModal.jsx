import React, {useEffect, useRef, useState} from 'react'

const CreateNoteModal = ({theme, onClose, onCreate}) => {
  // 
  const newNoteRef = useRef(null);

  useEffect(() => {
     function handleClickOutside(event){
      if(newNoteRef.current && !newNoteRef.current.contains(event.target)){
        onClose();
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })

  // create date object to get the date and time when the note is build first
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  // state for the note cover
  const [selectedCover, setSelectedCover] = useState(1);

  // state for the note title error and password error
  const [noteError, setNoteError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // state for the title and password
  const [noteTitle, setNoteTitle] = useState("");
  const [notePassword, setNotePassword] = useState("");
 
  // handle the cover of the note
  function coverHandler(e){
    const li = e.target.closest("li");
    if(!li) return;
    const id = li.dataset.id;
    setSelectedCover(Number(id));
  }

  // title input handler and erase error msg 
  function handlerTitle(e){
    setNoteTitle(e.target.value); 
    setNoteError("");
  }

  // password input handler and erase error msg 
  function handlerPassword(e){
    setNotePassword(e.target.value);
    setPasswordError("");
  }

  // password Validation
  function validatePassword(notePassword){
    if(notePassword === ""){
      return true;
    }else if(notePassword.length < 6){
      return `Password is Atleast 6 character`;
    }else if(!(/^.*[0-9].*$/.test(notePassword))){
      return `Password must contain Atleast one number`;
    }else if(!(/^.*[a-z].*$/.test(notePassword))){
      return `Password must contain Atleast one lowercase character`;
    }else if(!(/^.*[A-Z].*$/.test(notePassword))){
      return `Password must contain Atleast one uppercase character`;
    }else if(!(/^.*[@#$%^&*.,].*$/.test(notePassword))){
      return `Password must contain Atleast one special character`;
    }else{
      return true;
    }
  }

  // handler that work on the create note button press
  function handleCreateNote(){
    
    if(noteTitle === ""){
      setNoteError("Enter the Note Title first");
      return;
    }
    
    let passwordReturn = validatePassword(notePassword);
    if(passwordReturn !== true){
      setPasswordError(passwordReturn);
      return;
    }

    let noteData = {
      id : Date.now(),
      title : noteTitle,
      content : "",
      password : (notePassword ?? ""),
      cover : selectedCover,
      createdAtDate : date,
      createdAtTime : time,
      updatedAt : new Date()
    }
    
    setNotePassword("");
    setNoteTitle("");
    onCreate(noteData);
  }
  
  return (
    <div ref={newNoteRef}>
      <div className={`flex w-[500px] flex-col justify-center items-center shadow-sm rounded-xl p-6 ${theme === "Light" ? "bg-white" : "bg-[#1F1F2E]"}`}>
        
        {/* image with text */}
        <div className='flex flex-col items-center'>
          <img 
          className={`${theme === "Light" ? "w-[40px] h-[40px]" : "w-[35px] h-[35px]"}`} 
          src={`${theme === "Light" ? "/icons/icon.png" : "/icons(W)/icon(W).png"}`} 
          alt="PaperLane icon" />
          <h1 className={`text-[22px] font-semibold ${theme === "Light" ? "text-[#1b2559]" : "text-white"}`}>Create Note</h1>
        </div>

        {/* take the note title and password(optional) input from the user */}
        <div className='flex flex-col my-6 '> 
          <label 
          htmlFor="title" 
          className={`text-sm pl-1.5 ${theme === "Light" ? "text-gray-700" : "text-gray-300"}`}>
            Note Title
          </label> 
          <input 
          id='title'
          type="text"
          value={noteTitle}
          onChange={(e) => {handlerTitle(e)}} 
          placeholder='First note' 
          className={`w-[250px] rounded-sm px-2.5 py-1 border border-[#5B8CFF] placeholder:text-sm focus:outline-none ${theme === "Light" ? "bg-[#F2F4F8] text-[#111827] placeholder:text-[#9CA3AF]" : "bg-[#2A2A3B text-white placeholder:text-gray-400]"}`}
          />
          <span className={`${noteError !== "" ? "pl-1.5 text-sm text-red-500 mt-1.5" : ""}`}>{noteError}</span>

          <label htmlFor="password" className={`text-sm pl-1.5 mt-5 ${theme === "Light" ? "text-gray-700" : "text-gray-300"}`}>Password (Optional)</label> 
          <input 
          id='password'
          type="password" 
          value={notePassword}
          onChange={(e) => {handlerPassword(e)}}
          placeholder=' * * * * * *'
          className={`w-[250px] rounded-sm px-2.5 py-1 border border-[#5B8CFF] placeholder:text-sm focus:outline-none ${theme === "Light" ? "bg-[#F2F4F8] text-[#111827] placeholder:text-[#9CA3AF]" : "bg-[#2A2A3B text-white placeholder:text-gray-400]"}`}
          />
          <span className={`${passwordError !== "" ? "pl-1.5 text-sm text-red-500 mt-1.5 w-[250px]" : ""}`}>{passwordError}</span>
        </div>

        {/* choose the note cover */}
        <div>
          <p className={`text-[20px] ${theme === "Light" ? "text-black" : "text-white"}`}>Note Cover</p>
        
          {/* options of different cover */}
          <ul className='flex gap-5 my-4' onClick={(e) => coverHandler(e)}>
            <li data-id="1" className={selectedCover === 1 ? "border-2 border-[#5B8CFF] rounded-md" : ""}><img src="Cover/cover1.png" alt="cover"  className='w-[45px] h-[45px] rounded-sm'/></li>
            <li data-id="2" className={selectedCover === 2 ? "border-2 border-[#5B8CFF] rounded-md" : ""}><img src="Cover/cover2.png" alt="cover" className='w-[45px] h-[45px] rounded-sm'/></li>
            <li data-id="3" className={selectedCover === 3 ? "border-2 border-[#5B8CFF] rounded-md" : ""}><img src="Cover/cover3.png" alt="cover" className='w-[45px] h-[45px] rounded-sm'/></li>
            <li data-id="4" className={selectedCover === 4 ? "border-2 border-[#5B8CFF] rounded-md" : ""}><img src="Cover/cover4.png" alt="cover" className='w-[45px] h-[45px] rounded-sm'/></li>
          </ul>
        </div>

        {/* option button */}
        <div className='flex mt-6 gap-10'>
          <button className='bg-[#5B8CFF] text-[#ffffff] rounded-sm px-3 py-1 hover:shadow-[0_10px_30px_rgba(94,139,255,0.6)]
            hover:-translate-y-1 transition-all duration-300' onClick={handleCreateNote}>Create Note</button>
          <button className='bg-[#D7D7D7] text-[#6B7280] border-[#E6EEFF] rounded-sm px-3 py-1' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default CreateNoteModal