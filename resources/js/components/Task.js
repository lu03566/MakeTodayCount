import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';


function Task() {

    const [tasks, setTasks] = useState([]);

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
            const response = await axios.get('/api/task');
            if (mounted) {
                setTasks(response.data);
            }
        };
        loadData();

        return () => {
            mounted = false;
        };

    }, []);

    if (!tasks) {
        return <div>Loading data...</div>;
    }


    return (
        <div className="container">
            {tasks.map(blog => 
                <li>
                    <Link to={"/task/"+blog.id}>{blog.task_name} </Link>
                </li>
            )}
        </div>
    );
}

export default Task;

if (document.getElementById('example')) {
    ReactDOM.render(<Task />, document.getElementById('example'));
}
