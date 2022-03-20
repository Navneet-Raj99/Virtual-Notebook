import React from "react";
import { useContext } from "react";
import { useState } from "react/cjs/react.development";
import NoteContext from "../Context/Notes/Notecontext";
import Navbar from "./Navbar";
function WritingContent() {
  let variable = useContext(NoteContext);
  const [title,setitle]=useState("");
  const [description,setdescription]=useState("");
  const [tag,settag]=useState("");
  return (
    
    <form className="container my-5 col-5">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Title
        </label>
        <input type="text" 
        value={title}
        className="form-control" id="exampleInputEmail1" onChange={(e)=>
        {let demo=e.target.value
          setitle(demo)
        }} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Description
        </label>
        <textarea
          
          className="form-control"
          id="exampleInputPassword1"
          value={description}
          onChange={(e)=>
            {
              let demod=e.target.value
              setdescription(demod)
            }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Tags
        </label>
        <input type="text" className="form-control" id="exampleInputEmail1" 
        value={tag}
        onChange={(e)=>
          {
            let demot=e.target.value
            settag(demot)
          }}/>
      </div>
      <button
        className="btn btn-primary mx-3"
        onClick={(e) => {
          e.preventDefault();
         
          variable.Add_notes(title,description,tag);
         console.log('hello');
         setdescription("")
         setitle("");
         settag("")

        }}
      >
        Submit
      </button>
      <button
        className="btn btn-primary bg-dark"
        onClick={(e) => {
          e.preventDefault();

          // variable.addnavbar();
          // setitle("navneet")
          // console.log("change");
          
        }}
      >
        Warning Button
      </button>
      {variable.components.map(() => {
        console.log("Added");
        return <Navbar />;
      })}
    </form>
  );
}

export default WritingContent;

