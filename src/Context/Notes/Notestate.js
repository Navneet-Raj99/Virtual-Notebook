import { useState } from "react";
// import Navbar from "../../Components/Navbar";
import NoteContext from "./Notecontext";

function NoteState(props) {
  const urlStart = "http://localhost:8000";
  const [components, setcomponents] = useState([]);
  const [alert, setalert] = useState(0);
  // const[particularnote,setparticularnote]=useState([])
  // getallnotes();
  const [availablenotes, setavailablenotes] = useState([
    // {
    //   _id: "61e91afc8bc2ec565c8ea06a",
    //   user: "61e8459e2c8755835abedfdc",
    //   title: "College task",
    //   description: "read dc-dc converters",
    //   tag: "general",
    //   date: "2022-01-20T08:19:08.953Z",
    //   __v: 0,
    // },
    // {
    //   _id: "61e91b208bc2ec565c8ea06c",
    //   user: "61e8459e2c8755835abedfdc",
    //   title: "Practical task",
    //   description: "Do Squirel Cage Work on Psim",
    //   tag: "practical",
    //   date: "2022-01-20T08:19:44.388Z",
    //   __v: 0,
    // },
    // {
    //   _id: "61e91b3c8bc2ec565c8ea06e",
    //   user: "61e8459e2c8755835abedfdc",
    //   title: "DSAA task",
    //   description: "Do Writing task Of last Questions",
    //   tag: "Theory",
    //   date: "2022-01-20T08:20:12.099Z",
    //   __v: 0,
    // },
    // {
    //   _id: "61e91b628bc2ec565c8ea070",
    //   user: "61e8459e2c8755835abedfdc",
    //   title: "PEC task",
    //   description: "Write First Practical Of PEC-2",
    //   tag: "Practical",
    //   date: "2022-01-20T08:20:50.140Z",
    //   __v: 0,
    // },
    // {
    //   _id: "61e923258bc2ec565c8ea073",
    //   user: "61e8459e2c8755835abedfdc",
    //   title: "Register",
    //   description: "Register For Hash Code",
    //   tag: "Self Task",
    //   date: "2022-01-20T08:53:57.300Z",
    //   __v: 0,
    // }
  ]);
  //API CALL TO CALL ALL NOTES
  async function getallnotes() {
    const response = await fetch(`${urlStart}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("AUTH_TOKEN"),
        // auth_token:
        //   "eyJhbGciOiJIUzI1NiJ9.NjFlODQ1OWUyYzg3NTU4MzVhYmVkZmRj.Si6cHGy3d3dVW0hRmANRsHk5vWBYsxMC1OsfQhsS4SI",
      },
    });
    let json = await response.json();
    // console.log(json);
    setavailablenotes(json.all_notes);
  }
  //TO call particular note with id
  function getparticularnote(id) {
    // getallnotes();
    for (let i = 0; i < availablenotes.length; i++) {
      if (availablenotes[i]._id == id) {
        // setparticularnote(availablenotes[i]);
        // console.log(particularnote);

        return availablenotes[i];
      }
    }
  }
  async function Add_notes(title, description, tag) {
    // if(title=="")
    // {
    //   return;
    // }
    if (title == "" || description == "" || tag == "") {
      return;
    }
    const response = await fetch(`${urlStart}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("AUTH_TOKEN"),
        // auth_token:
        //   "eyJhbGciOiJIUzI1NiJ9.NjFlODQ1OWUyYzg3NTU4MzVhYmVkZmRj.Si6cHGy3d3dVW0hRmANRsHk5vWBYsxMC1OsfQhsS4SI",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let json = await response.json();
    // console.log(json.all_notes);
    getallnotes();
    // console.log("Notes Are trying to get added");
    // setavailablenotes((prev) => {
    //   return [
    //     ...prev,
    //     {
    //       _id: "61e923258bc2ec565c8a073",
    //       user: "61e8459e2c8755835abedfdc",
    //       title: title,
    //       description: description,
    //       tag: tag,
    //       date: "2022-01-20T08:53:57.300Z",
    //       __v: 0,
    //     },
    //   ];
    // });
  }
  async function deletenote(id, index) {
    // console.log("Tried TO delete the note of index " + id + " " + index);
    // let newnotes = availablenotes.filter((note) => {
    //   return note._id != id;
    // });
    {
      const response = await fetch(`${urlStart}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          auth_token: localStorage.getItem("AUTH_TOKEN"),
          // auth_token:
          //   "eyJhbGciOiJIUzI1NiJ9.NjFlODQ1OWUyYzg3NTU4MzVhYmVkZmRj.Si6cHGy3d3dVW0hRmANRsHk5vWBYsxMC1OsfQhsS4SI",
        },
      });

      let json = await response.json();
      console.log(json.all_notes);
      getallnotes();
      // setavailablenotes(json.all_notes);
    }

    // setavailablenotes(newnotes);
  }
  let s1 = {
    name: "Navneet",
    age: "21",
  };
  function addnavbar() {
    console.log("Navbar added");
    setcomponents((prev) => {
      return [...prev, 1];
    });
  }
  async function edit(id, title, description, tag) {
    const response = await fetch(`${urlStart}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("AUTH_TOKEN"),
        // auth_token:
        //   "eyJhbGciOiJIUzI1NiJ9.NjFlODQ1OWUyYzg3NTU4MzVhYmVkZmRj.Si6cHGy3d3dVW0hRmANRsHk5vWBYsxMC1OsfQhsS4SI",
      },
      body: JSON.stringify({ title, description }),
    });

    let json = await response.json();
    // console.log(json.all_notes);
    getallnotes();
    // let new_updated_notes = [];
    // let i = 0;
    // for (i = 0; i < availablenotes.length; i = i + 1) {
    //   if (availablenotes[i]._id == id) {
    //     if (title) {
    //       availablenotes[i].title = title;
    //     }
    //     if (description) {
    //       availablenotes[i].description = description;
    //     }
    //     if (tag) {
    //       availablenotes[i].tag = tag;
    //     }
    //   }
    //   new_updated_notes.push(availablenotes[i]);
    // }
    // console.log(availablenotes);
    // setavailablenotes(new_updated_notes);
  }
  function changealert() {
    setalert(!alert);
  }
  const [state, setstate] = useState(s1);

  return (
    <NoteContext.Provider
      value={{
        state: state,
        availablenotes: availablenotes,
        getallnotes: getallnotes,
        Add_notes: Add_notes,
        deletenote: deletenote,
        addnavbar: addnavbar,
        components: components,
        edit: edit,
        alert: alert,
        changealert: changealert,
        getparticularnote: getparticularnote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}
export default NoteState;
