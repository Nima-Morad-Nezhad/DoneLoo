import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar (){
    
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        const token = localStorage.getItem("verifytoken"); // or sessionStorage
  
        if (!token) {
          console.log("No token found.");
          return;
        }
  
        await axios.post(
          "http://localhost:4000/users/logout", // Update URL if different
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Clear token and redirect
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
 
    return(<>
    <nav className="home-nav-main"> 
        <Link onClick={handleLogout} className="home-nav-link"> Logout</Link>
     </nav>
     <h1 className="nav-logo">DoneLoo</h1>
    </>)
}

export default Navbar;