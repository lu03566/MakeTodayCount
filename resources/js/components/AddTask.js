import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function AddTask() {
    
    const [taskName, setTaskName] = useState('');
    const [taskBody, setTaskBody] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        console.log("task name",taskName);
        
         const tasks = {
            name: taskName,
            body: taskBody
        };
        console.log("tasks",tasks);

        axios.post("/api/task", { name:taskName, body:taskBody })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
     }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Add a new task</div>

                        <div className="card-body">

                        <form onSubmit={handleSubmit}>
                            <div>
                                <input 
                                    type="text"
                                    name="taskName"
                                    onChange={e => setTaskName(e.target.value)}
                                    placeholder="Enter task name"/>

                            </div>

                            <div>
                                <textarea
                                    name="taskBody"
                                    onChange={e => setTaskBody(e.target.value)}
                                    placeholder="Enter task content"/>
                            </div>

                            <div>
                                <button type="submit">Submit</button>
                            </div>

                        </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTask;

if (document.getElementById('example')) {
    ReactDOM.render(<AddTask />, document.getElementById('example'));
}