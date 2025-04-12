import React from "react";
import Navbar from "./components/Navbar"
import axios from "axios";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
  <form className="input-design row" onSubmit={addTask}>
  <div className="input-design row d-flex ">
	<div className="col">

  <label className=" block mb-2 text-sm text-slate-600">
      Title
  </label>
  <input type="text" className="form-input-design w-full placeholder:text-slate-400 text-slate-700 text-sm  rounded-md px-3 py-2 transition duration-300 ease " placeholder="Type here..."
  value={newTitle} 
  onChange={(e) => setNewTitle(e.target.value)} />
</div>
<div  className="w-full ">
  <label className="block mb-2 text-sm text-slate-600">
      Description
  </label>
  <input type="text" className="form-input-design w-full  placeholder:text-slate-400 text-slate-700 text-sm  rounded-md px-3 py-2 transition duration-300 ease   " placeholder="Type here..." 
    value={newDescription}
  onChange={(e) => setNewDescription(e.target.value)}

/>
</div ><div className="vertical   ">
<button className="button-design-home  text-blue-700 font-semibold   " type="submit">
  Add
</button>

</div>

	</div>
  </form>
	
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
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
</svg>
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
                      className="btn btn-warning bi bi-trash"
                      onClick={() => deleteTask(task._id)}
                    >
                   <svg   type="button"
                      className=" bi bi-trash"
                      onClick={() => deleteTask(task._id)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => toggleEditable(task._id)}
                    >
                   <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
</svg>
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