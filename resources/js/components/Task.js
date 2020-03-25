import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import '../../css/task.css';


function Task() {

    const [tasks, setTasks] = useState([]);
    const [taskCounter, setTaskCounter] = useState(0);
    const [userName, setUserName] = useState(localStorage.getItem('username'));
    const [finishLoadTask, setFinishLoadTask] = useState(false);

    useEffect(() => {
        let mounted = true;

        // axios
        //     .get('/api/task')
        //     .then(response=>{
        //         setTasks(response.data);
        //         console.log(tasks)
        //     })
        //     .catch(errors => {
        //         console.log(errors);
        //     })

        const loadData = async () => {
            const response = await axios.get('/api/task',{headers: {'Authorization': 'Bearer '+localStorage.getItem('usertoken')}});
            if (mounted) {
                setTasks(response.data);
                setTaskCounter(response.data.length);
                console.log(tasks);
                setFinishLoadTask(true);
            }
        };
        loadData();

        return () => {
            mounted = false;
        };

    }, [taskCounter]);



    const deleteTask = event => {
        event.preventDefault();
        let urlToDelete = '/api/task/'+event.target.value;
        console.log("url = ",urlToDelete);
        const deleteData = async () => {
            const response = await axios.delete(urlToDelete,{headers: {'Authorization': 'Bearer '+localStorage.getItem('usertoken')}});
            setTaskCounter(taskCounter-1);

        };
        deleteData();
     }


    if (tasks.length == 0 && !finishLoadTask) {
        return (
            <div className="container" style={{marginTop: "80px"}}>
                <div className="d-flex justify-content-center ">
                    <div className="spinner-border" style={{width: "3rem",height: "3rem"}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            )
    
        
    } else if (tasks.length == 0 && finishLoadTask) {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        You have no any task yet. Add one now?
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="container">
            <ul className="list-group">
            {tasks.map(blog => 
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <Link to={"/task/"+blog.id}>{blog.task_name} </Link>                    
                    <button value={blog.id} onClick={deleteTask}> 
                        Delete
                    </button>
                    
                </li>
            )}
            </ul>


        </div>
    );
}

export default Task;

if (document.getElementById('example')) {
    ReactDOM.render(<Task />, document.getElementById('example'));
}
