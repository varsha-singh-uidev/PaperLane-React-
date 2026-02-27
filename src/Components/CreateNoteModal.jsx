import React, {useState} from 'react'

const CreateNoteModal = ({onClose, onCreate}) => {
  // create date object to get the date and time when the note is build first
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  // state for the note cover
  const [selectedCover, setSelectedCover] = useState(1);

  // state for the note title error
  const [noteError, setNoteError] = useState("");

  // state for the title and password
  const [noteTitle, setNoteTitle] = useState("");
  const [notePassword, setNotePassword] = useState("");
 
  function coverHandler(e){
    const li = e.target.closest("li");
    if(!li) return;
    const id = li.dataset.id;
    setSelectedCover(Number(id));
  }

  function handlerTitle(e){
    setNoteTitle(e.target.value); 
    setNoteError("");
  }

  function handleCreateNote(){
    if(noteTitle === ""){
      setNoteError("Enter the Note Title first");
      return;
    }
    let noteData = {
      id : Date.now(),
      title : noteTitle,
      password : (notePassword ?? ""),
      cover : selectedCover,
      createdAtDate : date,
      createdAtTime : time
    }
    
    setNotePassword("");
    setNoteTitle("");
    onCreate(noteData);
  }
  
  return (
    <>
      <div className='bg-white flex w-[500px] flex-col justify-center items-center shadow-sm rounded-xl p-6'>
        {/* image with text */}
        <div className='flex flex-col items-center'>
          <img className="w-[40px] h-[40px]" src="/icons/icon.png" alt="PaperLane icon" />
          <h1 className='text-[22px] font-semibold text-[#1b2559]'>Create Note</h1>
        </div>

        {/* take the note title and password(optional) input from the user */}
        <div className='flex flex-col my-6 '> 
          <label htmlFor="title" className='text-sm pl-1.5 text-gray-700'>Note Title</label> 
          <input 
          id='title'
          type="text"
          value={noteTitle}
          onChange={(e) => {handlerTitle(e)}} 
          placeholder='First note' 
          className='bg-[#F2F4F8] w-[250px] rounded-sm px-2.5 py-1 border border-[#5B8CFF] text-[#111827] placeholder:text-[#9CA3AF] placeholder:text-sm focus:outline-none'
          />
          <span className={`${noteError !== "" ? "pl-1.5 text-sm text-red-500 mt-1.5" : ""}`}>{noteError}</span>

          <label htmlFor="password" className='text-sm pl-1.5 text-gray-700 mt-5'>Password (Optional)</label> 
          <input 
          id='password'
          type="password" 
          value={notePassword}
          onChange={(e) => setNotePassword(e.target.value)}
          placeholder='******' 
          className='bg-[#F2F4F8] w-[250px] rounded-sm px-2.5 py-1 border border-[#5B8CFF] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none'
          />
        </div>

        {/* choose the note cover */}
        <div>
          <p className='text-[20px]'>Note Cover</p>
          {/* option of different cover */}
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
    </>
  )
}

export default CreateNoteModal