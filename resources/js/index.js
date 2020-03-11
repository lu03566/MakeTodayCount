import React from 'react';
import ReactDOM from 'react-dom';
import Task from './components/Task';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Example from './components/Example';
import TaskDetail from './components/TaskDetail';
import AddTask from './components/AddTask';


function Index() {
    return (
        <div className="container">
            <Router>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/task">task</Link>
                    <Link to="/add-task">Add Task</Link>

                    <Route path="/" exact component={Example}/>
                    <Route path="/task" exact component={Task}/>
                    <Route path="/task/:id" exact render={props => <TaskDetail{...props}/> }/>
                    <Route path="/add-task" exact component={AddTask}/>

                </div>
            </Router>
        </div>
    );
}

export default Index;

if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}
