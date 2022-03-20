import React,{useContext,useEffect} from 'react'

import Navbar from '../../Components/Navbar'
import Usercontext from '../../Context/User/Usercontext'
import NoteContext from '../../Context/Notes/Notecontext'
function Contactus() {
  let variable=useContext(Usercontext);
  let notesvariable=useContext(NoteContext);
  useEffect(()=>
  {
   variable.getname();
   notesvariable.getallnotes();
  },[])
  return (
    <div>
      <Navbar/>
      <br/>
      <br/>
      <br/>
      <h2> Name:{variable.allparticulardata.name}</h2>
      <h2> Email: {variable.allparticulardata.email}</h2>
      <h2> Date Of Joining: {variable.allparticulardata.date}</h2>
      <h2> No.OF Notes: { notesvariable.availablenotes.length}</h2>

    </div>
  )
}

export default Contactus
