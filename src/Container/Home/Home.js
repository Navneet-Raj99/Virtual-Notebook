import React,{useState} from 'react'
import { Navigate } from 'react-router-dom';
// import Alert from '../../Components/Alert'
import CardContainer from '../../Components/CardContainer'
import Navbar from '../../Components/Navbar'
import WritingContent from '../../Components/WritingContent'

function Home(props) {
  let loggedin=false;
  if(localStorage.getItem('AUTH_TOKEN'))
  {
    loggedin=true;
  }
  if(loggedin==true)
  {
  return (
    <div>
      <Navbar/>
      {/* <Alert message="Deletd Successfully"/> */}
      <WritingContent/>
   <CardContainer/>
    </div>
  )
  }
  else
  {
    return (<Navigate to="/login"/>)
  }
}

export default Home
