import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { Link } from "react-router-dom";
const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/users/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("authToken", data.token);
      navigate("/home");
      console.log('registered successfully!')
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      setTimeout(() => setError(""), 5000);
    }
  };
  return ( 
<>


<h1 className="logo">DoneLoo</h1>
<div className="w-full max-w-xs">
  <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
	
  <h2 className="head-align">Sign Up</h2>
  {error && <p className="alert alert-danger">{error}</p>}
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter your username"   value={username}
              onChange={(e) => setUsername(e.target.value)}/>
    </div>
	<div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Enter your Email"   value={email}
              onChange={(e) => setEmail(e.target.value)}  />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"     value={password}
              onChange={(e) => setPassword(e.target.value)}/>
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div className="flex items-center justify-between">
    <Link> <button  className="button-design bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleRegister}>
        Sign up
      </button></Link> <div className="flex flex-col">
        <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/login">
      I already have an account!
      </Link>
	  
    
      
      
	  </div>
	
    </div>
  </form>

</div>

</>
	) 

};

export default Signup;
