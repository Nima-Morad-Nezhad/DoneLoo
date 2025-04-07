import React from "react";
function Task (){
    return(<>
    <div className="d-flex flex-wrap mt-3 justify-content-around">
    <div className="task-todo-card bg-light">
     <div> <h3>To-Do</h3></div>  
    <div className="task-home">
    <p className="text-info">Title: <span></span></p>  
    <hr />
    <p className="text-info">Description: <span></span></p>
    <hr />
    <div className="d-flex justify-content-around" > <button type="button" class="btn btn-warning">Delete</button>  
    <button type="button" class="btn btn-light">Edit</button></div>
        </div>   
       
    </div>
    <div className="task-todo-card bg-light">
     <div> <h3>In Process</h3></div>  
   
       
    </div>
    <div className="task-todo-card bg-light">
     <div> <h3>Done</h3></div>  
   
       
    </div>
 
    </div>
   
    
    </>)
}

export default Task;
