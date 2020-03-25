import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function AddTask() {
    
    const [taskName, setTaskName] = useState('');
    const [taskBody, setTaskBody] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        event.target.reset();
        console.log("task name",taskName);
        
         const tasks = {
            name: taskName,
            body: taskBody
        };
        console.log("tasks",tasks);

        axios.post("/api/task", { name:taskName, body:taskBody },  {headers: {'Authorization': 'Bearer '+localStorage.getItem('usertoken')}})
          .then(res => {
            console.log(res);
            setAlertMessage( <div className="alert alert-success alert-dismissible">
                              <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                              <strong>Added task!</strong>
                            </div>

                        );  
            console.log(res.data);
          })
     }

    useEffect(() => {
        
    }, [alertMessage]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                    <div className="card" style={{width: '100%'}}>
                        <div className="card-header text-center" >Add a new task</div>

                        <div className="card-body">

                        <form onSubmit={handleSubmit}>
                          
                        {alertMessage}
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Task name" aria-label="Task name" aria-describedby="basic-addon2"
                                onChange={e => setTaskName(e.target.value)}
                                />
                            </div>

            

                             <div className="input-group mb-3">
                                <textarea className="form-control" placeholder="Enter task details" aria-label="Task Content" aria-describedby="basic-addon2"
                                onChange={e => setTaskBody(e.target.value)}
                                />
                            </div>

                            <div>
                                <input className="btn btn-primary text-xs-right" type="submit"/>
                            </div>

                        </form>

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