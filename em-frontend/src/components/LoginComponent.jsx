import React, { useState } from 'react'
import { login, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLoginForm(event) {
        event.preventDefault();

        const loginRequest = {username, password};
        console.log(loginRequest);

        await login(loginRequest).then(response => {
            console.log(response.data);

            // create basic token
            const token = 'Basic ' + window.btoa(username + ':' + password);

            // store token in local storage
            storeToken(token);

            // save logged in user in session storage
            saveLoggedInUser(username);

            navigate('/employees');

            // refresh the page
            window.location.reload(false);
        }).catch(error => {
            console.log("Some error: " + error); 
        });
    }
            
    return (
        <div className='container'>
            <br /> <br />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h2 className='text-center'> Login </h2>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <label className='col-md-3 control-label'> Username </label>
                                    <div className="col-md-9">
                                        <input 
                                            type="text"
                                            name="username"
                                            className='form-control' 
                                            placeholder="Enter your username"
                                            value={username} 
                                            onChange={(event) => setUsername(event.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className='col-md-3 control-label'> Password </label>
                                    <div className="col-md-9">
                                        <input 
                                            type="password"
                                            name="password"
                                            className='form-control' 
                                            placeholder="Enter your password"
                                            value={password} 
                                            onChange={(event) => setPassword(event.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <button className='btn btn-primary' onClick={ (event) => handleLoginForm(event)}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;