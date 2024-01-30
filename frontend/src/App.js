import React from 'react'
import RegistrationForm from './components/registration'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from './components/logined'; 

export default function App() {
  return (
    <Router>
    <div>
        <Routes>
          <Route path="/login" Component={LoginForm}/>
          <Route path="/" Component={RegistrationForm}/>
        </Routes>
   </div>
    </Router>
  )
}
