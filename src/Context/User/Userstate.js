import { useState } from "react";
import Usercontext from "./Usercontext";
function Userstate(props) {
  const [author, setauthor] = useState([]);
  const [allparticulardata, setallparticulardata] = useState([]);
  const urlStart = "http://localhost:8000";
  // getname()
  async function getname() {
    // return(localStorage.getItem('AUTH_TOKEN'))
    const response = await fetch(`${urlStart}/api/auth/getuserdetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth_token: localStorage.getItem("AUTH_TOKEN"),
      },
    });
    let json = await response.json();
    setallparticulardata(json);
    setauthor(json.name);
  }
  return (
    <Usercontext.Provider
      value={{
        getname: getname,
        author: author,
        allparticulardata: allparticulardata,
      }}
    >
      {props.children}
    </Usercontext.Provider>
  );
}
export default Userstate;
