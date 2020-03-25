import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useHistory } from "react-router";


function Register() {
    
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    let history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();

        axios.post("/api/register", { name:userName, email:userEmail, password:userPassword })
          .then(res => {
            console.log(res);
            console.log(res.data);
            setAlertMessage(<div class="alert alert-success alert-dismissible">
                              <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                              <strong>Logining...</strong>
                            </div>);

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
                setTimeout(() => {
                  history.push("/");
                }, 3000);

            };
            logInUser();



            
          })
     }

    return (

        <form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" align="justify-content-center"/>
                <h4 className="h4 mb-3 font-weight-normal" >Register</h4>
                <br></br>
                {alertMessage}
                <input type="text" className="form-control" placeholder="Full Name" onChange={e => setUserName(e.target.value)} required autoFocus></input>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" onChange={e => setUserEmail(e.target.value)} required autoFocus></input>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={e => setUserPassword(e.target.value)} required></input>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
        </form>
    );
}

export default Register;
