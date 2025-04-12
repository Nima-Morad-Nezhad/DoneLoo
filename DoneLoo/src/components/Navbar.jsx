import React from "react";
import { Link } from "react-router-dom";
function Navbar (){
    

 
    return(<>
    <nav className="home-nav-main"> 
        <Link to="/" className="home-nav-link"> Logout</Link>
     </nav>
     <h1 className="nav-logo">DoneLoo</h1>
    </>)
}

export default Navbar;