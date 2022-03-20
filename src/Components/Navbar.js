import React, { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
// import NoteContext from '../Context/Notes/Notecontext'
import Usercontext from "../Context/User/Usercontext";
import { useLocation } from "react-router-dom";
function Navbar() {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  let k = useContext(Usercontext);
  useEffect(() => {
    k.getname();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MERN APP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname == "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname == "/aboutus" ? "active" : ""
                  }`}
                  to="/aboutus"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                {/* {nav.getname()} */}
                <Link
                  className={` navbar-brand nav-link ${
                    location.pathname == "/contactus" ? "active" : ""
                  }`}
                  to="/contactus"
                >
                  {k.author}
                </Link>
                {/* {k.getname()} */}
                {/* <p>{k.name}</p> */}
              </li>
            </ul>

            {!localStorage.getItem("AUTH_TOKEN") && (
              <Link to="/login">
                <button className="btn mx-5 btn-primary flex"> Login</button>
              </Link>
            )}
            {!localStorage.getItem("AUTH_TOKEN") && (
              <Link to="/signup">
                {" "}
                <button className="btn btn-primary mx-0"> SignUp</button>
              </Link>
            )}
            {localStorage.getItem("AUTH_TOKEN") && (
              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  localStorage.removeItem("AUTH_TOKEN");
                  window.location.href = "/login";
                }}
              >
                {" "}
                LOGOUT
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
