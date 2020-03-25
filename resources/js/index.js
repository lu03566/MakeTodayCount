import React from 'react';
import ReactDOM from 'react-dom';
import Task from './components/Task';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Example from './components/Example';
import TaskDetail from './components/TaskDetail';
import AddTask from './components/AddTask';
import Register from './components/Register';
import { render } from 'react-dom';



function Index() {

    let username = localStorage.getItem('username');
    const config = {
        headers: { Authorization: 'Bearer '+ localStorage.getItem('usertoken') }
    };

     const logOut = event => {

        const clearToken = async () => {
            const response =  await axios.post('/api/logout',{},config)
        };
        clearToken();
        localStorage.clear();
        window.location.href = "http://localhost:8000/#";
        
    }


    return (
        <div className="container justify-content-center">
            <Router>
                <div>
                <div className="row justify-content-center">

                    <div className="d-flex col-md-8 flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                      <h5 className="my-0 mr-md-auto font-weight-normal">{username}</h5>
                      <nav className="my-2 my-md-0 mr-md-3">
                        <Link to="/" className="p-2 text-dark">Home</Link>
                        <Link to="/add-task" className="p-2 text-dark">Add Task</Link>
                      </nav>
                      <a className="btn btn-outline-primary" href=""  onClick={logOut}>Log out</a>
                    </div>
                    </div>
                </div>

                    <Route path="/" exact component={Task}/>
                    <Route path="/task/:id" exact render={props => <TaskDetail{...props}/> }/>
                    <Route path="/add-task" exact component={AddTask}/>
            </Router>


        </div>
    );
}

export default Index;
