import React from "react";
import Navbar from "./components/Navbar"
import axios from "axios";
import { useEffect, useState } from "react";
const Home = () => { 
	const [list, setList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
   useEffect(()=>{
    axios.get("http://localhost:4000/tasks/get").then(result => {
        setList(result.data)
    }).catch(err => console.log(err))
   }, [])
   const toggleEditable = (id) =>{
    const rowData = list.find((data) => data._id === id);
    if(rowData){
        setEditableId(id);
        setEditedTitle(rowData.title);
        setEditedDescription(rowData.description);
    }else{
        setEditableId(null);
        setEditedTitle("");
        setEditedDescription("");
    }
   };
   const addTask =(e) =>{
    const keyPressed=(event)=> {
      if (event.key === "Enter") {
        this.submitMessage()
      };
    }
    e.preventDefault();
    if(!newTitle || !newDescription){
        alert("All fields must be filled out.");
        return;
    }
  axios.post("http://localhost:4000/tasks/add",{
    title: newTitle,
     description:newDescription,
  }).then((res) => {
    setList([...list, res.data]); 
    setNewTitle("");
    setNewDescription("");
  }).catch((err) => console.log(err));}
  const saveEditedTask =(id) =>{
    const editedData ={
        title: editedTitle,
        description: editedDescription,
    };
    if(!editedTitle || !editedDescription){
        alert("All fields must be filled out.");
        return;
    }
    axios.put("http://localhost:4000/tasks/update/" + id, editedData)  .then(() => {
      const updatedList = list.map((item) =>
        item._id === id ? { ...item, ...editedData } : item
      );
      setList(updatedList);
      setEditableId(null);
      setEditedTitle("");
      setEditedDescription("");
    })
    .catch((err) => console.log(err));
};
  const deleteTask =(id) => {
    axios.delete("http://localhost:4000/tasks/delete/" + id).then(() => {
      const filteredList = list.filter((item) => item._id !== id);
      setList(filteredList);
    })
    .catch((err) => console.log(err));
};
	return( 
	<>
	<Navbar/>
	<div className="input-design">
	<div >
  <label className=" block mb-2 text-sm text-slate-600">
      Title
  </label>
  <input type="text" className="form-input-design w-full placeholder:text-slate-400 text-slate-700 text-sm  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400  focus:shadow" placeholder="Type here..."
  value={newTitle} 
  onChange={(e) => setNewTitle(e.target.value)} />
</div>
<div  className="w-full ">
  <label className="block mb-2 text-sm text-slate-600">
      Description
  </label>
  <input type="text" className="form-input-design w-full  placeholder:text-slate-400 text-slate-700 text-sm  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow" placeholder="Type here..." 
    value={newDescription}
  onChange={(e) => setNewDescription(e.target.value)}
  // onKeyDown={this.keyPressed}
/>
</div ><div className="vertical  ">
<button className="button-design-home  text-blue-700 font-semibold   " onClick={addTask}>
  Add
</button>

</div>

	</div>
	<div>
	<div className="d-flex flex-wrap mt-3 justify-content-around">
    <div className="task-todo-card bg-light">
     <div> <h3>To-Do</h3></div>  
     {list.map((task) => (
            <div className="task-home" key={task._id}>
              {editableId === task._id ? (
                <>
                  <p className="text-info">
                    Title:
                    <input className="form-control"
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)
                        
                      }
                    />
                  </p>
                  <p className="text-info">
                    Description:
                    <input
                    className="form-control"
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </p>
                  <button
                    className="btn btn-success"
                    onClick={() => saveEditedTask(task._id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-info">
                    Title: <span>{task.title}</span>
                  </p>
                  <p className="text-info">
                    Description: <span>{task.description}</span>
                  </p>
                  <div className="d-flex justify-content-around">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => toggleEditable(task._id)}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
              <hr />
            </div>
          ))}
        </div>
    <div className="task-todo-card bg-light">
     <div> <h3>In progress</h3></div>  
   
       
    </div>
    <div className="task-todo-card bg-light">
     <div> <h3>Done</h3></div>  
   
       
    </div>
    </div>
	</div>
	</>
	) 
} 

export default Home;