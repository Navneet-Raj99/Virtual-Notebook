import Home from "./Container/Home/Home";
import AboutUs from "./Container/About Us/AboutUs";
import ContactUs from "./Container/Contact Us/ContactUs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./Context/Notes/Notestate";
import Login from "./Container/Login/Login";
import Signup from "./Container/SignUp/Signup";
// import Usercontext from "./Context/User/Usercontext";
import Userstate from "./Context/User/Userstate";

function App() {
  return (
    <Userstate>
    <NoteState>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/aboutus" exact element={<AboutUs />} />
          <Route path="/contactus" exact element={<ContactUs />} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/signup" exact element={<Signup/>}/>
        </Routes>
      </Router>
    </NoteState>
    </Userstate>
  );
}

export default App;
