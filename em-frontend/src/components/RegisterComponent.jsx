import React from 'react';
import { useState } from 'react';

function RegisterComponent() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegistrationForm(event) {
        event.preventDefault();

        const register = [name, username, email, password];
        console.log(register);

        
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header">
                            <h2 className='text-center'> User Registration Form </h2>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <label className='col-md-3 control-label'> Name </label>
                                    <div className="col-md-9">
                                        <input 
                                            type="text"
                                            name="name"
                                            className='form-control' 
                                            placeholder="Enter your name"
                                            value={name} 
                                            onChange={(event) => setName(event.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
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
                                    <label className='col-md-3 control-label'> Email </label>
                                    <div className="col-md-9">
                                        <input 
                                            type="text"
                                            name="email"
                                            className='form-control' 
                                            placeholder="Enter your email"
                                            value={email} 
                                            onChange={(event) => setEmail(event.target.value)}
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
                                    <button className='btn btn-primary' onClick={ (event) => handleRegistrationForm(event)}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;