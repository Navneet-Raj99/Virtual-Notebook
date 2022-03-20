import React, { useContext } from "react";
import Navbar from "../../Components/Navbar";
import NoteContext from "../../Context/Notes/Notecontext";
function AboutUs() {
  return (
    <div>
      <Navbar />
      <h1>
        {" "}
        This was a project Made for learning purpose to understand the MERN
        stack implementation by Navneet Raj
      </h1>
    </div>
  );
}

export default AboutUs;
