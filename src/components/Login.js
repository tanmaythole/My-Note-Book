import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap';

const Login = () => {
    const [credentials, setCredentials] = useState({"email":"", "password":""});
    const handleLogin = async (e)=> {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(credentials)
        });
        const json = await response.json();
        if(json.status=='ok'){
            localStorage.setItem('auth-token', json.authToken);
            alert('login Successful');
        } else {
            alert("Enter correct Credentials");
        }
    }

    const onchange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value});
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
