import React from 'react';
import ReactDOM from 'react-dom';
import Task from './components/Task';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Example from './components/Example';
import TaskDetail from './components/TaskDetail';


function Index() {
    return (
        <div className="container">
            <Router>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/task">task</Link>

                    <Route path="/" exact component={Example}/>
                    <Route path="/task" exact component={Task}/>
                    <Route path="/task/:id" exact render={props => <TaskDetail{...props}/> }/>
                </div>
            </Router>
        </div>
    );
}

export default Index;

if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}
