import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';


function TaskDetail(props) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        let mounted = true;
        
        axios
            .get("/api/task/" + props.match.params.id, {headers: {'Authorization': 'Bearer '+localStorage.getItem('usertoken')}})
            .then(response=>{
                if (mounted) {
                    setTasks(response.data);
                }
            })
            .catch(errors => {
                console.log(errors);
            })

        return () => {
            mounted = false;
        };



    }, []);

    if (tasks.length == 0) {
        console.log("no data");
        return (
            <div className="d-flex justify-content-center" style={{display: 'flex',alignItems:'center',marginTop:'-12%',height: '100vh'}}>
                <div className="spinner-grow" style={{width: "5rem",height: "5rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );    
    } 
        return (
        <div className="container">
        <div class="card border-secondary mb-3" style={{width: '100%'}}>
  <div class="card-header">Task Detail</div>
  <div class="card-body text-dark">
    <h5 class="card-title">{tasks.task_name}</h5>
    <p class="card-text">{tasks.task_body}</p>
  </div>
</div>
</div>
    );

    


    
}

export default TaskDetail;
