import React,{useContext} from 'react';
import NoteContext from '../Context/Notes/Notecontext';
function Alert(props) {
    let a=useContext(NoteContext);
    console.log(a.alert);
    if(a.alert==1)
    {
    setInterval(() => {
        a.changealert();
    }, 5000);   
}
  return (
  <div>
      {a.alert&&<h1 style={{"backgroundColor":"lightgreen"}}>{props.message}</h1>}
  </div>
  )
}

export default Alert;
