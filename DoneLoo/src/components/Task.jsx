import React from "react";
function Task (){
    return(<>
    <div className="task-todo-card bg-light">
     <div> <h3>To-Do</h3></div>  
    <div className="task-home">
    <p className="text-info">Title: <span>Frontend</span></p>  
    <hr />
    <p className="text-info">Description: <span>You should design it.</span></p>
    <hr />
    <div className="d-flex justify-content-around" > <button type="button" class="btn btn-warning">Delete</button>  
    <button type="button" class="btn btn-light">Edit</button></div>
        </div>   
       
    </div>
    
    </>)
}

export default Task;
