import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar (){
    
    const navigate = useNavigate();

    const handleLogout = async () => {
     try {
      if(localStorage.getItem("authToken")){
        localStorage.removeItem("authToken");
       
      }
     
     } catch (error) {
      console.error("Logout failed", error);
     }
  
    };
 
    return(<>
    <nav className="home-nav-main d-flex bd-highlight mb-3"> 
   
        <Link to="/login" onClick={handleLogout} className="home-nav-link ml-auto p-2 bd-highlight"> Logout</Link>
     </nav>
     <h1 className="nav-logo">DoneLoo</h1>
    </>)
}

export default Navbar;