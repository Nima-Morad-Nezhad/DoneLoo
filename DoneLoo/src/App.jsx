import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import './App.css'
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
import Home from "./Home.jsx"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Router>
              
                <Routes>
                <Route path="/"
                        element={<Signup />} />
                                <Route path="/login"
                        element={<Login />} />
                    <Route path="/home" element={<Home />} />
            
                 
                </Routes>
            </Router>
 
    </>
  )
}

export default App
