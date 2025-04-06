import React from "react";
import Navbar from "./components/Navbar"
import Task from "./components/Task"
const Home = () => { 
	return( 
	<>
	<Navbar/>
	<div className="input-design">
	<div >
  <label className=" block mb-2 text-sm text-slate-600">
      Title
  </label>
  <input type="text" className="form-input-design w-full placeholder:text-slate-400 text-slate-700 text-sm  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400  focus:shadow" placeholder="Type here..." />
</div>
<div className="w-full ">
  <label className="block mb-2 text-sm text-slate-600">
      Description
  </label>
  <input type="text" className="form-input-design w-full  placeholder:text-slate-400 text-slate-700 text-sm  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow" placeholder="Type here..." />
</div ><div className="vertical  ">
<button className="button-design-home  text-blue-700 font-semibold   ">
  Add
</button>

</div>

	</div>
	<div>
	<Task/>
	</div>
	</>
	) 
} 

export default Home;