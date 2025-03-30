import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000"; // ✅ Set backend base URL

const Login = () => {
  return ( 
	<>
	<div className="w-full max-w-xs">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
	<h1>DoneLoo</h1>
  <h2 className="head-align">Login</h2>
  
	<div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Enter your Email"   />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"  />
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div className="flex items-center justify-between">
      <button  className="button-design bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign In
      </button><div className="flex flex-col">
	  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
      I don't have an account!
      </a>
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"  href="/login">
        Forgot Password?
      </a>
	  </div>
	
    </div>
  </form>
  <p className="text-center text-gray-500 text-xs">
    &copy; copy right Nima!
  </p>
</div>
	</>
	) 
} ;

export default Login;


