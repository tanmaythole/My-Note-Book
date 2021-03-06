import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import axiosInstance from '../axios';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../state';
import { bindActionCreators } from 'redux';


const Signup = ({showAlert}) => {

    const [formData, setFormData] = useState({"name":"", "email":"", "password":"", "cpassword":""})
    let history = useHistory();

    // progress using redux
    const dispatch = useDispatch();
    const { setProgress } = bindActionCreators(actionCreators, dispatch);
    
    const handleSignup = async (e)=> {
        e.preventDefault();
        setProgress(20);
        axiosInstance
            .post(`accounts/register/`, {
                first_name: formData.name,
                email: formData.email,
                password: formData.password
            })
            .then((res) => {
                setProgress(40);
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                setProgress(60);
                showAlert(`Welcome ${res.data.user.first_name}, Your account created Successfully.`, 'succcess');
                axiosInstance.defaults.headers['Authorization'] = 'JWT ' + res.data.access;
                setProgress(90);
                history.push('/');
                setProgress(100);
            })
            .catch((err) => {
                showAlert(err.response.data.email, "danger");
                setProgress(100);
            })
    }

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
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
