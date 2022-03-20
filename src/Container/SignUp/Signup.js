import React,{useState} from 'react';
import Navbar from '../../Components/Navbar';

function Signup() {
  const urlStart = "http://localhost:8000";
  async function createentry()
  {
    
    const response = await fetch(`${urlStart}/api/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password }),
    });
    let json = await response.json();
    console.log(json);
    setname("");
    setpassword("");
    setemail("");
  }
const[name,setname]=useState("")
const[email,setemail]=useState("")
const[password,setpassword]=useState("")
  return (
  <div>
      <Navbar/>
      <div className='container my-5'>
      <div class="mb-3 ">
  <label for="formGroupExampleInput" class="form-label">Name</label>
  <input type="text" class="form-control " value={name} onChange={(e)=>
  {
      setname(e.target.value)
  }} id="formGroupExampleInput" placeholder="Name"/>
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Email</label>
  <input type="text" class="form-control" value={email} onChange={(e)=>
  {
      setemail(e.target.value)
  }} id="formGroupExampleInput2" placeholder="Email"/>
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Password</label>
  <input type="password" value={password} onChange={(e)=>
  {
      setpassword(e.target.value)
  }} class="form-control" id="formGroupExampleInput2" placeholder="Password"/>
</div>
<button className='btn btn-primary my-3' onClick={createentry}>Create User</button>
<button className='btn btn-danger mx-3 my-3' onClick={()=>
{
  setname("");
  setpassword("");
  setemail("");
}}>Discard Changes</button>
</div>

  </div>)
}

export default Signup;
