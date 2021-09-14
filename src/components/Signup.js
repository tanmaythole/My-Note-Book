import React, { useState, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';


const Signup = ({showAlert}) => {
    // Using auth context api
    const authContext = useContext(AuthContext);
    const { loggedin, setLoggedin, setAuthToken } = authContext;

    const [formData, setFormData] = useState({"name":"", "email":"", "password":"", "cpassword":""})
    
    const history = useHistory();

    const handleSignup = async (e)=> {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "name":formData.name, 
                "email":formData.email,
                "password":formData.password
            })
        });
        const json = await response.json();
        if(json.status==="ok"){
            localStorage.setItem('auth-token', json.authToken);
            setLoggedin(true);
            setAuthToken(localStorage.getItem('auth-token'));
            showAlert("SignUp Successful", 'success');
            history.push('/');
        } else {
            showAlert("Invalid Data", 'danger');
        }
    }

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    
    if(loggedin){
        setTimeout(() => {
            history.push('/');
        }, 1500);
    }
    return (
        <div className="col-md-4 m-auto">
            <h1 className="text-center">Create An Account</h1>
            <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" name="name" onChange={onchange} value={formData.name} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={onchange} value={formData.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={onchange} value={formData.password} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name="cpassword" onChange={onchange} value={formData.cpassword} />
                </Form.Group>
                <Button disabled={formData.name.length<2 || formData.email.length===0 || formData.password.length<4 || formData.password!==formData.cpassword} variant="success" type="submit">
                    SignUp
                </Button>
            </Form>
        </div>
    )
}

export default Signup
