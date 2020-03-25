import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useHistory } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../../css/signin.css';

import  useAccessTokenValidation from './access-token-validation';

function Login() {
    
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [username, setUserName] = useState('');
    let history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();

        const logInUser = async () => {
            const response = await axios.post("/api/login", { username:userEmail, password:userPassword });
            localStorage.setItem('usertoken',response.data.access_token);
            localStorage.setItem('loggedIn',true);
            const loadUserInfo = async () => {
                console.log("user token",localStorage.getItem('usertoken')    )
                const userInfoResponse = await axios.get('/api/user',{headers: {'Authorization': 'Bearer '+localStorage.getItem('usertoken')}});
                localStorage.setItem('username',userInfoResponse.data.name);
                window.location.href = 'http://localhost:8000/';

            };
            loadUserInfo();

        };
        logInUser();
     }

    const Register = event => {
        console.log("button clicked");
        localStorage.setItem('register',true);
        history.push("/register")
    }

        
        
        return (
            <form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" align="justify-content-center"/>
                <h4 className="h4 mb-3 font-weight-normal" >Welcome to "MakeTodayCount"</h4>
                <br></br>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={e => setUserEmail(e.target.value)} required autoFocus></input>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={e => setUserPassword(e.target.value)} required></input>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <a className="btn btn-lg btn-primary btn-block" onClick={Register}>Register</a>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
            </form>

               
        );      
     
}

export default Login;

