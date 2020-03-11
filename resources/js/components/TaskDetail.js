import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';


function TaskDetail(props) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        let mounted = true;
        
        axios
            .get("/api/task/" + props.match.params.id)
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
        return <div> No data... </div>;
    } 
        return (
        <div>    
            <h1> {tasks.task_name} </h1>
            <p> {tasks.task_body} </p>
        </div>
    );


    
}

export default TaskDetail;
