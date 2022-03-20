import React, { useContext, useEffect } from "react";
import Cards from "./Cards";
import NoteContext from "../Context/Notes/Notecontext";

function CardContainer() {
  let variables = useContext(NoteContext);
  useEffect(() => {
    variables.getallnotes();
  }, []);
  // console.log(variables.availablenotes);

  // console.log(variables.availablenotes.length);

  if (variables.availablenotes.length != 0) {
    return (
      <div className="d-flex flex-wrap">
        {variables.availablenotes.map((element, index) => {
          return (
            <Cards
              color={index % 2 != 0 ? "1" : "2"}
              id={element._id}
              index={index}
              title={element.title}
              description={element.description}
              tag={element.tag}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1> NO Notes to display</h1>
      </div>
    );
  }
}

export default CardContainer;
