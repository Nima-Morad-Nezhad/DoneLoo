import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080";

const Signup = () => {
  return ( 
		<div className="about"> 
			<h1>This is the About page</h1> 
		</div> 
	) 

};

export default Signup;
