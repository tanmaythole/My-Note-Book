import React, {useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';

const Login = ({showAlert}) => {

    const [credentials, setCredentials] = useState({"email":"", "password":""});

    const history = useHistory();
    const handleLogin = async (e)=> {
        e.preventDefault();

        axiosInstance
            .post(`accounts/token/`, {
                email: credentials.email,
                password: credentials.password
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                showAlert("Login Successful", 'success');
                history.push('/');
            })
    }

    const onchange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }

    if(localStorage.getItem('access_token')){
        history.push('/');
    }
    return (
        <div className="col-md-4 m-auto">
            <h1 className="text-center">Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={onchange} value={credentials.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={onchange} value={credentials.password} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login;
