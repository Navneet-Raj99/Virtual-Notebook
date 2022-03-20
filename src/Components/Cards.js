import React from "react";
import { useContext, useState } from "react";
import Home from "../Container/Home/Home";
import NoteContext from "../Context/Notes/Notecontext";
function Cards(props) {
  let a = useContext(NoteContext);
  const [changetitle, setchangetitle] = useState(a.getparticularnote(props.id).title);
  const [changedescription, setchangedescription] = useState(a.getparticularnote(props.id).description);
  const [displayedit, setdisplayedit] = useState(0);

  return (
    <div>
      <div
        className="card-body col-md-8 container border"
        // style={{"backgroundColor":props.color=="1"?"red":"blue"}}
      >
        {displayedit == 1 && (
          <div id="change">
            <input
              type="text"
              className="form-control"
              placeholder="title"
              name="title"
              value={changetitle}
              onChange={(e) => {
                setchangetitle(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="description"
              value={changedescription}
              onChange={(e) => {
                setchangedescription(e.target.value);
              }}
            />
            <button
              className=" btn btn-primary my-3 mx-2"
              onClick={() => {
                a.edit(props.id, changetitle, changedescription, "");
                setdisplayedit(0);
              }}
            >
              Finally change
            </button>
            <button
              className="btn btn-primary my-3"
              onClick={() => {
                a.edit(props.id, changetitle, changedescription, "");
                setdisplayedit(0);
              }}
            >
              Discard Changes
            </button>
          </div>
        )}
        <h3>{props.index}</h3>
        <h2 className="card-title">{props.title}</h2>
        <p className="card-text">{props.description}</p>
        <h5 className="card-text">{props.tag}</h5>
        <button
          type="button"
          className="btn btn-primary btn-sm mx-2"
          onClick={() => {
            setdisplayedit(1);
          }}
        >
          Change
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-danger btn-sm"
          onClick={() => {
            a.deletenote(props.id, props.index);
         
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Cards;
