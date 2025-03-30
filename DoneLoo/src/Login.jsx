import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000"; // ✅ Set backend base URL

const Login = () => {
  return ( 
		<div className="about"> 
			<h1>This is the About page</h1> 
		</div> 
	) 
} ;

export default Login;


