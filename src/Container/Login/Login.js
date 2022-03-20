import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import { Link, Navigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const urlStart = "http://localhost:8000";
  const [secondloggedin, setsecondloggedin] = useState(false);
  // let log=false;
  // if(localStorage.getItem('AUTH_TOKEN'))
  // {
  //     setloggedin(true)
  // }
  // else
  // {
  //     setloggedin(false)
  // }

  async function clickbutton(e) {
    e.preventDefault();
    const response = await fetch(`${urlStart}/api/auth/checkuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    let json = await response.json();
    console.log(json);
    if (json.AUTH_TOKEN == undefined) {
      return;
    }
    localStorage.setItem("AUTH_TOKEN", json.AUTH_TOKEN);
    setsecondloggedin(true); // Done to render the Component again to move further
    // setloggedin(true);
    // return(<Navigate to="/home"/>)
  }
  let loggedin = false;
  if (localStorage.getItem("AUTH_TOKEN")) {
    loggedin = true;
  }
  if (loggedin == false) {
    return (
      <>
        <Navbar />
        {/* <Navigate to="/home"/>: */}
        <div className="container my-5">
          <h1>Login Credentials</h1>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => {
                // console.log(e.target.value);
                setemail(e.target.value);
              }}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                // console.log(e.target.value);
                setpassword(e.target.value);
              }}
            />
          </div>
          <button class="btn btn-primary" onClick={clickbutton}>
            Submit
          </button>
        </div>
      </>
    );
  } else {
    return <Navigate to="/home" />;
  }
}

export default Login;
